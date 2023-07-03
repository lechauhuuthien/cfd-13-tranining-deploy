import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { useAuthen } from "../AuthenContext";

const PrivateRoute = ({ redirectPath = "/" }) => {
  // @ts-ignore
  const { openAuthenModal } = useAuthen();
  const isLogin = localStorage.getItem(LOCAL_STORAGE.token);
  if (!isLogin) {
    openAuthenModal(true);
    return <Navigate to={redirectPath} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
