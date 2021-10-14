import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { AddAvatar } from './interfaces/add-avatar.interface';
import { UpdateUser } from './interfaces/update-user.interface';
import { User } from './interfaces/user.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly filesService: FilesService,
  ) {}

  getByUsername(username: string) {
    try {
      return this.usersRepository.getByUsername(username);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({ error });
    }
  }

  getById(id: number) {
    try {
      return this.usersRepository.getById(id);
    } catch (error) {
      throw new UnauthorizedException({ error });
    }
  }

  getByIds(ids: number[]) {
    return this.usersRepository.getByIds(ids);
  }

  create(user: User) {
    return this.usersRepository.create(user);
  }

  async updateUser(id: number, body: UpdateUser) {
    return this.usersRepository.update(id, body);
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

  async getAvatar(userId: number) {
    const { avatarId } = await this.usersRepository.getById(userId);
    if (!avatarId) {
      return null;
    }
    return this.filesService.getFile(avatarId);
  }

  async deleteUser(userId: number) {
    return this.usersRepository.delete(userId);
  }
}
