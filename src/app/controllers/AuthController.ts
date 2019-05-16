import { Response, Request, NextFunction } from 'express'
import User from '../models/User'
import { boomify, notFound, unauthorized } from 'boom'
import Token from '../../module/TokenModule'
import { SessionModule } from '../../module/SessionModule'
import crypto from 'crypto'
import mailer from '../../module/mailer'

class UserController {
  public async register (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user = await User.create(req.body)
      user.password = undefined
      return res.json(user)
    } catch (error) {
      return next(boomify(error))
    }
  }

  public async authenticate (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body

      if (!email || !password) throw unauthorized('invalid email or password', 'sample')

      const user = await User.findOne({ email }).select('+password')

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
        return next(error)
      }
      return res.status(500).json(error)
    }
  }

  public async forgotPassword (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { email } = req.body
    try {
      const user = await User.findOne({ email })
      if (!user) throw notFound('User not found')

      const token = crypto.randomBytes(20).toString('hex')

      const now = new Date()
      now.setHours(now.getHours() + 1)

      await User.findOneAndUpdate(user.id, {
        '$set': {
          emailValidateToken: token,
          emailValidateExpires: now
        }
      })

      mailer.sendMail({
        to: email,
        from: 'adriano@email.com.br',
        html: `<p>Você esqueceu sua senha? não tem problema, utilize esse token: ${token}</p>`
      }, (err): Response => {
        if (err) return res.status(400).send({ error: 'Cannot send forgot password email' })

        return res.sendStatus(200)
      })
    } catch (error) {
      return next(boomify(error, { message: 'Erro on fogot password, try again' }))
    }
  }

  public async resetPassword (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { email, token, password } = req.body
    try {
      const user = await User.findOne({ email })
        .select('+emailValidateToken emailValidateExpires')

      if (!user) throw notFound('User not found')

      if (token !== user.emailValidateToken) throw unauthorized('Token invalid')

      const now = new Date()

      if (now > user.emailValidateExpires) throw unauthorized('Token expired generate a new one')

      user.password = password
      user.emailValidateExpires = undefined
      user.emailValidateToken = undefined

      await user.save()

      res.sendStatus(200)
    } catch (error) {
      return next(boomify(error, { message: 'Cannot reset password, try again' }))
    }
  }

  public async activateAccount (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { email, token } = req.body
    try {
      const user = await User.findOne({ email })
        .select('+emailValidateToken emailValidateExpires')

      if (!user) throw notFound('User not found')

      if (token !== user.emailValidateToken) throw unauthorized('Token invalid')

      const now = new Date()

      if (now > user.emailValidateExpires) throw unauthorized('Token expired generate a new one')

      user.enable = true
      user.emailValidateExpires = undefined
      user.emailValidateToken = undefined

      await user.save()

      res.sendStatus(200)
    } catch (error) {
      return next(boomify(error, { message: 'Cannot active register, try again' }))
    }
  }
}

export default new UserController()
