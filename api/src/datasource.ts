import { Client } from 'pg'
import sharedAppEmitter from './emitter'
import { type AppEvents } from './types'
import * as dotenv from 'dotenv'
dotenv.config()

console.log('environment: ' + process.env.NODE_ENV)

const datasource = new Client({
  connectionString:
    process.env.NODE_ENV === 'development'
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL,
  ssl: !(process.env.NODE_ENV === 'development')
})

let event: AppEvents

datasource
  .connect()
  .then(() => {
    console.log('connected to redshift')
    event = 'connectDatabaseSuccesss'
    sharedAppEmitter.emit(event)
  })
  .catch((err) => {
    console.error('connection error', err.stack)
    event = 'connectDatabaseFailure'
    sharedAppEmitter.emit(event)
  })

export default datasource
