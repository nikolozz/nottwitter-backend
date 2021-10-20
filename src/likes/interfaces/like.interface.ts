import { Tweet } from '../../tweets/interfaces/tweet.interface';
import { User } from '../../users/interfaces/user.interface';

export type Like = {
  id?: number;
  owner?: User;
  ownerId: number;
  tweet?: Tweet;
  tweetId: number;
  likedAt: Date;
};
