import express, { Router } from 'express'
import ProjectController from '../controllers/ProjectController'
import authMiddleware from '../middleware/auth'

const routes = Router()

routes.use(authMiddleware)

routes.post('/list', ProjectController.list)

export default (app: express.Application): void => { app.use('/project', routes) }
