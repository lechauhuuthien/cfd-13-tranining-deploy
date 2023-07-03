// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useAuthen } from "../../components/AuthenContext";
import { Input } from "../../components/Input";
import { message } from "antd";
import { authService } from "../../services/authService";
import { validate } from "../../utils/validate";
import { LOCAL_STORAGE } from "../../constants/localStorage";

const MyInfo = () => {
  const { profileInfo, setProfileInfo } = useAuthen();
  const token = localStorage.getItem(LOCAL_STORAGE.token);
  const [form, setForm] = useState({
    password: "******",
  });
  const [error, setError] = useState({});

  const rules = {
    firstName: [{ required: true, message: "Vui lòng điền họ và tên" }],
    email: [
      { required: true, message: "Vui lòng điền email" },
      {
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Vui lòng điền đúng email",
      },
    ],
    phone: [
      { required: true, message: "Vui lòng điền số điện thoại" },
      {
        regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        message: "Vui lòng điền đúng số điện thoại",
      },
    ],
    password: [{ required: true, message: "Vui lòng điền mật khẩu" }],
  };

  const register = (registerField) => {
    return {
      error: error[registerField],
      value: form[registerField] || "",
      onChange: (ev) => setForm({ ...form, [registerField]: ev.target.value }),
    };
  };

  const onSubmit = async (ev) => {
    ev?.preventDefault();
    try {
      const errObj = validate(rules, form);
      setError(errObj);
      if (Object.keys(errObj)?.length !== 0)
        return message.error("Vui lòng nhập đầy đủ thông tin!");
      const res = await authService.updateProfile(form, token);
      if (res.status) {
        setProfileInfo(res?.data?.data);
        message.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      message.error("Cập nhật thông tin thất bại!");
    }
  };

  useEffect(() => {
    if (profileInfo) {
      setForm({ ...form, ...profileInfo });
    }
  }, [profileInfo]);

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form onSubmit={onSubmit} className="form">
        <div className="form-container">
          <div className="form-group">
            <Input
              label="Họ và tên"
              placeholder="Vui lòng nhập họ và tên"
              required
              {...register("firstName")}
            />
          </div>
          <div className="form-group">
            <Input
              label="Số điện thoại"
              placeholder="Vui lòng nhập số điện thoại"
              required
              {...register("phone")}
            />
          </div>
        </div>
        <div className="form-container">
          <div className="form-group">
            <Input
              label="Email"
              placeholder="Vui lòng nhập email"
              required
              disabled
              {...register("email")}
            />
          </div>
          <div className="form-group">
            <Input
              label="Mật khẩu"
              disabled
              required
              {...register("password")}
            />
          </div>
        </div>
        <div className="form-group">
          <Input label="Facebook URL" {...register("facebookURL")} />
        </div>
        <div className="form-group">
          <Input label="Website" {...register("website")} />
        </div>
        <div className="form-container textarea">
          <Input
            label="Giới thiệu bản thân"
            {...register("introduce")}
            renderInput={(inputProps) => (
              <textarea className="form__input" {...inputProps} />
            )}
          />
        </div>
        <div className="form-group">
          <div className="btnsubmit">
            <button className="btn btn--primary">Lưu lại</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyInfo;
