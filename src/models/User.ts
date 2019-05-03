import { DocumentInterface } from './DocumentInterface'
import { Repository } from './Repository'
import { NextFunction } from 'express'

const UserSchema = {
  email: { type: String, required: true },
  password: { type: String },
  accessNumber: { type: Number, default: 1 },
  preSave (next: NextFunction): void {
    next()
  }
}

interface UserInterface extends DocumentInterface {
  email: string;
  password?: string;
  accessNumber: number;
}

export default new Repository<UserInterface>(UserSchema, { timestamps: true })
