import { Field, Int, ObjectType } from '@nestjs/graphql';
import { File } from '../../files/models/file.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  avatar?: File;
}
