import { DocumentInterface } from './DocumentInterface'
import { Repository } from './Repository'
import { NextFunction } from 'express'
import { genSalt, hash, compare } from 'bcryptjs'
import { boomify } from 'boom'
import User from './User'

const SessionSchema = {
  user: { type: User, required: true },
  token: { type: String, required: true },
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

interface SessionInterface extends DocumentInterface {
  user: UserInterface;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const methods = {
  async checkPassword (candidatePassword: string): Promise<boolean> {
    return compare(candidatePassword, this.password)
  }
}

export default new Repository<UserInterface>('User', SessionSchema, { timestamps: true }, methods).getModel()
