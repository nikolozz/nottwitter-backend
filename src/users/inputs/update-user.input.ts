import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateInput {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  website?: string;

  @Field(() => String, { nullable: true })
  location?: string;
}
