import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadAvatarInput {
  @Field()
  key: string;

  @Field()
  url: string;
}
