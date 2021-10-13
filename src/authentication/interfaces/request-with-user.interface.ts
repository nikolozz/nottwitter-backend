export { Request } from 'express';
import { User } from '../../users/interfaces/user.interface';
import { Role } from '../enums/role.enum';

export type RequestWithUser = Request & {
  user: User & { id: number; roles: Role[] };
};
