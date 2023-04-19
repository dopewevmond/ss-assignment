import { type Request, type Response } from 'express'
import * as express from 'express'
import * as dotenv from 'dotenv'
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'
import sharedAppEmitter from './emitter'
import { type AppEvents } from './types'
import { ErrorHandler, NotFoundHandler } from './middleware'
import { authRouter, userRouter } from './routers'

dotenv.config()

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.get('/', (_req: Request, res: Response) => {
  res.send('health check passed')
})

app.use('/auth', authRouter)
app.use('/users', userRouter)

app.use(ErrorHandler)
app.use(NotFoundHandler)

const port = process.env.PORT ?? 3000
const successEvent: AppEvents = 'connectDatabaseSuccesss'
const failureEvent: AppEvents = 'connectDatabaseFailure'

sharedAppEmitter.on(successEvent, () => {
  app.listen(port, () => {
    console.log('app running on port:', port)
  })
})

sharedAppEmitter.on(failureEvent, () => {
  process.exitCode = 1
})
