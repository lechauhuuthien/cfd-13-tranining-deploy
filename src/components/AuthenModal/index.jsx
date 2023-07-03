// @ts-nocheck
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useAuthen } from "../AuthenContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export const AuthenModal = () => {
  const { isAuthenModalOpen, closeAuthenModal } = useAuthen();

  return ReactDOM.createPortal(
    <div className={`modal modallogin ${isAuthenModalOpen ? "open" : ""}`}>
      <div className="modal__wrapper">
        <div className="modal__wrapper-close" onClick={closeAuthenModal}>
          <img src="/img/close_icon.svg" alt="CFD Register" />
        </div>
        <LoginForm />
        <RegisterForm />
      </div>
      <div className="modal__overlay" onClick={closeAuthenModal} />
    </div>,
    document.body
  );

  // return ReactDOM.createPortal(
  //   <div className={`modal modallogin ${isAuthenModalOpen ? "open" : ""}`}>
  //     <div className="modal__wrapper">
  //       <div className="modal__wrapper-close" onClick={closeAuthenModal}>
  //         <img src="/img/close_icon.svg" alt="CFD Register" />
  //       </div>
  //       <LoginForm />
  //       <RegisterForm />
  //     </div>
  //     <div className="modal__overlay" onClick={closeAuthenModal} />
  //   </div>,
  //   document.body
  // );
};
