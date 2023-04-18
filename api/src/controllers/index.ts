import type { Request, Response, NextFunction } from 'express'
import { CookieKey } from '../types'
import HttpException from '../exceptions'
import {
  getUserDetails,
  login,
  signup,
  updateUserRecord,
  createJWT,
  getEmbedUrl
} from '../services'

export const LoginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body
    const {
      id,
      role,
      firstname,
      email: userEmail
    } = await login(email, password)
    const token = createJWT({ id, role })
    res.cookie(CookieKey, token, { httpOnly: true })
    let response: any = { role, firstname, email: userEmail }
    if (role === 'admin') {
      response = { ...response, embedUrl: getEmbedUrl() }
    }
    res.json(response)
  } catch (err) {
    next(err)
  }
}

export const SignUpHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, firstname, lastname, phonenumber, gender } =
      req.body
    const {
      id,
      role,
      firstname: userFirstname,
      email: userEmail
    } = await signup(email, password, firstname, lastname, phonenumber, gender)
    const token = createJWT({ id, role })
    res.cookie(CookieKey, token, { httpOnly: true })
    res.json({ role, firstname: userFirstname, email: userEmail })
  } catch (err) {
    next(err)
  }
}

export const GetUserByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    if (res.locals.user.id !== id) {
      next(new HttpException(401, 'Unauthorized'))
      return
    }
    const data = await getUserDetails(id)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const EditPersonalRecordsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    if (res.locals.user.id !== id) {
      next(new HttpException(401, 'Unauthorized'))
      return
    }
    const { firstname, lastname, phonenumber, email, gender } = req.body
    const data = await updateUserRecord({
      id,
      phonenumber,
      firstname,
      lastname,
      email,
      gender
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
}
