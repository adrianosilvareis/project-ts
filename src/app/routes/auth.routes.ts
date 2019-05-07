import express, { Router } from 'express'
import AuthController from '../controllers/AuthController'

const routes = Router()

routes.post('/register', AuthController.register)
routes.post('/authenticate', AuthController.authenticate)
routes.post('/forgot_password', AuthController.forgotPassword)
routes.post('/reset_password', AuthController.resetPassword)

export default (app: express.Application): void => { app.use('/auth', routes) }
