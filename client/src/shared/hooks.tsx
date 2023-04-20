import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { login as loginthunk, selectIsLoggedIn, selectRole } from "../redux/userSlice";
import { LoginCredentials } from "../types";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const login = async (
    data: LoginCredentials,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      await dispatch(loginthunk(data));
      setSubmitting(false);
    } catch (err) {
      
    }
  };

  return { login };
};

export const useRedirect = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const role = useAppSelector(selectRole)
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn) {
      let nextRoute = '/'
      if (role === 'admin') {
        nextRoute = '/admin'
      }
    navigate(nextRoute) 
    }
  }, [isLoggedIn]);
}