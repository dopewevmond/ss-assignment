import { type QueryConfig } from 'pg'
import { v4 as uuidv4 } from 'uuid'
import { hash, compare } from 'bcrypt'
import datasource from '../datasource'
import HttpException from '../exceptions'
import { type Role, type User } from '../types'

export const login = async (
  email: string,
  password: string
): Promise<Pick<User, 'id' | 'role' | 'firstname' | 'email'>> => {
  const query: QueryConfig = {
    text: 'SELECT id, role, firstname, email, password_hash FROM test.users WHERE email = $1 LIMIT 1',
    // text: 'SELECT id, role, firstname, email, password_hash FROM users WHERE email = $1 LIMIT 1',
    values: [email]
  }
  const { rows } = await datasource.query<User>(query)
  if (rows.length !== 1) {
    throw new HttpException(
      401,
      'Wrong login credentials'
    )
  }

  const correctCredentials = await compare(password, rows[0].password_hash)
  if (!correctCredentials) {
    throw new HttpException(
      401,
      'Wrong login credentials'
    )
  }

  const { password_hash: _unused, ...rest } = rows[0]

  return rest
}

//
export const signup = async (
  email: string, password: string, firstname: string, lastname: string, phonenumber: string, gender: string
): Promise<Pick<User, 'id' | 'firstname' | 'role' | 'email'>> => {
  const findExistingEmailQuery: QueryConfig = {
    text: 'SELECT * FROM test.users WHERE email = $1 OR phonenumber = $2',
    // text: 'SELECT * FROM users WHERE email = $1 OR phonenumber = $2',
    values: [email, phonenumber]
  }
  const { rows: existingEmails } = await datasource.query<User>(findExistingEmailQuery)
  if (existingEmails.length !== 0) {
    throw new HttpException(400, 'A user already exists with this email or phone. Please choose another')
  }
  const role: Role = 'customer'
  const id = uuidv4()
  const createNewUserQuery: QueryConfig = {
    text: 'INSERT INTO test.users (id, firstname, lastname, phonenumber, email, gender, password_hash, role, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)',
    // text: 'INSERT INTO users (id, firstname, lastname, phonenumber, email, gender, password_hash, role, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)',
    values: [id, firstname, lastname, phonenumber, email, gender, await hash(password, 10), role]
  }
  await datasource.query<User>(createNewUserQuery)
  const query: QueryConfig = {
    text: 'SELECT id, firstname, role, email FROM test.users WHERE id = $1',
    // text: 'SELECT id, firstname, role, email FROM users WHERE id = $1',
    values: [id]
  }
  const { rows } = await datasource.query<User>(query)
  if (rows.length !== 1) {
    throw new HttpException(500, 'An error occurred while loading your details after signup')
  }
  return rows[0]
}

//
export const getUserDetails = async (
  id: string
): Promise<
Pick<User, 'firstname' | 'lastname' | 'phonenumber' | 'email' | 'gender'>
> => {
  const query: QueryConfig = {
    text: 'SELECT firstname, lastname, phonenumber, email, gender FROM test.users WHERE id = $1 LIMIT 1',
    // text: 'SELECT firstname, lastname, phonenumber, email, gender FROM users WHERE id = $1 LIMIT 1',
    values: [id]
  }
  const { rows } = await datasource.query<User>(query)
  if (rows.length !== 1) {
    throw new HttpException(404, 'A user with the provided id was not found')
  }
  return rows[0]
}

//
export const updateUserRecord = async (
  { id, firstname, lastname, phonenumber, email, gender }: Pick<User, 'id' | 'firstname' | 'lastname' | 'phonenumber' | 'email' | 'gender'>
): Promise<Pick<User, 'firstname' | 'lastname' | 'phonenumber' | 'email' | 'gender'>> => {
  const updateQuery: QueryConfig = {
    text: 'UPDATE test.users SET firstname = $1, lastname = $2, phonenumber = $3, email = $4, gender = $5 WHERE id = $6',
    // text: 'UPDATE users SET firstname = $1, lastname = $2, phonenumber = $3, email = $4, gender = $5 WHERE id = $6',
    values: [firstname, lastname, phonenumber, email, gender, id]
  }
  await datasource.query<User>(
    updateQuery
  )
  const getUpdatedDetailsQuery: QueryConfig = {
    text: 'SELECT firstname, lastname, phonenumber, email, gender FROM test.users WHERE id = $1 LIMIT 1',
    // text: 'SELECT firstname, lastname, phonenumber, email, gender FROM users WHERE id = $1 LIMIT 1',
    values: [id]
  }
  const { rows } =
    await datasource.query<User>(getUpdatedDetailsQuery)
  if (rows.length !== 1) {
    throw new HttpException(
      400,
      'An error occurred while fetching your updated personal records'
    )
  }
  return rows[0]
}
