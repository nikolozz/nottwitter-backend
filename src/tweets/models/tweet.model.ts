import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tweet {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  authorId: number;
}
