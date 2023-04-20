import type { Request, Response, NextFunction } from 'express'
import HttpException from '../exceptions'
import {
  loginAdmin,
  loginCustomer,
  updateUserRecord,
  createJWT,
  getEmbedUrl
} from '../services'

export const AdminLoginHandler = async (
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
    } = await loginAdmin(email, password)
    const token = createJWT({ id, role })
    res.json({
      token,
      id,
      role,
      firstname,
      email: userEmail,
      embedUrl: getEmbedUrl()
    })
  } catch (err) {
    next(err)
  }
}

export const CustomerLoginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { client_number } = req.body
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { client_name, mobile, email, gender } = await loginCustomer(
      client_number
    )
    const token = createJWT({ id: client_number, role: 'customer' })
    res.json({
      client_number,
      mobile,
      email,
      gender,
      client_name,
      token
    })
  } catch (err) {
    next(err)
  }
}

// export const SignUpHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { email, password, firstname, lastname, phonenumber, gender } =
//       req.body
//     const {
//       id,
//       role,
//       firstname: userFirstname,
//       email: userEmail
//     } = await signup(email, password, firstname, lastname, phonenumber, gender)
//     const token = createJWT({ id, role })
//     res.json({ token, id, role, firstname: userFirstname, email: userEmail })
//   } catch (err) {
//     next(err)
//   }
// }

// export const GetUserByIdHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { id } = req.params
//     if (res.locals.user.id !== id) {
//       next(new HttpException(401, 'Unauthorized'))
//       return
//     }
//     const data = await getUserDetails(id)
//     res.json(data)
//   } catch (err) {
//     next(err)
//   }
// }

export const EditPersonalRecordsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { client_number } = req.params
    if (res.locals.user.id !== client_number) {
      next(new HttpException(401, 'Unauthorized'))
      return
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { client_name, mobile, email, gender } = req.body
    const data = await updateUserRecord({
      client_number,
      mobile,
      client_name,
      email,
      gender
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const GetEmbedUrlHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (res.locals.user.role !== 'admin') {
      next(new HttpException(401, 'Unauthorized'))
      return
    }
    res.json({ embedUrl: getEmbedUrl() })
  } catch (err) {
    next(err)
  }
}
