import { sign } from 'jsonwebtoken'
import { type User } from '../types'

export const createJWT = ({ id, role }: Pick<User, 'id' | 'role'>): string => {
  return sign({
    id, role
  }, String(process.env.JWT_SECRET), { expiresIn: '7d' })
}
