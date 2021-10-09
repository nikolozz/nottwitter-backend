export type CreateTweet = TweetBody;

export type Tweet = TweetBody & {
  id?: number;
  authorId: number;
};

type TweetBody = {
  title: string;
  content: string;
};
