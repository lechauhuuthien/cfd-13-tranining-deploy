// @ts-nocheck
import React, { useState } from "react";
import { styled } from "styled-components";
import { validate } from "../../utils/validate";
import { Input } from "../Input";
import { useAuthen } from "../AuthenContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LoginForm = () => {
  const { onLogin, renderForm, setRenderForm } = useAuthen();
  const [form, setForm] = useState({});
  const [error, setError] = useState({});

  const rules = {
    email: [
      { required: true, message: "Vui lòng điền email" },
      {
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Vui lòng điền đúng email",
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

  const onSubmit = (ev) => {
    ev.preventDefault();
    const errObj = validate(rules, form);
    setError(errObj);
    console.log("errObj", errObj);

    if (Object.keys(errObj)?.length === 0) {
      // call Login API
      onLogin?.(form);
      setForm({})
    } else {
      console.log("Validate fail");
    }
  };

  const isRender = renderForm === "login";

  return (
    <div
      className={`modal__wrapper-content mdlogin ${isRender ? "active" : ""}`}
    >
      <h3 className="title --t3">Đăng nhập</h3>
      <Form onSubmit={onSubmit} className="form">
        <Input
          label="Email"
          placeholder="Vui lòng nhập email"
          required
          {...register("email")}
        />
        <Input
          label="Mật khẩu"
          placeholder="Vui lòng nhập mật khẩu"
          required
          type="password"
          {...register("password")}
        />
        <div className="form__bottom">
          <p>
            Bạn chưa có tài khoản?{" "}
            <span
              className="color--primary btnmodal"
              onClick={() => setRenderForm("register")}
            >
              Đăng ký
            </span>
          </p>
        </div>
        <button className="btn btn--primary form__btn-register" type="submit">
          Đăng nhập
        </button>
      </Form>
    </div>
  );
};

export default LoginForm;
