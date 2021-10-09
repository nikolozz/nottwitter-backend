import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTweeetInput {
  @Field()
  title: string;

  @Field()
  content: string;
}
