// @ts-nocheck
import React, { useCallback, useState } from "react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { validate } from "../../utils/validate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useMutation from "../../hooks/useMutation";
import { subscribesService } from "../../services/subscribesService";
import { message } from "antd";
import { useAuthen } from "../../components/AuthenContext";

const ContactPage = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const {
    execute: executeSubscribe,
    data,
    loading,
    error: subscribesError,
  } = useMutation(subscribesService.subscribes);

  const rules = {
    name: [{ required: true }],
    email: [{ required: true }, { regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ }],
    phone: [{ required: true }],
    topic: [{ required: true }],
    content: [{ required: true }],
  };

  const onSubmit = useCallback(() => {
    const errObj = validate(rules, form);
    setError(errObj);

    if (Object.keys(errObj)?.length === 0) {
      const payload = {
        name: form?.name || "",
        title: "",
        email: form?.email || "",
        description: form?.content || "",
        age: 10,
      };

      executeSubscribe(payload);

      // Trở về trang chủ
      message.success('Tạo thành công')
      navigate("/");
    } else {
      console.log("Validate fail");
    }
  }, [form])

  const register = (registerField) => {
    return {
      error: error[registerField],
      value: form[registerField] || "",
      onChange: (ev) => setForm({ ...form, [registerField]: ev.target.value }),
    };
  };

  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <div className="textbox">
          <h2 className="title --t2">Liên hệ &amp; Hỗ trợ</h2>
          <p className="desc">
            Bạn có bất cứ thắc mắc nào thì đừng ngần ngại liên hệ để được hỗ
            trợ?
            <br />
            Chúng tôi luôn ở đây
          </p>
        </div>
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <div className="sidebar">
              <div className="sidebar__address infor">
                <div className="infor__item">
                  <label className="label">CFD Circle</label>
                  <p className="title --t4">
                    666/46/29 Ba Tháng Hai, phường 14, quận 10, TPHCM
                  </p>
                </div>
                <div className="infor__item">
                  <label className="label">Email</label>
                  <p className="title --t4">info@cfdcircle.vn</p>
                </div>
                <div className="infor__item">
                  <label className="label">Số điện thoại</label>
                  <p className="title --t4">098 9596 913</p>
                </div>
              </div>
              <div className="sidebar__business">
                <p>
                  Đối với yêu cầu kinh doanh xin vui lòng gửi cho chúng tôi tại:
                </p>
                <a href="#">business@cfdcircle.vn</a>
              </div>
              <a href="#" className="sidebar__messenger btn btn--primary">
                Trò chuyện trực tuyến
              </a>
            </div>
            <div className="form">
              <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
              <div className="form-group">
                <Input
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
                  {...register("email")}
                />
              </div>
              <div className="form-group">
                <Input
                  label="Số điện thoại"
                  placeholder="Số điện thoại"
                  required
                  {...register("phone")}
                />
              </div>
              <div className="form-group">
                <Select
                  label="Chủ đề cần hỗ trợ"
                  required
                  options={[
                    { value: "", label: "--" },
                    { value: "responsive", label: "Web Responsive" },
                    { value: "react", label: "React" },
                  ]}
                  {...register("topic")}
                />
              </div>
              <div className="form-group">
                <Input
                  label="Nội dung"
                  placeholder="Nội dung"
                  required
                  {...register("content")}
                  renderInput={(inputProps) => (
                    <textarea
                      className={`form__input ${
                        !!inputProps.error ? "formerror" : ""
                      }`}
                      {...inputProps}
                    />
                  )}
                />
              </div>
              <div className="btncontrol">
                <button className="btn btn--primary" onClick={onSubmit}>
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
