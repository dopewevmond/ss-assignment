import { object, string } from 'yup'
import { Gender } from '../types'

export const adminLoginValidationSchema = object({
  body: object({
    email: string().required('An email is required to log in'),
    password: string().required('A password is required to log in')
  })
})

export const customerLoginValidationSchema = object({
  body: object({
    client_number: string().required('Client number is required to log in')
  })
})

// export const signupValidationSchema = object({
//   body: object({
//     email: string()
//       .email('Please use a valid email address')
//       .required('An email is required to sign up'),
//     password: string().required('A password is required to sign up'),
//     firstname: string().required('First name is required to sign up'),
//     lastname: string().required('Last name is required to sign up'),
//     phonenumber: number()
//       .typeError('Phone number needs to be a number')
//       .required('A phone number is required to sign up'),
//     gender: string()
//       .oneOf(Gender, "Your gender must be either 'MALE' or 'FEMALE'")
//       .required('Gender is required to sign up')
//   })
// })

export const updateProfileValidationSchema = object({
  body: object({
    client_name: string().required('Name field cannot be empty'),
    mobile: string()
      .required('Mobile number field cannot be empty'),
    email: string()
      .email('Please use a valid email address')
      .required('Email cannot be empty'),
    gender: string()
      .oneOf(Gender, "Your gender must be either 'MALE' or 'FEMALE'")
      .required('Gender field cannot be empty')
  })
})
