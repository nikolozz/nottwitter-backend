import { UseGuards } from '@nestjs/common';
import { Query, Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/authentication/guards/gql-jwt.guard';
import { RequestWithUser } from 'src/authentication/interfaces/request-with-user.interface';
import { UploadAvatarInput } from './inputs/upload-avatar.input';
import { UsersService } from './users.service';
import { File } from './models/file.model';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  healthCheck() {
    return 'OK';
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => File)
  addAvatar(
    @Args('input') input: UploadAvatarInput,
    @Context() context: { req: RequestWithUser },
  ) {
    const { user } = context.req;
    return this.usersService.addAvatar(user.id, input);
  }
}
