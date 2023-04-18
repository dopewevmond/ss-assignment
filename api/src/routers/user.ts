import { Router } from 'express'
import { verifyCookie, validate } from '../middleware'
import { updateProfileValidationSchema } from '../validation'
import { EditPersonalRecordsHandler, GetUserByIdHandler } from '../controllers'

export const userRouter = Router()

userRouter.get('/:id', verifyCookie, GetUserByIdHandler)
userRouter.put('/:id', verifyCookie, validate(updateProfileValidationSchema), EditPersonalRecordsHandler)
