import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/authentication/guards/gql-jwt.guard';
import { RequestWithUser } from 'src/authentication/interfaces/request-with-user.interface';
import { CommentsService } from './comments.service';
import { CreateComment } from './inputs/create-comment.input';
import { Comment } from './models/comment.model';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Comment)
  addComment(
    @Args('input') createInput: CreateComment,
    @Context() context: { req: RequestWithUser },
  ) {
    const { user } = context.req;
    return this.commentsService.createComment({
      ...createInput,
      authorId: user.id,
    });
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Boolean)
  deleteComment(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: { req: RequestWithUser },
  ) {
    const { user } = context.req;
    return this.commentsService.deleteComment(user.id, id);
  }
}
