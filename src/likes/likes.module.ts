import { Module } from '@nestjs/common';
import { LikesDataLoader } from './likes.loader';
import { LikesRepository } from './likes.repository';
import { LikesResolver } from './likes.resolver';
import { LikesService } from './likes.service';

@Module({
  providers: [LikesResolver, LikesService, LikesRepository, LikesDataLoader],
  exports: [LikesService, LikesDataLoader],
})
export class LikesModule {}
