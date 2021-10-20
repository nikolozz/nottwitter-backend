import { Module } from '@nestjs/common';
import { CommentsModule } from 'src/comments/comments.module';
import { LikesModule } from 'src/likes/likes.module';
import { UsersModule } from '../users/users.module';
import { TweetLoaders } from './tweets.loader';
import { TweetsRepository } from './tweets.repository';
import { TweetsResolver } from './tweets.resolver';
import { TweetsService } from './tweets.service';

@Module({
  imports: [UsersModule, CommentsModule, LikesModule],
  providers: [TweetsResolver, TweetsService, TweetsRepository, TweetLoaders],
})
export class TweetsModule {}
