import { object, string } from "yup";

export const adminLoginSchema = object({
  email: string().required("Email is required"),
  password: string().required("Password is required"),
});

export const customerLoginSchema = object({
  client_number: string().required("Client number is required")
});

export const updateProfileSchema = object({
  client_name: string().required("Name field cannot be empty"),
  mobile: string()
    .required("Mobile number field cannot be empty"),
  email: string()
    .email("Please use a valid email address")
    .required("Email cannot be empty"),
  gender: string()
    .oneOf(["MALE", "FEMALE"], "Your gender must be either 'MALE' or 'FEMALE'")
    .required("Gender field cannot be empty"),
});
