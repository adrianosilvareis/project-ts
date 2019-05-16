import express, { Router } from 'express'
import AuthController from '../controllers/AuthController'
import errorHandler from '../middleware/errorHandler'

const routes = Router()

routes.post('/register', AuthController.register)
routes.post('/activate_account', AuthController.activateAccount)
routes.post('/authenticate', AuthController.authenticate)
routes.post('/forgot_password', AuthController.forgotPassword)
routes.post('/reset_password', AuthController.resetPassword)

routes.use(errorHandler)

export default (app: express.Application): void => { app.use('/auth', routes) }
