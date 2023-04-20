import { object, string, number } from "yup";

export const loginSchema = object({
  email: string().required("Email is required"),
  password: string().required("Password is required"),
});

export const signupSchema = object({
  email: string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: string()
    .min(8, "Password has to be at least 8 characters long")
    .required("Password is required"),
  firstname: string().required("First name is required"),
  lastname: string().required("Last name is required"),
  phonenumber: number()
    .typeError("Phone number needs to be a number")
    .required("A phone number is required to sign up"),
  gender: string()
    .oneOf(["MALE", "FEMALE"], "Your gender must be either 'MALE' or 'FEMALE'")
    .required("Gender is required to sign up"),
});

export const updateProfileSchema = object({
  firstname: string().required("First name cannot be empty"),
  lastname: string().required("Last name cannot be empty"),
  phonenumber: string()
    .matches(/^[0-9]+$/, "Mobile number must contain only numbers")
    .required("Mobile number field cannot be empty"),
  email: string()
    .email("Please use a valid email address")
    .required("Email cannot be empty"),
  gender: string()
    .oneOf(["MALE", "FEMALE"], "Your gender must be either 'MALE' or 'FEMALE'")
    .required("Gender field cannot be empty"),
});
