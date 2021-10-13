import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { Role } from './enums/role.enum';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Credentials } from './interfaces/login.interface';
import { RegisterUser } from './interfaces/register.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getAuthenticatedUser(credentials: Credentials) {
    const { username, password } = credentials;
    const user = await this.usersService.getByUsername(username);
    await this.isPasswordMatch(password, user.password);
    return user;
  }

  async login(id: number, username: string, roles: Role[]) {
    const payload: JwtPayload = { id, username, roles };
    return this.jwtService.sign(payload);
  }

  async register(user: RegisterUser) {
    const hashedPassword = await argon2.hash(user.password);
    return this.usersService.create({ ...user, password: hashedPassword });
  }

  private async isPasswordMatch(password, encryptedPassword) {
    const isMatch = await argon2.verify(encryptedPassword, password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
