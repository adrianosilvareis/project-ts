import { Response, Request, NextFunction } from 'express'
import { AbstractController } from './AbstractController'
import { Query } from '../dao/Query'
import Project from '../models/Project'
import { boomify } from 'boom'

class PorjectController implements AbstractController {
  public async list (req: Request, res: Response): Promise<void | Response> {
    const query = new Query(Project, req.query)

    const resp = await query.exec()
    const count = await query.counter()

    res.set('X-Total-Count', count.toString())
    return res.json(resp)
  }
  public async create (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const project = await Project.create(req.body)
      return res.json(project)
    } catch (error) {
      return next(boomify(error))
    }
  }
  public async update (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    next('Method not implemented.')
  }
  public async remove (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    next('Method not implemented.')
  }
  public async delete (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    next('Method not implemented.')
  }
}

export default new PorjectController()
