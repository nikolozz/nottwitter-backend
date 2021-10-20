import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GqlJwtGuard } from '../authentication/guards/gql-jwt.guard';
import { RequestWithUser } from '../authentication/interfaces/request-with-user.interface';
import { CreateTweeetInput } from './inputs/create-tweet.input';
import { TweetsService } from './tweets.service';
import { Tweet } from './models/tweet.model';
import { User } from '../users/models/user.model';
import { TweetLoaders } from './tweets.loader';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/models/comment.model';
import { Like } from 'src/likes/models/like.model';
import { LikesDataLoader } from 'src/likes/likes.loader';

@Resolver(() => Tweet)
export class TweetsResolver {
  constructor(
    private readonly tweetsService: TweetsService,
    private readonly tweetLoaders: TweetLoaders,
    private readonly commentsService: CommentsService,
    private readonly likesLoader: LikesDataLoader,
  ) {}

  @Query(() => [Tweet])
  tweets() {
    return this.tweetsService.getAll();
  }

  @Query(() => Tweet)
  tweet(@Args('id', { type: () => Int }) id: number) {
    return this.tweetsService.getById(id);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Tweet)
  createTweet(
    @Args('input') input: CreateTweeetInput,
    @Context() context: { req: RequestWithUser },
  ) {
    const { id } = context.req.user;
    return this.tweetsService.create({
      ...input,
      authorId: id,
    });
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Tweet)
  deleteTweet(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: { req: RequestWithUser },
  ) {
    const { id: authorId } = context.req.user;
    return this.tweetsService.delete(authorId, id);
  }

  @ResolveField('author', () => User)
  tweetAuthor(@Parent() tweet: Tweet) {
    const { authorId } = tweet;
    return this.tweetLoaders.batchAuthors.load(authorId);
  }

  @ResolveField(() => [Comment], { nullable: true })
  comments(@Parent() tweet: Tweet) {
    // TODO move to Data Loader
    return this.commentsService.getCommentsByTweetId(tweet.id);
  }

  @ResolveField(() => [Like], { nullable: true })
  likes(@Parent() tweet: Tweet) {
    return this.likesLoader.batchLikes.load(tweet.id);
  }
}
