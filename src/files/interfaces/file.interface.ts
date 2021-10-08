import { User } from '../../users/interfaces/user.interface';

export interface File {
  readonly id?: number;
  readonly key: string;
  readonly url: string;
  readonly user?: User;
}
