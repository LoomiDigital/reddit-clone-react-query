import {
  Comment,
  GetCommentsByPostIdDocument,
  GetCommentsByPostIdQuery,
} from "@d20/generated/graphql";

export const mockCommentsResponse = {
  request: {
    query: GetCommentsByPostIdDocument,
    variables: {
      post_id: 1,
    },
  },
  result: {
    data: {
      commentsByPostId: [
        {
          __typename: "Comment",
          id: 1,
          text: "a comment",
          post_id: 1,
          created_at: "2023-05-08T18:10:10.831966Z",
          username: "aUser",
        },
        {
          __typename: "Comment",
          id: 2,
          text: "another comment",
          post_id: 1,
          created_at: "2023-05-08T18:10:10.831966Z",
          username: "aUser",
        },
      ],
    },
  },
};

export const mockComment: Comment = {
  __typename: "Comment",
  id: 1,
  text: "An amazing comment",
  post_id: 1,
  created_at: "2023-05-08T18:10:10.831966Z",
  username: "aUser",
};

export const mockComments: GetCommentsByPostIdQuery = {
  commentsByPostId: [
    {
      __typename: "Comment",
      id: 1,
      text: "a comment",
      post_id: 1,
      created_at: "2023-05-08T18:10:10.831966Z",
      username: "aUser",
    },
    {
      __typename: "Comment",
      id: 2,
      text: "another comment",
      post_id: 1,
      created_at: "2023-05-08T18:10:10.831966Z",
      username: "aUser",
    },
  ],
};
