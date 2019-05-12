import { DocumentInterface } from '../DocumentInterface'

export interface ProjectInterface extends DocumentInterface {
  title: string;
  describe: string;
  term: Date;
  novoMetodo (): void;
}
