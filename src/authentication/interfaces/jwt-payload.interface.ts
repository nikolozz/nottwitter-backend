import { Role } from '../enums/role.enum';

export type JwtPayload = {
  id: number;
  username: string;
  roles: Role[];
};
