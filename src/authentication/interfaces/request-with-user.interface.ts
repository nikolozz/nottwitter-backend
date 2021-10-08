export { Request } from 'express';
import { User } from '../../users/interfaces/user.interface';

export type RequestWithUser = Request & { user: User & { id: number } };
