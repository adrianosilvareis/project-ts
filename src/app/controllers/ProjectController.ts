import { Response, Request, NextFunction } from 'express'
import { AbstractController } from './AbstractController'

class UserController implements AbstractController {
  public async list (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    next('Method not implemented.')
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
