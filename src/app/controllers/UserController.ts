import { Response, Request } from 'express'
import User from '../models/User'
import { boomify, notFound, unauthorized } from 'boom'
import Token from '../../module/token'
import { SessionModule } from '../../module/Session'

class UserController {
  public async register (req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.create(req.body)
      user.password = undefined
      return res.json(user)
    } catch (error) {
      return res.status(500).json(boomify(error))
    }
  }

  public async authenticate (req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      if (!email || !password) throw unauthorized('invalid email or password', 'sample')

      const user = await User.findOne({ email })

      if (!user) throw notFound(`User ${email} Not Found`)

      if (!user.enable) throw unauthorized('user not enable', 'sample')

      const isMatch = await user.checkPassword(password)

      if (!isMatch) throw unauthorized('invalid password', 'sample')

      user.password = undefined

      const token = await Token.sign({ _id: user.id })

      const session = await new SessionModule().createSession(user, token)

      return res.json(session)
    } catch (error) {
      if (error.isBoom) {
        const { output } = error
        return res.status(output.statusCode).json(output.payload)
      }
      return res.status(500).json(error)
    }
  }

  public async forgotPassword (req: Request, res: Response): Promise<Response> {
    return res.json('TODO')
  }
}

export default new UserController()
