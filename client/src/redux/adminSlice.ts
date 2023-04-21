import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminLoginCredentials, AdminSlice } from "../types";
import { axiosInstance } from "../lib/axiosInstance";
import { RootState } from "./store";
import { AxiosError } from "axios";

const initialState: AdminSlice = {
  first_name: localStorage.getItem("firstname") ?? null,
  embedUrl: localStorage.getItem("embedUrl") ?? null,
  isLoggedIn: Boolean(localStorage.getItem("token")),
  email: localStorage.getItem("email") ?? null,
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.embedUrl = null;
      state.first_name = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshEmbedUrl.fulfilled, (state, { payload }) => {
        state.embedUrl = payload;
        localStorage.setItem("embedUrl", payload);
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.email = payload.email;
        state.embedUrl = payload.embedUrl;
        state.first_name = payload.firstname;
        state.isLoggedIn = true;
        localStorage.setItem("token", payload.token);
        localStorage.setItem("email", payload.email);
        localStorage.setItem("firstname", payload.firstname);
        localStorage.setItem("embedUrl", payload.embedUrl);
      });
  },
});

export const login = createAsyncThunk(
  "login",
  async (credentials: AdminLoginCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<{
        role: string;
        firstname: string;
        email: string;
        embedUrl: string;
        id: string;
        token: string;
      }>("/auth/admin/login", { ...credentials });
      return data;
    } catch (err: any) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data.message ?? "An error occurred while logging in"
      );
    }
  }
);

export const refreshEmbedUrl = createAsyncThunk(
  "refreshEmbedUrl",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { embedUrl },
      } = await axiosInstance.post<{ embedUrl: string }>(
        "/auth/embedurl",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return embedUrl;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data.message ??
          "An error occurred while getting a Metabase refresh token"
      );
    }
  }
);

export const { logout } = adminSlice.actions;

export const selectFirstName = (state: RootState) => state.admin.first_name;
export const selectEmbedUrl = (state: RootState) => state.admin.embedUrl;
export const selectEmail = (state: RootState) => state.admin.email;
export const selectIsLoggedIn = (state: RootState) => state.admin.isLoggedIn;

export default adminSlice.reducer;
