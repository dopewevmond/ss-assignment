import { Router } from 'express'
import { validate, verifyJwt } from '../middleware'
import { loginValidationSchema, signupValidationSchema } from '../validation'
import { GetEmbedUrlHandler, LoginHandler, LogoutHandler, SignUpHandler } from '../controllers'

export const authRouter = Router()

authRouter.get('/', verifyJwt)
authRouter.post('/login', validate(loginValidationSchema), LoginHandler)
authRouter.post('/signup', validate(signupValidationSchema), SignUpHandler)
authRouter.post('/embedurl', verifyJwt, GetEmbedUrlHandler)
authRouter.post('/logout', LogoutHandler)
