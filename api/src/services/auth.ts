import { sign } from 'jsonwebtoken'

export const createJWT = (payload: any): string => {
  return sign(payload, String(process.env.JWT_SECRET), { expiresIn: '7d' })
}
