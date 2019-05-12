import { Repository } from '../../dao/Repository'
import { NextFunction } from 'express'
import { genSalt, hash, compare } from 'bcryptjs'
import { boomify } from 'boom'
import { UserInterface } from './UserInterface'

const UserSchema = {
  email: {
    type: String,
    required: true,
    // uniqueBy: true, //add after tests end
    validate: {
      validator: function (v): boolean {
        return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g.test(v)
      },
      message: (props): string => `${props.value} is not a valid e-mail!`
    }
  },
  enable: {
    type: Boolean,
    default: true
  },
  password: {
    type: String,
    select: false,
    minlength: [8, 'Your password must be at least 8 characters'],
    required: true
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  accessNumber: {
    type: Number,
    default: 1
  },
  async preSave (next: NextFunction): Promise<void> {
    try {
      const salt = await genSalt(10)
      this.password = await hash(this.password, salt)
      next()
    } catch (error) {
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
