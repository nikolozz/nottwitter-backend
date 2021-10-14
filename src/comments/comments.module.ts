import { Module } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  providers: [CommentsResolver, CommentsService, CommentsRepository],
  exports: [CommentsService],
})
export class CommentsModule {}
