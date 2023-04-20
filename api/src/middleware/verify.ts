import { verify } from 'jsonwebtoken'
import type { NextFunction, Request, Response } from 'express'

export const verifyJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization
  if (authHeader == null) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  const token = authHeader.split(' ')[1]
  verify(token, String(process.env.JWT_SECRET), (err, user) => {
    if (err != null) {
      res.status(401).json({ message: err.message })
      return
    }
    const userPayload = user as any
    res.locals.user = userPayload
    next()
  })
}
