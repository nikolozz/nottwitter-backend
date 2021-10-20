import { Injectable } from '@nestjs/common';
import { PrismaRepository } from 'src/database/prisma/prisma.repository';
import { Like } from './interfaces/like.interface';

@Injectable()
export class LikesRepository {
  constructor(private readonly likesRepository: PrismaRepository) {}

  getById(id: number) {
    return this.likesRepository.like.findFirst({
      where: { id },
      rejectOnNotFound: true,
    });
  }

  getByOwnerAndTweet({
    tweetId,
    ownerId,
  }: {
    tweetId: number;
    ownerId: number;
  }) {
    return this.likesRepository.like.findFirst({ where: { tweetId, ownerId } });
  }

  getTweetLikes(tweeetIds: number[]) {
    return this.likesRepository.like.findMany({
      where: { tweetId: { in: tweeetIds } },
    });
  }

  create({ tweetId, ownerId }: Pick<Like, 'tweetId' | 'ownerId'>) {
    return this.likesRepository.like.create({ data: { tweetId, ownerId } });
  }

  delete(id: number) {
    return this.likesRepository.like.delete({ where: { id } });
  }
}
