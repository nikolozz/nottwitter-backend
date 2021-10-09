import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { TweetLoaders } from './tweets.loader';
import { TweetsRepository } from './tweets.repository';
import { TweetsResolver } from './tweets.resolver';
import { TweetsService } from './tweets.service';

@Module({
  imports: [UsersModule],
  providers: [TweetsResolver, TweetsService, TweetsRepository, TweetLoaders],
})
export class TweetsModule {}
