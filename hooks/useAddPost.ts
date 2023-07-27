import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import {
  AddPostMutation,
  AddSubredditMutation,
  AddVoteMutation,
  GetPostsByTopicQuery,
  GetPostsQuery,
  useAddPostMutation,
  useAddSubredditMutation,
  useAddVoteMutation,
  useGetPostsByTopicQuery,
  useGetPostsQuery,
} from "@d20/generated/graphql";

import client from "@d20/react-query/client";

export const useAddPost = (subreddit?: string) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const getPosts = subreddit
    ? useGetPostsByTopicQuery.getKey({
        topic: subreddit,
      })
    : useGetPostsQuery.getKey();

  const getPostsQuery = subreddit ? "postsByTopic" : "posts";

  const { mutateAsync: addSubreddit } =
    useAddSubredditMutation<AddSubredditMutation>(client);

  const { mutateAsync: addVote } = useAddVoteMutation<AddVoteMutation>(client);

  const { mutateAsync: addPost } = useAddPostMutation<AddPostMutation>(client, {
    onMutate: async (post) => {
      await queryClient.cancelQueries(getPosts);

      const previousPosts = queryClient.getQueryData<
        GetPostsQuery & GetPostsByTopicQuery
      >(getPosts);

      queryClient.setQueryData<
        (GetPostsQuery & GetPostsByTopicQuery) | undefined
      >(getPosts, (old) => {
        const oldPosts = subreddit ? old?.postsByTopic! : old?.posts!;

        return {
          [getPostsQuery]: {
            edges: [
              {
                node: {
                  ...post,
                  id: -1,
                  votes: [
                    {
                      __typename: "Vote",
                      id: -1,
                      post_id: -1,
                      username: session?.user?.name!,
                      upvote: true,
                    },
                  ],
                  created_at: new Date().toISOString(),
                },
              },
              ...oldPosts.edges!,
            ],
            pageInfo: {
              endCursor: oldPosts.pageInfo?.endCursor,
              hasNextPage: oldPosts.pageInfo?.hasNextPage!,
            },
          },
        };
      });

      return previousPosts;
    },
    onError: () => {
      queryClient.setQueryData<
        (GetPostsQuery & GetPostsByTopicQuery) | undefined
      >(getPosts, (old) => old);
    },
    onSuccess: (data) => {
      addVote({
        post_id: data?.insertPost?.id!,
        username: session?.user?.name!,
        upvote: true,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(getPosts);
    },
  });

  return {
    addPost,
    addSubreddit,
  };
};
