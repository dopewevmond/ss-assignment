import { Router } from 'express'
import { validate, verifyJwt } from '../middleware'
import { adminLoginValidationSchema, customerLoginValidationSchema } from '../validation'
import { GetEmbedUrlHandler, AdminLoginHandler, CustomerLoginHandler } from '../controllers'

export const authRouter = Router()

authRouter.post('/admin/login', validate(adminLoginValidationSchema), AdminLoginHandler)
authRouter.post('/login', validate(customerLoginValidationSchema), CustomerLoginHandler)
authRouter.post('/embedurl', verifyJwt, GetEmbedUrlHandler)
