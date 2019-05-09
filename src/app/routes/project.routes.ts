import express, { Router } from 'express'
import ProjectController from '../controllers/ProjectController'
import authMiddleware from '../middleware/auth'
import errorHandlerMiddleware from '../middleware/errorHandler'

const routes = Router()

routes.use(authMiddleware)

routes.post('/list', ProjectController.list)

routes.use(errorHandlerMiddleware)

export default (app: express.Application): void => { app.use('/project', routes) }
