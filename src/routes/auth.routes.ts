import express, { Router } from 'express'

const routes = Router()

export default (app: express.Application): void => {
  app.use('/auth', routes)
}
