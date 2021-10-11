import { UseGuards } from '@nestjs/common';
import { Query, Args, Context, Mutation, Resolver, Int } from '@nestjs/graphql';
import { GqlJwtGuard } from '../authentication/guards/gql-jwt.guard';
import { RequestWithUser } from '../authentication/interfaces/request-with-user.interface';
import { UploadAvatarInput } from './inputs/upload-avatar.input';
import { UsersService } from './users.service';
import { File } from '../files/models/file.model';
import { Roles } from '../authentication/decorators/set-role.decorator';
import { Role } from '../authentication/enums/role.enum';

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

  @Roles(Role.ADMIN)
  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.deleteUser(id);
  }
}
