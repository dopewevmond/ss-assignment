export type AppEvents = 'connectDatabaseSuccesss' | 'connectDatabaseFailure'

export const CookieKey = '__user_id'

export type Role = 'customer' | 'admin'

export const Gender = ['MALE', 'FEMALE']

export interface PatientRecord {
  id: number
  registration_date: Date
  client_name: string
  mobile: string
  email: string
  client_number: string
  gender: 'MALE' | 'FEMALE'
  birth_date: Date
  age: number
  most_recent_hospital_visit: Date
  payment_method: string
}

export interface User {
  id: string
  firstname: string
  lastname: string
  phonenumber: string
  email: string
  gender: string
  password_hash: string
  role: 'admin' | 'customer'
  timestamp: string
}

export interface EditablePatientRecord
  extends Pick<PatientRecord, 'client_name' | 'mobile' | 'email' | 'gender'> {}

export interface TokenPayload
  extends Pick<PatientRecord, 'client_number' | 'client_name'> {}
