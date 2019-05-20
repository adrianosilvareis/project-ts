import express, { Router } from 'express'
import ProjectController from '../controllers/ProjectController'
import authMiddleware from '../middleware/auth'
import errorHandlerMiddleware from '../middleware/errorHandler'
import errorNotImplemented from '../middleware/errorNotImplemented'
import { cache } from '../middleware/cache'
import preserverContext from '../middleware/preserverContext'

const routes = Router()

routes.use(authMiddleware)

routes.use(cache(120))

routes.get('/', preserverContext(ProjectController, ProjectController.list))
routes.post('/', preserverContext(ProjectController, ProjectController.create))

routes.get('/:_id', preserverContext(ProjectController, ProjectController.get))
routes.put('/:_id', preserverContext(ProjectController, ProjectController.update))
routes.patch('/:_id', preserverContext(ProjectController, ProjectController.cancel))
routes.delete('/:_id', preserverContext(ProjectController, ProjectController.remove))

routes.use(errorNotImplemented)

routes.use(errorHandlerMiddleware)

export default (app: express.Application): void => { app.use('/project', routes) }
