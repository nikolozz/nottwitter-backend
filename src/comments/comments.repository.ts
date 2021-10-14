import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../database/prisma/prisma.repository';
import { Comment } from './interfaces/comment.interface';

@Injectable()
export class CommentsRepository {
  constructor(private readonly commentsRepository: PrismaRepository) {}

  getById(id: number) {
    return this.commentsRepository.comment.findFirst({
      where: { id },
      rejectOnNotFound: true,
    });
  }

  getByTweetId(tweetId: number) {
    return this.commentsRepository.comment.findMany({ where: { tweetId } });
  }

  create(comment: Omit<Comment, 'id'>) {
    return this.commentsRepository.comment.create({ data: comment });
  }

  delete(id: number) {
    return this.commentsRepository.comment.delete({ where: { id } });
  }
}
