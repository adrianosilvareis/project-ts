import express, { Router } from 'express'
import UserController from '../controllers/UserController'

const routes = Router()

routes.post('/register', UserController.register)
routes.post('/authenticate', UserController.authenticate)
routes.post('/forgot_password', UserController.forgotPassword)

export default (app: express.Application): void => {
  app.use('/auth', routes)
}
