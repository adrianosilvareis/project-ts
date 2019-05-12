import { Repository } from '../../dao/Repository'
import { SessionInterface } from './SessionInterface'
import { Schema } from 'mongoose'
import { NextFunction } from 'express'
import { unauthorized } from 'boom'

const SessionSchema = {
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  async preSave (next: NextFunction): Promise<void> {
    try {
      const count = await this.constructor.countDocuments({ user: this.user })
      if (count < this.user.accessNumber) next()

      next(unauthorized('number of sessions greater than allowed for this user!'))
    } catch (error) {
      next(error)
    }
  }
}

export default new Repository<SessionInterface>('Session', SessionSchema, { timestamps: true }).getModel()
