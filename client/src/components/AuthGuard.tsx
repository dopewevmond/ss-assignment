import React from "react";
import { useAppSelector } from "../redux/store";
import { selectIsLoggedIn } from "../redux/userSlice";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default AuthGuard;
