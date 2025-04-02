import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UnprotectedRoute = () => {
  const login = useSelector((state) => state.user.isAuth);


  if (login) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UnprotectedRoute;