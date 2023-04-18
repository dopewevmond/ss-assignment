import type { Request, Response, NextFunction } from 'express'
import type HttpException from '../exceptions'

export const ErrorHandler = (
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = err.status ?? 500
  const message = err.message ?? 'An unknown error has occurred'
  res.status(status).json({ message, status })
}
