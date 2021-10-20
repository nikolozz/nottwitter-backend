import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Like {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  tweetId: number;

  @Field(() => Int)
  authorId: number;

  @Field(() => Date)
  likedAt: Date;
}
