import { verify } from 'jsonwebtoken'
import type { NextFunction, Request, Response } from 'express'
import { CookieKey } from '../types'

export const verifyCookie = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies[CookieKey]
  if (token == null) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  verify(token as string, String(process.env.JWT_SECRET), (err, user) => {
    if (err != null) {
      res.status(401).json({ message: err.message })
      return
    }
    const userPayload = user as any
    res.locals.user = userPayload
    next()
  })
}
