import express, { Router } from 'express'
import ProjectController from '../controllers/ProjectController'
import authMiddleware from '../middleware/auth'
import errorHandlerMiddleware from '../middleware/errorHandler'
import { cache } from '../middleware/cache'

const routes = Router()

routes.use(authMiddleware)

routes.use(cache(120))

routes.get('/list', ProjectController.list)

routes.use(errorHandlerMiddleware)

export default (app: express.Application): void => { app.use('/project', routes) }
