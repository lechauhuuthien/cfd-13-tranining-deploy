// @ts-nocheck
import React, { useEffect } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { PATHS } from "../constants/pathnames";
import { LOCAL_STORAGE } from "../constants/localStorage";
import { useAuthen } from "../components/AuthenContext";
import { orderService } from "../services/orderService";

const ProfileLayout = () => {
  const token = localStorage.getItem(LOCAL_STORAGE.token);
  const { profileInfo, setCourseInfo, setPaymentInfo } = useAuthen();

  if (!token) {
    return <Navigate to="/" />;
  }

  const { firstName, email, phone, introduce, website } = profileInfo || {};

  // const onGetCourseHistories = async () => {
  //   const res = await orderService.getCourseHistories(token);
  //   if (res?.data?.data) {
  //     const mapCourses = res?.data?.data?.orders?.map((order) => order?.course);
  //     setCourseInfo(mapCourses ?? []);
  //   }
  // };

  // const onGetPaymentHistories = async () => {
  //   const res = await orderService.getPaymentHistories(token);
  //   if (res?.data?.data) {
  //     const mapPayments = res?.data?.data?.orders;
  //     setPaymentInfo(mapPayments ?? []);
  //   }
  // };

  // useEffect(() => {
  //   onGetCourseHistories();
  //   onGetPaymentHistories();
  // }, []);

  return (
    <main className="mainwrapper profilepage">
      <div className="container">
        <div className="wrapper">
          <div className="sidebar">
            <div className="sidebar__info">
              <div className="useravatar">
                <div className="avatar">
                  <div className="img">
                    <img src="/img/avatar_nghia.jpg" alt="avatar" />
                  </div>
                </div>
                <h3 className="title --t3">{firstName}</h3>
              </div>
            </div>
            <div className="sidebar__content">
              <h4>Giới thiệu</h4>
              <p className="description">{introduce}</p>
              <ul>
                <li>
                  <img src="/img/icon-mail-outline.svg" alt="icon" />
                  <span>{email}</span>
                </li>
                <li>
                  <img src="/img/icon-phone-outline.svg" alt="icon" />
                  <span>{phone}</span>
                </li>
                <li>
                  <img src="/img/icon-link.svg" alt="icon" />
                  <a href="#" target="_blank">
                    {website}
                  </a>
                </li>
              </ul>
              <div className="social">
                <a href="#">
                  <img src="/img/icon-facebook-dark.svg" alt="" />
                </a>
                <a href="#">
                  <img src="/img/icon-linkedin-dark.svg" alt="" />
                </a>
                <a href="#">
                  <img src="/img/icon-youtube-dark.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="tabwrap">
            <div className="tab">
              <div className="tab__title">
                <NavLink end to={PATHS.PROFILE.INDEX}>
                  Thông tin cá nhân
                </NavLink>
                <NavLink to={PATHS.PROFILE.COURSES}>Khóa học của tôi</NavLink>
                <NavLink to={PATHS.PROFILE.PAYMENT}>Lịch sử thanh toán</NavLink>
              </div>
              <div className="tab__content">
                {/* Outlet */}
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileLayout;
