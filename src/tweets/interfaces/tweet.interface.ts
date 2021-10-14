export type CreateTweet = TweetBody;

export type Tweet = TweetBody & {
  id?: number;
  authorId: number;
  author: any;
};

type TweetBody = {
  title: string;
  content: string;
};
