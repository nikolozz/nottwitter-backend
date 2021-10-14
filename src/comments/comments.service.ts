import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateComment } from './interfaces/create-comment.interface';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  getComment(id: number) {
    return this.commentsRepository.getById(id);
  }

  getCommentsByTweetId(tweetId: number) {
    return this.commentsRepository.getByTweetId(tweetId);
  }

  createComment(commentBody: CreateComment) {
    return this.commentsRepository.create(commentBody);
  }

  async deleteComment(userId: number, commentId: number) {
    const comment = await this.getComment(commentId);
    if (userId !== comment.authorId) {
      throw new UnauthorizedException();
    }
    return this.commentsRepository.delete(commentId);
  }
}
