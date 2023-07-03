import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { message } from "antd";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { orderService } from "../../services/orderService";

const AuthenContext = createContext({});

export const AuthenProvider = ({ children }) => {
  const [isAuthenModalOpen, setIsAuthenModalOpen] = useState(false);
  const [renderForm, setRenderForm] = useState("login");
  const [profileInfo, setProfileInfo] = useState({});
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE.token);
    if (accessToken) {
      // call api get profile
      onGetProfile();
      onGetCourseHistories();
      onGetPaymentHistories();
    }
  }, []);

  const openAuthenModal = () => {
    if (!!!localStorage.getItem(LOCAL_STORAGE.token)) {
      setIsAuthenModalOpen(true);
    }
  };

  const closeAuthenModal = () => {
    setIsAuthenModalOpen(false);
    setRenderForm("login");
  };

  const onLogin = async (loginData) => {
    // call API
    try {
      const res = await authService.login(loginData);
      const { token, refreshToken } = res?.data?.data || {};

      // Lưu vào local storage
      localStorage.setItem(LOCAL_STORAGE.token, token);
      localStorage.setItem(LOCAL_STORAGE.refreshToken, refreshToken);

      if (!!token) {
        // Lấy thông tin profile
        onGetProfile();
        onGetCourseHistories();
        onGetPaymentHistories();

        // Thông báo
        message.success("Đăng nhập thành công");

        // Đóng modal
        closeAuthenModal();
      }
    } catch (error) {
      console.log("error", error);
      message.error("Đăng nhập thất bại");
    }
  };
  const onRegister = async (registerData) => {
    // call API
    console.log("registerData", registerData);
    try {
      const res = await authService.register(registerData);
      if (res?.data?.data?.id) {
        message.success("Đăng ký thành công");
        onLogin({
          email: registerData.email,
          password: registerData.password,
        });
      }
    } catch (error) {
      console.log("error", error);
      message.error("Đăng ký thất bại");
    }
  };

  const onLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE.token);
    localStorage.removeItem(LOCAL_STORAGE.refreshToken);
    setProfileInfo({});
    setCourseInfo([]);
    setPaymentInfo([]);
  };

  const onGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      if (profileRes?.data?.data) {
        setProfileInfo(profileRes.data.data);
      }
    } catch (error) {
      console.log("error", error);
      onLogout();
    }
  };

  const onGetCourseHistories = async () => {
    const res = await orderService.getCourseHistories();
    if (res?.data?.data) {
      // const mapCourses = res?.data?.data?.orders?.map((order) => order?.course);
      const mapCourses = res?.data?.data?.orders;
      setCourseInfo(mapCourses ?? []);
    }
  };

  const onGetPaymentHistories = async () => {
    const res = await orderService.getPaymentHistories();
    if (res?.data?.data) {
      const mapPayments = res?.data?.data?.orders;
      setPaymentInfo(mapPayments ?? []);
    }
  };

  return (
    <AuthenContext.Provider
      value={{
        isAuthenModalOpen,
        renderForm,
        profileInfo,
        setProfileInfo,
        courseInfo,
        setCourseInfo,
        paymentInfo,
        setPaymentInfo,
        openAuthenModal,
        closeAuthenModal,
        onLogin,
        onRegister,
        setRenderForm,
        onLogout,
        onGetCourseHistories,
        onGetPaymentHistories
      }}
    >
      {children}
    </AuthenContext.Provider>
  );
};

export const useAuthen = () => useContext(AuthenContext);
