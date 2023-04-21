import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Customer, CustomerSlice } from "../types";
import { axiosInstance } from "../lib/axiosInstance";
import { RootState } from "./store";
import { AxiosError } from "axios";

const initialState: CustomerSlice = {
  client_number: localStorage.getItem("client_number") ?? null,
  isLoggedIn: Boolean(localStorage.getItem("token")),
  email: localStorage.getItem("email") ?? null,
  gender: localStorage.getItem("gender") ?? null,
  mobile: localStorage.getItem("mobile") ?? null,
  client_name: localStorage.getItem("client_name") ?? null,
};

const customerSlice = createSlice({
  name: "customerSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.client_number = null;
      state.isLoggedIn = false;
      state.email = null;
      state.gender = null;
      state.mobile = null;
      state.client_name = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.client_name = payload.client_name;
        state.mobile = payload.mobile;
        state.email = payload.email;
        state.gender = payload.gender;

        localStorage.setItem("client_name", payload.client_name);
        localStorage.setItem("email", payload.email);
        localStorage.setItem("mobile", payload.mobile);
        localStorage.setItem("gender", payload.gender);
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.client_name = payload.client_name;
        state.email = payload.email;
        state.client_number = payload.client_number;
        state.mobile = payload.mobile;
        state.gender = payload.gender;

        localStorage.setItem("token", payload.token);
        localStorage.setItem("client_name", payload.client_name);
        localStorage.setItem("email", payload.email);
        localStorage.setItem("client_number", payload.client_number);
        localStorage.setItem("mobile", payload.mobile);
        localStorage.setItem("gender", payload.gender);
      });
  },
});

export const login = createAsyncThunk(
  `${customerSlice.name}/login`,
  async (client_number: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<Customer & { token: string }>(
        "/auth/login",
        { client_number }
      );
      return data;
    } catch (err: any) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data.message ?? "An error occurred while logging in"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (newProfileDetails: Customer, { rejectWithValue }) => {
    try {
      const { client_number, ...rest } = newProfileDetails;
      const { data } = await axiosInstance.put<Customer>(
        `/users/${client_number}`,
        rest,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data.message ??
          "An error occurred while updating your profile"
      );
    }
  }
);

export const { logout } = customerSlice.actions;

export const selectClientNumber = (state: RootState) =>
  state.customer.client_number;
export const selectClientName = (state: RootState) =>
  state.customer.client_name;
export const selectMobile = (state: RootState) => state.customer.mobile;
export const selectEmail = (state: RootState) => state.customer.email;
export const selectGender = (state: RootState) => state.customer.gender;
export const selectIsLoggedIn = (state: RootState) => state.customer.isLoggedIn;

export default customerSlice.reducer;
