import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { LikesService } from './likes.service';
import { Like } from './interfaces/like.interface';

@Injectable({ scope: Scope.REQUEST })
export class LikesDataLoader {
  constructor(private readonly likesService: LikesService) {}

  readonly batchLikes: DataLoader<number, Like[]> = new DataLoader(
    async (tweetIds: number[]) => {
      const likes = await this.likesService.getTweetLikes(tweetIds);
      return tweetIds.map((id) => likes.filter((like) => like.tweetId === id));
    },
  );
}
