import { number, object, string } from 'yup'
import { Gender } from '../types'

export const loginValidationSchema = object({
  body: object({
    email: string().required('An email is required to sign in'),
    password: string().required('A password is required to sign in')
  })
})

export const signupValidationSchema = object({
  body: object({
    email: string()
      .email('Please use a valid email address')
      .required('An email is required to sign up'),
    password: string().required('A password is required to sign up'),
    firstname: string().required('First name is required to sign up'),
    lastname: string().required('Last name is required to sign up'),
    phonenumber: number()
      .typeError('Phone number needs to be a number')
      .required('A phone number is required to sign up'),
    gender: string()
      .oneOf(Gender, "Your gender must be either 'MALE' or 'FEMALE'")
      .required('Gender is required to sign up')
  })
})

export const updateProfileValidationSchema = object({
  body: object({
    firstname: string().required('First name cannot be empty'),
    lastname: string().required('Last name cannot be empty'),
    phonenumber: string()
      .matches(/^[0-9]+$/, 'Mobile number must contain only numbers')
      .required('Mobile number field cannot be empty'),
    email: string()
      .email('Please use a valid email address')
      .required('Email cannot be empty'),
    gender: string()
      .oneOf(Gender, "Your gender must be either 'MALE' or 'FEMALE'")
      .required('Gender field cannot be empty')
  })
})
