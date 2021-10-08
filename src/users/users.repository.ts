import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PostgresErrorCode } from '../database/enums/postgres-error-codes.enum';
import { PrismaService } from '../database/prisma/prisma.service';
import { UpdateUser } from './interfaces/update-user.interface';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersRepository {
  constructor(private readonly userRepository: PrismaService) {}

  getByUsername(username: string) {
    return this.userRepository.user.findFirst({
      where: { username },
      rejectOnNotFound: true,
    });
  }

  getById(id: number) {
    return this.userRepository.user.findFirst({
      where: { id },
      rejectOnNotFound: true,
    });
  }

  async create(user: User) {
    try {
      await this.userRepository.user.create({ data: user });
    } catch (e) {
      if (e.code === PostgresErrorCode.UniqueViolation) {
        throw new InternalServerErrorException('Unique constraint violation');
      }
    }
  }

  updateAvatar(id: number, user: UpdateUser) {
    return this.userRepository.user.update({
      where: { id },
      data: { avatarId: user.avatar.id },
    });
  }
}
