import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PostgresErrorCode } from '../database/enums/postgres-error-codes.enum';
import { PrismaRepository } from '../database/prisma/prisma.repository';
import { UpdateUser } from './interfaces/update-user.interface';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersRepository {
  constructor(private readonly userRepository: PrismaRepository) {}

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

  getByIds(ids: number[]) {
    return this.userRepository.user.findMany({ where: { id: { in: ids } } });
  }

  async create(user: User) {
    try {
      await this.userRepository.user.create({ data: user });
    } catch (e) {
      if (e.code === PostgresErrorCode.UniqueViolation) {
        throw new InternalServerErrorException('Unique constraint violation');
      }
      throw e;
    }
  }

  async delete(id: number) {
    const deleteResponse = await this.userRepository.user.delete({
      where: { id },
    });
    if (deleteResponse) {
      return true;
    }
    return false;
  }

  update(id: number, user: UpdateUser) {
    return this.userRepository.user.update({
      where: { id },
      data: user,
    });
  }

  updateAvatar(id: number, user: UpdateUser) {
    return this.userRepository.user.update({
      where: { id },
      data: { avatarId: user.avatar.id },
    });
  }
}
