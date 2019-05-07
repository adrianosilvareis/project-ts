import { Response, Request } from 'express'
import { AbstractController } from './AbstractController'

class UserController implements AbstractController {
  public list (req: Request, res: Response): Promise<Response> {
    res.status(200).json('Method not implemented.')
  }

  public create (req: Request, res: Response): Promise<Response> {
    res.status(200).json('Method not implemented.')
  }

  public update (req: Request, res: Response): Promise<Response> {
    res.status(200).json('Method not implemented.')
  }

  public remove (req: Request, res: Response): Promise<Response> {
    res.status(200).json('Method not implemented.')
  }

  public delete (req: Request, res: Response): Promise<Response> {
    res.status(200).json('Method not implemented.')
  }
}

export default new UserController()
