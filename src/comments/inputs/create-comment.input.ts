import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateComment {
  @Field(() => Int)
  tweetId: number;

  @Field(() => String)
  content: string;
}
