import { Router } from 'express'
import { validate, verifyCookie } from '../middleware'
import { loginValidationSchema, signupValidationSchema } from '../validation'
import { GetEmbedUrlHandler, LoginHandler, LogoutHandler, SignUpHandler } from '../controllers'

export const authRouter = Router()

authRouter.get('/', verifyCookie)
authRouter.post('/login', validate(loginValidationSchema), LoginHandler)
authRouter.post('/signup', validate(signupValidationSchema), SignUpHandler)
authRouter.post('/embedurl', verifyCookie, GetEmbedUrlHandler)
authRouter.post('/logout', LogoutHandler)
