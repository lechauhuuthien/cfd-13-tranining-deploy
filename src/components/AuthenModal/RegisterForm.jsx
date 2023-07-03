// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { validate } from "../../utils/validate";
import { Input } from "../Input";
import { useAuthen } from "../AuthenContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RegisterForm = () => {
  const { onRegister, renderForm, setRenderForm } = useAuthen();
  const [form, setForm] = useState({});
  const [error, setError] = useState({});

  const rules = {
    name: [{ required: true, message: "Vui lòng điền họ và tên" }],
    email: [
      { required: true, message: "Vui lòng điền email" },
      {
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Vui lòng điền đúng email",
      },
    ],
    password: [{ required: true, message: "Vui lòng điền mật khẩu" }],
  };

  // console.log("first", /(84|0[3|5|7|8|9])+([0-9]{8})\b/);

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

    if (Object.keys(errObj)?.length === 0) {
      // call Login API
      onRegister?.({
        firstName: form?.name || "",
        lastName: "",
        email: form?.email || "",
        password: form?.password || "",
      });
      setForm({});
    } else {
      console.log("Validate fail");
    }
  };

  const isRender = renderForm === "register";

  const firstInputRef = useRef();
  console.log("firstInputRef", firstInputRef);

  useEffect(() => {
    console.log("first render");
    if (isRender) {
      firstInputRef?.current?.focusInput();
      console.log('cfd test', firstInputRef?.current?.cfd)
    } else {
      setForm({});
      setError({});
    }
  }, [isRender]);

  // useEffect(() => {
  //   if (isRender) {
  //     firstInputRef.current?.focus();
  //   } else {
  //     setForm({});
  //     setError({});
  //   }
  // }, [isRender]);

  return (
    <div
      className={`modal__wrapper-content mdregister ${
        isRender ? "active" : ""
      }`}
    >
      <h3 className="title --t3">Đăng ký tài khoản</h3>
      <Form onSubmit={onSubmit} className="form">
        <Input
          id="firstInput"
          ref={firstInputRef}
          label="Họ và tên"
          placeholder="Vui lòng nhập họ và tên"
          required
          {...register("name")}
        />
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
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý
          <a className="color--primary" href="#">
            Chính Sách
          </a>{" "}
          &amp;
          <a className="color--primary" href="#">
            Điều Khoản
          </a>{" "}
          của CFD
        </p>
        <p onClick={() => setRenderForm("login")} className="color--primary">
          Bạn đã có tài khoản?
        </p>
        <button className="btn btn--primary form__btn-register" type="submit">
          Đăng ký
        </button>
        <button
          onClick={() => console.log(firstInputRef?.current?.getValue())}
          className="btn btn--primary form__btn-register"
        >
          Lấy giá trị của input đầu tiên
        </button>
      </Form>
    </div>
  );
};

export default RegisterForm;
