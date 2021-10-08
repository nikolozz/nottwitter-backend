import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/authentication/guards/gql-jwt.guard';
import { FilesService } from './files.service';

@Resolver()
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => String)
  generatePresignedUrl(@Args('key', { type: () => String }) key: string) {
    return this.filesService.getPresignedUrl(key);
  }
}
