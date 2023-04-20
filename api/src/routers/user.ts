import { Router } from 'express'
import { verifyJwt, validate } from '../middleware'
import { updateProfileValidationSchema } from '../validation'
import { EditPersonalRecordsHandler } from '../controllers'

export const userRouter = Router()

userRouter.put('/:id', verifyJwt, validate(updateProfileValidationSchema), EditPersonalRecordsHandler)
