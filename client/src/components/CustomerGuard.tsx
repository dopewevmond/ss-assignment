import React from "react";
import { useAppSelector } from "../redux/store";
import { selectRole } from "../redux/userSlice";
import { Navigate, Outlet } from "react-router-dom";

const CustomerGuard = () => {
  const role = useAppSelector(selectRole);
  return <>{role === "customer" ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default CustomerGuard;
