import {
  GetPostDocument,
  PostAttributesFragment,
} from "@d20/generated/graphql";

export const mockPostResponse = {
  request: {
    query: GetPostDocument,
    variables: {
      id: 1,
    },
  },
  result: {
    data: {
      getPost: {
        node: {
          __typename: "Post",
          id: 1,
          title: "Test Post",
          body: "Test Content",
          image: "http://placehold.it/300x300",
          username: "Buck",
          votes: [
            {
              __typename: "Vote",
              upvote: true,
              username: "Buck",
              post_id: 1,
            },
          ],
          subreddit_id: 1,
          subreddit_topic: "test",
          created_at: "2021-10-10",
        },
      },
    },
  },
};

export const mockPost: PostAttributesFragment = {
  __typename: "Post",
  id: 1,
  title: "Test Post",
  body: "Test Content",
  image: "http://placehold.it/300x300",
  username: "Buck",
  votes: [
    {
      __typename: "Vote",
      upvote: false,
      username: "Buck",
      post_id: 1,
    },
  ],
  subreddit_id: 1,
  subreddit_topic: "test",
  created_at: "2021-10-10",
};

export const mockPostUpvoted: PostAttributesFragment = {
  __typename: "Post",
  id: 1,
  title: "Test Post",
  body: "Test Content",
  image: "http://placehold.it/300x300",
  username: "Buck",
  votes: [
    {
      __typename: "Vote",
      upvote: true,
      username: "Buck",
      post_id: 1,
    },
  ],
  subreddit_id: 1,
  subreddit_topic: "test",
  created_at: "2021-10-10",
};
