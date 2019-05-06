import { DocumentInterface } from '../DocumentInterface'
export interface UserInterface extends DocumentInterface {
  email: string;
  password?: string;
  accessNumber: number;
  enable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  checkPassword?: Function;
}
