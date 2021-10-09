import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TweetsRepository } from './tweets.repository';
import { Tweet } from './interfaces/tweet.interface';

@Injectable()
export class TweetsService {
  constructor(private readonly tweetsRepository: TweetsRepository) {}

  getAll() {
    return this.tweetsRepository.getAll();
  }

  getById(id: number) {
    return this.tweetsRepository.getById(id);
  }

  create(tweet: Tweet) {
    return this.tweetsRepository.create(tweet);
  }

  async delete(userId: number, tweetId: number) {
    const tweet = await this.getById(tweetId);
    if (tweet.authorId !== userId) {
      throw new UnauthorizedException();
    }
    return this.tweetsRepository.delete(tweetId);
  }
}
