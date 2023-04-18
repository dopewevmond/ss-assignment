import { Router } from 'express'
import { validate } from '../middleware'
import { loginValidationSchema, signupValidationSchema } from '../validation'
import { LoginHandler, SignUpHandler } from '../controllers'

export const authRouter = Router()

authRouter.post('/login', validate(loginValidationSchema), LoginHandler)
authRouter.post('/signup', validate(signupValidationSchema), SignUpHandler)
