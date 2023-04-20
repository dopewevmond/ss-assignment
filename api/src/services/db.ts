import { type QueryConfig } from 'pg'
import { compare } from 'bcrypt'
import datasource from '../datasource'
import HttpException from '../exceptions'
import { type EditablePatientRecord, type PatientRecord, type User } from '../types'

export const loginAdmin = async (
  email: string,
  password: string
): Promise<Pick<User, 'id' | 'role' | 'firstname' | 'email'>> => {
  const query: QueryConfig = {
    text: 'SELECT id, role, firstname, email, password_hash FROM test.users WHERE email = $1 LIMIT 1',
    values: [email]
  }
  const { rows } = await datasource.query<User>(query)
  if (rows.length !== 1 || rows[0].role !== 'admin') {
    throw new HttpException(401, 'Wrong login credentials')
  }

  const correctCredentials = await compare(password, rows[0].password_hash)
  if (!correctCredentials) {
    throw new HttpException(401, 'Wrong login credentials')
  }

  const { password_hash: _unused, ...rest } = rows[0]
  return rest
}

export const loginCustomer = async (clientNumber: string): Promise<EditablePatientRecord> => {
  const query: QueryConfig = {
    text: 'SELECT client_number, mobile, email, gender FROM test.patient_record WHERE client_number = $1 LIMIT 1',
    values: [clientNumber]
  }
  const { rows } = await datasource.query<EditablePatientRecord>(query)
  if (rows.length !== 1) {
    throw new HttpException(401, 'Wrong login credentials')
  }
  return rows[0]
}

// export const signup = async (
//   email: string,
//   password: string,
//   firstname: string,
//   lastname: string,
//   phonenumber: string,
//   gender: string
// ): Promise<Pick<User, 'id' | 'firstname' | 'role' | 'email'>> => {
//   const findExistingEmailQuery: QueryConfig = {
//     text: 'SELECT * FROM test.users WHERE email = $1 OR phonenumber = $2',
//     values: [email, phonenumber]
//   }
//   const { rows: existingEmails } = await datasource.query<User>(
//     findExistingEmailQuery
//   )
//   if (existingEmails.length !== 0) {
//     throw new HttpException(
//       400,
//       'A user already exists with this email or phone. Please choose another'
//     )
//   }
//   const role: Role = 'customer'
//   const id = uuidv4()
//   const createNewUserQuery: QueryConfig = {
//     text: 'INSERT INTO test.users (id, firstname, lastname, phonenumber, email, gender, password_hash, role, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)',
//     values: [
//       id,
//       firstname,
//       lastname,
//       phonenumber,
//       email,
//       gender,
//       await hash(password, 10),
//       role
//     ]
//   }
//   await datasource.query<User>(createNewUserQuery)
//   const query: QueryConfig = {
//     text: 'SELECT id, firstname, role, email FROM test.users WHERE id = $1',
//     values: [id]
//   }
//   const { rows } = await datasource.query<User>(query)
//   if (rows.length !== 1) {
//     throw new HttpException(
//       500,
//       'An error occurred while loading your details after signup'
//     )
//   }
//   return rows[0]
// }

// export const getUserDetails = async (
//   clientNumber: string
// ): Promise<
// Pick<PatientRecord, 'client_name' | 'mobile' | 'email' | 'gender'>
// > => {
//   const query: QueryConfig = {
//     text: 'SELECT client_name, mobile, email, gender FROM test.patient_record WHERE client_number = $1 LIMIT 1',
//     values: [clientNumber]
//   }
//   const { rows } = await datasource.query<
//   Pick<PatientRecord, 'client_name' | 'mobile' | 'email' | 'gender'>
//   >(query)
//   if (rows.length !== 1) {
//     throw new HttpException(404, 'A user with the provided id was not found')
//   }
//   return rows[0]
// }

//
export const updateUserRecord = async ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  client_number,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  client_name,
  mobile,
  email,
  gender
}: Pick<
PatientRecord,
'client_number' | 'client_name' | 'mobile' | 'email' | 'gender'
>): Promise<
Pick<
PatientRecord,
'client_number' | 'client_name' | 'mobile' | 'email' | 'gender'
>
> => {
  const updateQuery: QueryConfig = {
    text: 'UPDATE test.patient_record SET client_name = $1, mobile = $2, email = $3, gender = $4 WHERE client_number = $5',
    values: [client_name, mobile, email, gender, client_number]
  }
  await datasource.query(updateQuery)
  const getUpdatedDetailsQuery: QueryConfig = {
    text: 'SELECT client_number, client_name, mobile, email, gender FROM test.patient_record WHERE client_number = $1 LIMIT 1',
    values: [client_number]
  }
  const { rows } = await datasource.query<
  Pick<
  PatientRecord,
  'client_number' | 'client_name' | 'mobile' | 'email' | 'gender'
  >
  >(getUpdatedDetailsQuery)
  if (rows.length !== 1) {
    throw new HttpException(
      400,
      'An error occurred while fetching your updated personal records'
    )
  }
  return rows[0]
}
