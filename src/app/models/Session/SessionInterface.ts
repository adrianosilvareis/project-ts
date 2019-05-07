import { DocumentInterface } from '../DocumentInterface'
import { UserInterface } from '../User/UserInterface'
export interface SessionInterface extends DocumentInterface {
  user: UserInterface;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
}
