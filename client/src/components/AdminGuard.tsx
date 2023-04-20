import React from "react";
import { useAppSelector } from "../redux/store";
import { selectRole } from "../redux/userSlice";
import { Navigate, Outlet } from "react-router-dom";

const AdminGuard = () => {
  const role = useAppSelector(selectRole);
  return <>{role === "admin" ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default AdminGuard;
