import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { AddAvatar } from './interfaces/add-avatar.interface';
import { User } from './interfaces/user.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly filesService: FilesService,
  ) {}

  getByUsername(username: string) {
    return this.usersRepository.getByUsername(username);
  }

  getById(id: number) {
    return this.usersRepository.getById(id);
  }

  create(user: User) {
    return this.usersRepository.create(user);
  }

  async addAvatar(userId: number, avatar: AddAvatar) {
    const user = await this.getById(userId);
    if (userId !== user.id) {
      throw new UnauthorizedException();
    }
    const file = await this.filesService.create(avatar);
    await await this.usersRepository.updateAvatar(userId, {
      ...user,
      avatar: file,
    });
    return file;
  }
}
