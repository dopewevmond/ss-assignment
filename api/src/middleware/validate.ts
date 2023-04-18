import type { AnySchema } from 'yup'
import type { Request, Response, NextFunction } from 'express'

export const validate =
  (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validate({
          body: req.body,
          query: req.query,
          params: req.params
        })
        next()
        return
      } catch (err) {
        return res.status(400).json({ type: err.name, message: err.message })
      }
    }
