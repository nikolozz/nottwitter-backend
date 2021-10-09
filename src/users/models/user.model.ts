import { Field, ObjectType } from '@nestjs/graphql';
import { File } from '../../files/models/file.model';

@ObjectType()
export class User {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  avatar: File;
}
