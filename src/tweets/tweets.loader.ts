import { Injectable, Scope } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class TweetLoaders {
  constructor(private readonly usersService: UsersService) {}

  batchAuthors = new DataLoader(async (authorIds: number[]) => {
    const authors = await this.usersService.getByIds(authorIds);
    const authorsMap = new Map(authors.map((user) => [user.id, user]));
    return authorIds.map((id) => authorsMap.get(id));
  });
}
