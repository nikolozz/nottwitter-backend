import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/authentication/guards/gql-jwt.guard';
import { RequestWithUser } from 'src/authentication/interfaces/request-with-user.interface';
import { LikesService } from './likes.service';
import { Like } from './models/like.model';

@Resolver()
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Like)
  like(
    @Context() context: { req: RequestWithUser },
    @Args('tweetId', { type: () => Int }) tweetId: number,
  ) {
    return this.likesService.addLike({ tweetId, ownerId: context.req.user.id });
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Boolean)
  deleteLike(
    @Context() context: { req: RequestWithUser },
    @Args('likeId', { type: () => Int }) likeId: number,
  ) {
    return !!this.likesService.removeLike(likeId, context.req.user.id);
  }
}
