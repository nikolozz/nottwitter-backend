import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../database/prisma/prisma.repository';
import { CreateTweet } from './interfaces/tweet.interface';

@Injectable()
export class TweetsRepository {
  constructor(private readonly tweetsRepository: PrismaRepository) {}

  getAll() {
    return this.tweetsRepository.tweet.findMany();
  }

  getById(id: number) {
    return this.tweetsRepository.tweet.findFirst({
      where: { id },
      rejectOnNotFound: true,
    });
  }

  create(tweet: CreateTweet & { author: any }) {
    return this.tweetsRepository.tweet.create({ data: tweet });
  }

  delete(id: number) {
    return this.tweetsRepository.tweet.delete({ where: { id } });
  }
}
