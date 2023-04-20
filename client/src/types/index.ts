export type LoginCredentials = {
  email: string;
  password: string;
}
export type SignupCredentials = LoginCredentials & {
  firstname: string
  lastname: string
  phonenumber: string
  gender: string
}

export type EditProfile = Omit<SignupCredentials, 'password'>

export type UserSlice = {
  id: string | null
  role: 'admin' | 'customer' | null
  firstname: string | null
  email: string | null
  isLoggedIn: boolean
  embedUrl: string | null
  error: string | null
  gender: string | null
  lastname: string | null
  phonenumber: string | null
}

export const LocalStorageKeys = {
  role: 'role',
  firstname: 'firstname',
  email: 'email',
  embedUrl: 'embedUrl',
  id: 'id',
  token: 'token'
}