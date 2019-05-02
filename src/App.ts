import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { connect, connection } from 'mongoose'
import routes from './routes'

class App {
  public express: express.Application
  public constructor () {
    this.express = express()
    this.meddleware()
    this.databases()
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

  private databases (): void {
    connect('mongodb://localhost:27017/tsnode', { useNewUrlParser: true })
    connection.on('open', (): void => console.log('database on'))
    connection.on('error', (err): void => console.warn('database error', err))
  }
}

export default new App().express
