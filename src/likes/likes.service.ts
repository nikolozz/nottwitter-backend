import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Like } from './interfaces/like.interface';
import { LikesRepository } from './likes.repository';

type LikeByOwner = Pick<Like, 'ownerId' | 'tweetId'>;

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  getTweetLikes(likeIds: number[]) {
    return this.likesRepository.getTweetLikes(likeIds);
  }

  getLikes({ tweetId, ownerId }: LikeByOwner) {
    return this.likesRepository.getByOwnerAndTweet({ tweetId, ownerId });
  }

  async addLike({ tweetId, ownerId }: LikeByOwner) {
    const isLiked = await this.getLikes({ tweetId, ownerId });
    if (isLiked) {
      throw new BadRequestException();
    }
    return this.likesRepository.create({ tweetId, ownerId });
  }

  async removeLike(likeId: number, ownerId: number) {
    const like = await this.likesRepository.getById(likeId);
    if (like.ownerId !== ownerId) {
      throw new UnauthorizedException();
    }
    return this.likesRepository.delete(likeId);
  }
}
