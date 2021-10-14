import { UseGuards } from '@nestjs/common';
import {
  Query,
  Args,
  Context,
  Mutation,
  Resolver,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GqlJwtGuard } from '../authentication/guards/gql-jwt.guard';
import { RequestWithUser } from '../authentication/interfaces/request-with-user.interface';
import { UploadAvatarInput } from './inputs/upload-avatar.input';
import { UsersService } from './users.service';
import { File } from '../files/models/file.model';
import { Roles } from '../authentication/decorators/set-role.decorator';
import { Role } from '../authentication/enums/role.enum';
import { User } from './models/user.model';
import { UpdateInput } from './inputs/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlJwtGuard)
  @Query(() => User)
  me(@Context() context: { req: RequestWithUser }) {
    const { user } = context.req;
    return this.usersService.getById(user.id);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => User)
  updateUser(
    @Context() context: { req: RequestWithUser },
    @Args('input') input: UpdateInput,
  ) {
    const { user } = context.req;
    return this.usersService.updateUser(user.id, input);
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

  @UseGuards(GqlJwtGuard)
  @ResolveField(() => File, { nullable: true })
  public avatar(@Parent() user: User) {
    return this.usersService.getAvatar(user.id);
  }
}
