import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import {
  UserSlice,
  EditProfile,
  LocalStorageKeys,
  LoginCredentials,
  SignupCredentials,
} from "../types";
import { axiosInstance } from "../lib/axiosInstance";
import { RootState } from "./store";
import { AxiosError } from "axios";

const initialState: UserSlice = {
  id: localStorage.getItem(LocalStorageKeys.id),
  isLoggedIn: Boolean(localStorage.getItem(LocalStorageKeys.token)),
  role: localStorage.getItem(LocalStorageKeys.role) as
    | "admin"
    | "customer"
    | null,
  firstname: localStorage.getItem(LocalStorageKeys.firstname),
  email: localStorage.getItem(LocalStorageKeys.email),
  embedUrl: localStorage.getItem(LocalStorageKeys.embedUrl),
  error: null,
  gender: null,
  phonenumber: null,
  lastname: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null;
      state.isLoggedIn = false;
      state.role = null;
      state.firstname = null;
      state.email = null;
      state.embedUrl = null;
      state.error = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshEmbedUrl.fulfilled, (state, { payload }) => {
      state.embedUrl = payload;
    });

    builder
      .addMatcher(
        isAnyOf(login.pending, signup.pending, refreshEmbedUrl.pending),
        (state) => {
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(getProfileDetails.fulfilled, updateProfile.fulfilled),
        (state, { payload }) => {
          state.email = payload.email;
          state.firstname = payload.firstname;
          state.lastname = payload.lastname;
          state.gender = payload.gender;
          state.phonenumber = payload.phonenumber;
        }
      )
      .addMatcher(
        isAnyOf(login.fulfilled, signup.fulfilled),
        (state, { payload }) => {
          state.isLoggedIn = true;
          state.role = payload.role as "admin" | "customer";
          state.firstname = payload.firstname;
          state.email = payload.email;
          state.id = payload.id;
          state.embedUrl = payload.embedUrl ?? null;

          localStorage.setItem(LocalStorageKeys.role, payload.role);
          localStorage.setItem(LocalStorageKeys.token, payload.token);
          localStorage.setItem(LocalStorageKeys.firstname, payload.firstname);
          localStorage.setItem(LocalStorageKeys.email, payload.email);
          localStorage.setItem(LocalStorageKeys.id, payload.id);
          if (payload.embedUrl)
            localStorage.setItem(LocalStorageKeys.embedUrl, payload.embedUrl);
        }
      )
      .addMatcher(
        isAnyOf(login.rejected, signup.rejected, refreshEmbedUrl.rejected),
        (state, { payload }) => {
          state.error = payload as string;
        }
      );
  },
});

export const login = createAsyncThunk(
  `[${userSlice.name}] - login`,
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<{
        role: string;
        firstname: string;
        email: string;
        embedUrl?: string;
        id: string;
        token: string;
      }>("/auth/login", { ...credentials });
      return data;
    } catch (err: any) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data.message ?? "An error occurred while logging in"
      );
    }
  }
);

export const signup = createAsyncThunk(
  `[${userSlice.name}] - signup`,
  async (credentials: SignupCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<{
        role: string;
        firstname: string;
        email: string;
        embedUrl?: string;
        id: string;
        token: string;
      }>("/auth/signup", { ...credentials });
      return data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data.message ?? "An error occurred while signing up"
      );
    }
  }
);

export const refreshEmbedUrl = createAsyncThunk(
  `[${userSlice.name}] - refresh embed url`,
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { embedUrl },
      } = await axiosInstance.post<{ embedUrl: string }>(
        "/auth/embedurl",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              LocalStorageKeys.token
            )}`,
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

export const updateProfile = createAsyncThunk(
  `[${userSlice.name}] - update profile`,
  async (
    newProfileDetails: EditProfile & { id: string },
    { rejectWithValue }
  ) => {
    try {
      const { id, ...rest } = newProfileDetails;
      const { data } = await axiosInstance.put<EditProfile>(
        `/users/${id}`,
        rest,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              LocalStorageKeys.token
            )}`,
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

export const getProfileDetails = createAsyncThunk(
  `[${userSlice.name}] - get profile details`,
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<EditProfile>(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            LocalStorageKeys.token
          )}`,
        },
      });
      return data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data.message ??
          "An error occurred while fetching your profile details"
      );
    }
  }
);

export const { logout } = userSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectRole = (state: RootState) => state.auth.role;
export const selectEmbedUrl = (state: RootState) => state.auth.embedUrl;
export const selectFirstname = (state: RootState) => state.auth.firstname;
export const selectLastname = (state: RootState) => state.auth.lastname;
export const selectPhonenumber = (state: RootState) => state.auth.phonenumber;
export const selectGender = (state: RootState) => state.auth.gender;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectUserId = (state: RootState) => state.auth.id;

export default userSlice.reducer;
