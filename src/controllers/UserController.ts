import { Response, Request } from 'express'

class UserController {
  public async register (req: Request, res: Response): Promise<Response> {
    return res.json('TODO')
  }
  public async authenticate (req: Request, res: Response): Promise<Response> {
    return res.json('TODO')
  }
  public async forgotPassword (req: Request, res: Response): Promise<Response> {
    return res.json('TODO')
  }
}

export default new UserController()
