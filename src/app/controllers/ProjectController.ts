import { Response, Request, NextFunction } from 'express'
import { AbstractController } from './AbstractController'
import { boomify } from 'boom'

class UserController implements AbstractController {
  public async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    return next(boomify(null, { statusCode: 500, message: 'Method not implemented.' }))
  }

  public async create (req: Request, res: Response): Promise<Response> {
    return res.status(200).json('Method not implemented.')
  }

  public async update (req: Request, res: Response): Promise<Response> {
    return res.status(200).json('Method not implemented.')
  }

  public async remove (req: Request, res: Response): Promise<Response> {
    return res.status(200).json('Method not implemented.')
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    return res.status(200).json('Method not implemented.')
  }
}

export default new UserController()
