import type { Request, Response } from 'express'

export const NotFoundHandler = (req: Request, res: Response): void => {
  res
    .status(404)
    .json({
      message: `The endpoint ${req.method} ${req.path} does not exist`,
      status: 404
    })
}
