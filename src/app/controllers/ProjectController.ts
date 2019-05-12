import { Response, Request, NextFunction } from 'express'
import { AbstractController } from './AbstractController'
import Project from '../models/Project'

class UserController implements AbstractController {
  public async list (req: Request, res: Response): Promise<void | Response> {
    const project = new Project()
    project.novoMetodo()

    // Project.find({})

    // title=json-server&author=typicode

    // _page
    // _limit
    // _sort
    // _order

    // first
    // prev
    // next
    // last

    // X-Total-Count
    return res.json(['adriano', 'juliana', 'maryana', 'celma', 'lucas'])
  }
  public async create (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    next('Method not implemented.')
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

export default new UserController()
