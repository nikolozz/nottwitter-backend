import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  content: string;

  @Field(() => User)
  author: User;
}
