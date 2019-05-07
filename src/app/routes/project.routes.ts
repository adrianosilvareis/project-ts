import express, { Router } from 'express'
import ProjectController from '../controllers/ProjectController'
import authMiddleware from '../middleware/auth'
import handlerError from '../middleware/handlerError'

const routes = Router()

// routes.use(authMiddleware)

routes.post('/list', ProjectController.list)

routes.use(handlerError)

export default (app: express.Application): void => { app.use('/project', routes) }
