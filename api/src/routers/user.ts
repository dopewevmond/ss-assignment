import { Router } from 'express'
import { verifyJwt, validate } from '../middleware'
import { updateProfileValidationSchema } from '../validation'
import { EditPersonalRecordsHandler, GetUserByIdHandler } from '../controllers'

export const userRouter = Router()

userRouter.get('/:id', verifyJwt, GetUserByIdHandler)
userRouter.put('/:id', verifyJwt, validate(updateProfileValidationSchema), EditPersonalRecordsHandler)
