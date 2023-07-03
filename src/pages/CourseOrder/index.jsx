// @ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { Roles } from "../../constants/roles";
import { formatCurrency } from "../../utils/format";
import { useAuthen } from "../../components/AuthenContext";
import { Input } from "../../components/Input";
import { validate } from "../../utils/validate";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import Radio from "../../components/Radio";
import { orderService } from "../../services/orderService";
import { message } from "antd";
import { PATHS } from "../../constants/pathnames";
import useDebounce from "../../hooks/useDebounce";
import { PageLoading } from "../../components/PageLoading";
import useMutation from "../../hooks/useMutation";

const CourseOrder = () => {
  const navigate = useNavigate();
  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("");
  const onPaymentChange = (method) => setPaymentMethod(method);

  // Course Info
  const { slug } = useParams();
  const { data: courseDetail, loading: courseDeitailLoading } = useQuery(() =>
    courseService.getCourseBySlug(slug)
  );
  const { image, name, teams, price, tags, id: courseId } = courseDetail || {};

  const teacherInfo = useMemo(() => {
    return teams?.find((team) => team.tags.includes(Roles.Teacher));
  }, [teams]);

  const typeOptions = useMemo(
    () =>
      tags?.map((tag) => {
        return {
          label: tag,
          value: tag?.toLowerCase(),
        };
      }) || [],
    [tags]
  );

  // Profile Info
  const {
    profileInfo,
    onGetCourseHistories,
    onGetPaymentHistories,
    courseInfo,
  } = useAuthen();

  const { loading: mutateLoading, execute: executeOrderCourse } = useMutation(orderService.orderCourse, {
    onSuccess: async () => {
      message.success("Đăng ký thành công");
      await onGetCourseHistories();
      await onGetPaymentHistories();
      navigate(PATHS.PROFILE.COURSES);
    },
    onFail: (error) => {
      console.log("error", error);
      message.error("Đăng ký thất bại");
    },
  });

  console.log("courseInfo", courseInfo);

  // Tìm khoá học trùng
  const orderedCourse = courseInfo?.find(
    (info) => info?.course?.id === courseId
  );

  const {
    image: orderedImage,
    name: orderedName,
    teams: orderedTeams,
    price: orderedPrice,
  } = orderedCourse?.course || {};

  const orderedTeacherInfo = useMemo(() => {
    return orderedTeams?.find((team) => team.tags.includes(Roles.Teacher));
  }, [orderedTeams]);

  const isAlreadyOrdered = !!orderedCourse?.id;

  const [form, setForm] = useState({});
  const [error, setError] = useState({});

  const rules = {
    name: [{ required: true }],
    phone: [{ required: true }],
    type: [{ required: true }],
  };

  const onSubmit = useCallback(async () => {
    if (!isAlreadyOrdered) {
      const errObj = validate(rules, form);
      setError(errObj);

      console.log("form", form);

      if (Object.keys(errObj)?.length === 0) {
        // success
        if (courseId) {
          const payload = {
            name: form?.name,
            phone: form?.phone,
            course: courseId,
            type: form.type,
            paymentMethod,
          };

          executeOrderCourse(payload)

          // try {
          //   const res = await orderService.orderCourse(payload);

          //   if (res?.data?.data) {
          //     message.success("Đăng ký thành công");
          //     await onGetCourseHistories();
          //     await onGetPaymentHistories();
          //     navigate(PATHS.PROFILE.COURSES);
          //   }
          // } catch (error) {
          //   console.log("error", error);
          //   message.error("Đăng ký thất bại");
          // }
        }
      } else {
        // fail
      }
    } else {
      message.warning("Khoá học đã được đăng ký ");
    }
  }, [form, paymentMethod, isAlreadyOrdered]);

  const register = (registerField) => {
    return {
      error: error[registerField],
      value: form[registerField] || "",
      onChange: (ev) => setForm({ ...form, [registerField]: ev.target.value }),
    };
  };

  useEffect(() => {
    if (profileInfo || orderedCourse) {
      setForm({
        name: orderedCourse?.name || profileInfo?.firstName,
        email: orderedCourse?.email || profileInfo?.email,
        phone: orderedCourse?.phone || profileInfo?.phone,
        type: orderedCourse?.type || typeOptions[0]?.value,
      });
      console.log("orderedCourse?.paymentMethod", orderedCourse?.paymentMethod);
      setPaymentMethod(orderedCourse?.paymentMethod || "atm");
    }
  }, [profileInfo, typeOptions, orderedCourse, setPaymentMethod]);

  const isPageLoading = useDebounce(courseDeitailLoading, 500);

  if (isPageLoading) return <PageLoading />;

  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <div className="itemorder infoorder">
            <h3 className="title --t3">Thông tin đơn hàng</h3>
            <div className="boxorder">
              <div className="boxorder__col">
                <label className="label">Tên khoá học</label>
                <div className="boxorder__col-course">
                  <div className="img">
                    <img src={orderedImage || image} alt={slug} />
                  </div>
                  <div className="info">
                    <p className="name">
                      <strong>{orderedName || name || ""}</strong>
                    </p>
                    <p>{orderedTeacherInfo?.name || teacherInfo?.name}</p>
                  </div>
                </div>
              </div>
              <div className="boxorder__col">
                <label className="label">Tạm tính</label>
                <p>{formatCurrency(orderedPrice || price)}đ</p>
              </div>
              <div className="boxorder__col">
                <label className="label">Giảm giá</label>
                <p>0đ</p>
              </div>
              <div className="boxorder__col">
                <label className="label">thành tiền</label>
                <p>
                  <strong>{formatCurrency(orderedPrice || price)}đ</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="itemorder formorder">
            <h3 className="title --t3">Thông tin cá nhân</h3>
            <div className="boxorder">
              <div className="form">
                <div className="form-container">
                  <div className="form-group">
                    <Input
                      disabled={isAlreadyOrdered}
                      label="Họ và tên"
                      placeholder="Họ và tên"
                      required
                      {...register("name")}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Email"
                      placeholder="Email"
                      required
                      disabled
                      {...register("email")}
                    />
                  </div>
                </div>
                <div className="form-container">
                  <div className="form-group">
                    <Input
                      disabled={isAlreadyOrdered}
                      label="Số điện thoại"
                      placeholder="Số điện thoại"
                      required
                      {...register("phone")}
                    />
                  </div>
                  <div className="form-group">
                    <Select
                      disabled={isAlreadyOrdered}
                      label="Hình thức học"
                      required
                      options={typeOptions}
                      {...register("type")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="itemorder paymentorder">
            <h3 className="title --t3">Hình thức thanh toán</h3>
            {paymentMethod && (
              <Radio
                disabled={isAlreadyOrdered}
                className="boxorder"
                onChange={onPaymentChange}
                defaultValue={paymentMethod}
              >
                <div className="boxorder__pay">
                  <Radio.Option value="atm">
                    <img src="/img/icon-payment-method-atm.svg" alt="" />
                    <span className="checkmark" />
                    Thành toán bằng chuyển khoản
                  </Radio.Option>
                  <div className="boxorder__pay-tooltip">
                    Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
                    ngân hàng sẽ được gửi đến email của bạn, bạn vui lòng chuyển
                    khoản với nội dung: mã khoá học, họ và tên, số điện thoại,
                    CFD Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học
                    của bạn sau khi giao dịch thành công.
                  </div>
                </div>
                <div className="boxorder__pay">
                  <Radio.Option value="momo">
                    <img src="/img/icon-payment-method-mo-mo.svg" alt="" />
                    <span className="checkmark" />
                    Thanh toán bằng ví Momo
                  </Radio.Option>
                  <div className="boxorder__pay-tooltip">
                    Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
                    MoMo sẽ được gửi đến email của bạn, bạn vui lòng chuyển
                    khoản với nội dung: mã khoá học, họ và tên, số điện thoại,
                    CFD Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học
                    của bạn sau khi giao dịch thành công.
                  </div>
                </div>
                {/* Khoá học video và video mentor thì không có thanh toán tiền mặt */}
                <div className="boxorder__pay">
                  <Radio.Option value="cash">
                    <img src="/img/icon-payment-method-cod.svg" alt="" />
                    <span className="checkmark" />
                    Thanh toán bằng tiền mặt
                  </Radio.Option>
                  <div className="boxorder__pay-tooltip">
                    Sau khi bấm đăng ký, thông tin khoá học sẽ được gửi đến
                    email của bạn, bạn vui lòng đến văn phòng CFD Circle vào
                    ngày khai giảng để đóng học phí tại số 11b, Phan Kế Bính,
                    quận 1, TP Hồ Chí Minh.
                  </div>
                </div>
              </Radio>
            )}
          </div>
          {/* addclass --processing khi bấm đăng ký */}
          <Button
            onClick={onSubmit}
            disabled={isAlreadyOrdered}
            style={{ width: "100%" }}
          >
            <span>Đăng ký khoá học</span>
            {/* <svg
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 0 0"
              xmlSpace="preserve"
            >
              <path
                fill="#fff"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </path>
            </svg> */}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrder;

// // @ts-nocheck
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import useQuery from "../../hooks/useQuery";
// import { courseService } from "../../services/courseService";
// import { useAuthen } from "../../components/AuthenContext";
// import { Roles } from "../../constants/roles";
// import { formatCurrency } from "../../utils/format";
// import { validate } from "../../utils/validate";
// import { Select } from "../../components/Select";
// import { Input } from "../../components/Input";
// import Radio from "../../components/Radio";
// import { Button } from "../../components/Button";
// import { orderService } from "../../services/orderService";
// import { message } from "antd";
// import useDebounce from "../../hooks/useDebounce";
// import { PageLoading } from "../../components/PageLoading";
// import { PATHS } from "../../constants/pathnames";

// const CourseOrder = () => {
//   const navigate = useNavigate();
//   /* Course Info */
//   const { slug } = useParams();
//   const { data: courseDetail, loading: courseLoading } = useQuery(
//     () => courseService.getCourseBySlug(slug),
//     [slug]
//   );
//   const { image, name, teams, price, tags, id: courseId } = courseDetail || {};
//   console.log("courseDetail", courseDetail);

//   const teacherInfo = useMemo(() => {
//     return teams?.find((team) => team.tags.includes(Roles.Teacher));
//   }, [teams]);

//   const typeOptions =
//     tags?.map((tag) => {
//       return {
//         value: tag.toLowerCase(),
//         label: tag,
//       };
//     }) || [];

//   /* Profile Info */
//   const {
//     profileInfo,
//     courseInfo,
//     onGetCourseHistories,
//     onGetPaymentHistories,
//   } = useAuthen();
//   const [form, setForm] = useState({});
//   const [error, setError] = useState({});

//   const rules = {
//     name: [{ required: true }],
//     phone: [{ required: true }],
//   };

//   const onSubmit = () => {
//     const errObj = validate(rules, form);
//     setError(errObj);

//     if (Object.keys(errObj)?.length === 0) {
//       onOrder();
//     }
//   };

//   const register = (registerField) => {
//     return {
//       error: error[registerField],
//       value: form[registerField] || "",
//       onChange: (ev) => setForm({ ...form, [registerField]: ev.target.value }),
//     };
//   };

//   const orderedCourse = courseInfo?.find((info) => info.course.id === courseId);
//   const {
//     image: orderedImage,
//     name: orderedName,
//     teams: orderedTeams,
//     price: orderedPrice,
//   } = orderedCourse?.course || {};

//   const orderedTeacherInfo = useMemo(() => {
//     return orderedTeams?.find((team) => team.tags.includes(Roles.Teacher));
//   }, [teams]);

//   const isAlreadyOrdered = !!orderedCourse?.id;

//   useEffect(() => {
//     if (profileInfo || orderedCourse) {
//       setForm({
//         ...form,
//         name: orderedCourse?.name || profileInfo.firstName,
//         email: orderedCourse?.email || profileInfo.email,
//         phone: orderedCourse?.phone || profileInfo.phone,
//         type: orderedCourse?.type || typeOptions[0]?.value,
//       });
//     }
//   }, [profileInfo, orderedCourse]);

//   /* Payment Info */
//   const [paymentMethod, setPaymentMethod] = useState("atm");
//   const onPaymentMethodChange = (value) => setPaymentMethod(value);
//   useEffect(() => {
//     if (orderedCourse?.paymentMethod) {
//       setPaymentMethod(orderedCourse.paymentMethod);
//     }
//   }, [orderedCourse?.paymentMethod]);

//   /* Handle Order */
//   const onOrder = async () => {
//     if (!isAlreadyOrdered) {
//       if (slug && courseId) {
//         const payload = {
//           name: form.name,
//           phone: form.phone,
//           course: courseId,
//           type: form.type,
//           paymentMethod: paymentMethod,
//         };

//         try {
//           const res = await orderService.orderCourse(payload);
//           if (res?.data?.data) {
//             await onGetCourseHistories();
//             await onGetPaymentHistories();
//             message.success("Đăng ký khoá học thành công!");
//             navigate(PATHS.PROFILE.COURSES);
//           }
//         } catch (error) {
//           console.log("error", error);
//           message.error("Đăng ký thất bại!");
//         }
//       }
//     } else {
//       message.warning("Bạn đã đăng ký khoá học này!");
//     }
//   };

//   const pageLoading = useDebounce(courseLoading, 500);

//   if (pageLoading)
//     return (
//       <main className="mainwrapper --ptop">
//         <PageLoading />
//       </main>
//     );

//   return (
//     <main className="mainwrapper --ptop">
//       <section className="sccourseorder">
//         <div className="container small">
//           <div className="itemorder infoorder">
//             <h3 className="title --t3">Thông tin đơn hàng</h3>
//             <div className="boxorder">
//               <div className="boxorder__col">
//                 <label className="label">Tên khoá học</label>
//                 <div className="boxorder__col-course">
//                   <div className="img">
//                     <img src={orderedImage || image} alt={slug} />
//                   </div>
//                   <div className="info">
//                     <p className="name">
//                       <strong>{orderedName || name}</strong>
//                     </p>
//                     <p>{orderedTeacherInfo?.name || teacherInfo?.name}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="boxorder__col">
//                 <label className="label">Tạm tính</label>
//                 <p>{formatCurrency(orderedPrice || price)}đ</p>
//               </div>
//               <div className="boxorder__col">
//                 <label className="label">Giảm giá</label>
//                 <p>0đ</p>
//               </div>
//               <div className="boxorder__col">
//                 <label className="label">thành tiền</label>
//                 <p>
//                   <strong>{formatCurrency(orderedPrice || price)}đ</strong>
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="itemorder formorder">
//             <h3 className="title --t3">Thông tin cá nhân</h3>
//             <div className="boxorder">
//               <div className="form">
//                 <div className="form-container">
//                   <div className="form-group">
//                     <Input
//                       disabled={isAlreadyOrdered}
//                       label="Họ và tên"
//                       placeholder="Họ và tên"
//                       required
//                       {...register("name")}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <Input
//                       label="Email"
//                       placeholder="Email"
//                       required
//                       disabled
//                       {...register("email")}
//                     />
//                   </div>
//                 </div>
//                 <div className="form-container">
//                   <div className="form-group">
//                     <Input
//                       disabled={isAlreadyOrdered}
//                       label="Số điện thoại"
//                       placeholder="Số điện thoại"
//                       required
//                       {...register("phone")}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <Select
//                       disabled={isAlreadyOrdered}
//                       label="Hình thức học"
//                       required
//                       defaultValue={typeOptions[0]?.value || ""}
//                       options={typeOptions}
//                       {...register("type")}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="itemorder paymentorder">
//             <h3 className="title --t3">Hình thức thanh toán</h3>
//             <Radio
//               className="boxorder"
//               defaultValue={paymentMethod}
//               onChange={onPaymentMethodChange}
//               disabled={isAlreadyOrdered}
//             >
//               <div className="boxorder__pay">
//                 <Radio.Option value="atm">
//                   <img src="/img/icon-payment-method-atm.svg" alt="" />
//                   Thành toán bằng chuyển khoản
//                   <span className="checkmark" />
//                 </Radio.Option>
//                 <div className="boxorder__pay-tooltip">
//                   Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
//                   ngân hàng sẽ được gửi đến email của bạn, bạn vui lòng chuyển
//                   khoản với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
//                   Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
//                   bạn sau khi giao dịch thành công.
//                 </div>
//               </div>
//               <div className="boxorder__pay">
//                 <Radio.Option value="momo">
//                   <img src="/img/icon-payment-method-mo-mo.svg" alt="" />
//                   Thanh toán bằng ví Momo
//                   <span className="checkmark" />
//                 </Radio.Option>
//                 <div className="boxorder__pay-tooltip">
//                   Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
//                   MoMo sẽ được gửi đến email của bạn, bạn vui lòng chuyển khoản
//                   với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
//                   Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
//                   bạn sau khi giao dịch thành công.
//                 </div>
//               </div>
//               <div className="boxorder__pay">
//                 <Radio.Option value="cash">
//                   <img src="/img/icon-payment-method-cod.svg" alt="" />
//                   Thanh toán bằng tiền mặt
//                   <span className="checkmark" />
//                 </Radio.Option>
//                 <div className="boxorder__pay-tooltip">
//                   Sau khi bấm đăng ký, thông tin khoá học sẽ được gửi đến email
//                   của bạn, bạn vui lòng đến văn phòng CFD Circle vào ngày khai
//                   giảng để đóng học phí tại số 11b, Phan Kế Bính, quận 1, TP Hồ
//                   Chí Minh.
//                 </div>
//               </div>
//             </Radio>
//             {/* <div className="boxorder">
//               <div className="boxorder__pay">
//                 <label className="radiocontainer">
//                   <input type="radio" name="radio" />
//                   <img src="/img/icon-payment-method-atm.svg" alt="" />
//                   Thành toán bằng chuyển khoản
//                   <span className="checkmark" />
//                 </label>
//                 <div className="boxorder__pay-tooltip">
//                   Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
//                   ngân hàng sẽ được gửi đến email của bạn, bạn vui lòng chuyển
//                   khoản với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
//                   Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
//                   bạn sau khi giao dịch thành công.
//                 </div>
//               </div>
//               <div className="boxorder__pay">
//                 <label className="radiocontainer">
//                   <input type="radio" name="radio" />
//                   <img src="/img/icon-payment-method-mo-mo.svg" alt="" />
//                   Thanh toán bằng ví Momo
//                   <span className="checkmark" />
//                 </label>
//                 <div className="boxorder__pay-tooltip">
//                   Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
//                   MoMo sẽ được gửi đến email của bạn, bạn vui lòng chuyển khoản
//                   với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
//                   Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
//                   bạn sau khi giao dịch thành công.
//                 </div>
//               </div>
//               <div className="boxorder__pay">
//                 <label className="radiocontainer">
//                   <input type="radio" name="radio" />
//                   <img src="/img/icon-payment-method-cod.svg" alt="" />
//                   Thanh toán bằng tiền mặt
//                   <span className="checkmark" />
//                 </label>
//                 <div className="boxorder__pay-tooltip">
//                   Sau khi bấm đăng ký, thông tin khoá học sẽ được gửi đến email
//                   của bạn, bạn vui lòng đến văn phòng CFD Circle vào ngày khai
//                   giảng để đóng học phí tại số 11b, Phan Kế Bính, quận 1, TP Hồ
//                   Chí Minh.
//                 </div>
//               </div>
//             </div> */}
//           </div>
//           {/* addclass --processing khi bấm đăng ký */}
//           <Button
//             onClick={onSubmit}
//             style={{ width: "100%" }}
//             disabled={isAlreadyOrdered}
//           >
//             <span>{isAlreadyOrdered ? "Đã đăng ký" : "Đăng ký khoá học"}</span>
//             {/* <svg
//               version="1.1"
//               id="L9"
//               xmlns="http://www.w3.org/2000/svg"
//               xmlnsXlink="http://www.w3.org/1999/xlink"
//               x="0px"
//               y="0px"
//               viewBox="0 0 100 100"
//               enableBackground="new 0 0 0 0"
//               xmlSpace="preserve"
//             >
//               <path
//                 fill="#fff"
//                 d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
//               >
//                 <animateTransform
//                   attributeName="transform"
//                   attributeType="XML"
//                   type="rotate"
//                   dur="1s"
//                   from="0 50 50"
//                   to="360 50 50"
//                   repeatCount="indefinite"
//                 />
//               </path>
//             </svg> */}
//           </Button>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default CourseOrder;
