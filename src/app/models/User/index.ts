import { Repository } from '../../dao/Repository'
import { NextFunction } from 'express'
import { genSalt, hash, compare } from 'bcryptjs'
import { boomify } from 'boom'
import crypto from 'crypto'
import { UserInterface } from './UserInterface'
import mailer from '../../../module/mailer'

const UserSchema = {
  email: {
    type: String,
    required: true,
    uniqueBy: true,
    validate: {
      validator: function (v): boolean {
        return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g.test(v)
      },
      message: (props): string => `${props.value} is not a valid e-mail!`
    }
  },
  enable: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    select: false,
    minlength: [8, 'Your password must be at least 8 characters'],
    required: true
  },
  emailValidateToken: {
    type: String,
    select: false
  },
  emailValidateExpires: {
    type: Date,
    select: false
  },
  accessNumber: {
    type: Number,
    default: 1
  },
  async preSave (next: NextFunction): Promise<void> {
    try {
      if (!this.password) return next()

      const salt = await genSalt(10)
      this.password = await hash(this.password, salt)

      const token = crypto.randomBytes(20).toString('hex')

      const now = new Date()
      now.setHours(now.getHours() + 1)

      this.emailValidateToken = token
      this.emailValidateExpires = now

      mailer.sendMail({
        to: this.email,
        from: 'adriano@email.com.br',
        html: `<p>Seu cadastro esta quase completo, por favor, confirme seu cadastro: ${token}</p>`
      })

      return next()
    } catch (error) {
      console.log(error)
      throw boomify(error)
    }
  }
}

const methods = {
  async checkPassword (candidatePassword: string): Promise<boolean> {
    return compare(candidatePassword, this.password)
  }
}

export default new Repository<UserInterface>('User', UserSchema, { timestamps: true }, methods).getModel()
