import { Document } from 'mongoose'
export interface DocumentInterface extends Document {
  _id: string;
}
