import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn as admin,
  logout as adminlogout,
} from "../redux/adminSlice";
import {
  selectIsLoggedIn as customer,
  logout as customerlogout,
} from "../redux/customerSlice";
import jwtDecode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";

export const useRedirectOnLoginPages = () => {
  const adminLoggedIn = useSelector(admin);
  const customerLoggedIn = useSelector(customer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (adminLoggedIn || customerLoggedIn) {
      try {
        const token = localStorage.getItem("token");
        const { role } = jwtDecode(String(token)) as any;
        let navigatePath = "/";
        if (role === "admin") {
          navigatePath = "/admin";
        }
        navigate(navigatePath, { replace: true });
      } catch (err) {
        dispatch(customerlogout());
        dispatch(adminlogout());
      }
    }
  }, [adminLoggedIn, customerLoggedIn]);
};
