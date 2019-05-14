import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import routes from './routes'
import { loggerAccess } from '../module/log4'
import { config } from 'dotenv'

class App {
  public express: express.Application
  public constructor () {
    this.express = express()
    config()
    this.meddleware()
    this.express.use(loggerAccess)
    this.routes()
  }

  private meddleware (): void {
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(helmet())
  }

  private routes (): void {
    routes(this.express)
  }
}

export default new App().express
