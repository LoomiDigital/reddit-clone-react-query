import { useQuery } from "@tanstack/react-query";

import {
  GetPostsByTopicDocument,
  GetPostsByTopicQuery,
  GetPostsDocument,
  GetPostsQuery,
  PostConnection,
  useGetPostsByTopicQuery,
  useGetPostsQuery,
} from "@d20/generated/graphql";

import client from "@d20/react-query/client";

export const useGetPosts = (first: number, topic?: string) => {
  const postsQuery = topic
    ? useGetPostsByTopicQuery.getKey({
        topic,
      })
    : useGetPostsQuery.getKey();

  const postsFetch = topic
    ? useGetPostsByTopicQuery.fetcher(client, { first, topic })
    : useGetPostsQuery.fetcher(client, { first });

  const { data } = useQuery<(GetPostsQuery & GetPostsByTopicQuery) | undefined>(
    postsQuery,
    postsFetch
  );

  const fetchMore = async (first: number, after: string, topic?: string) => {
    const postsQuery = topic ? GetPostsByTopicDocument : GetPostsDocument;

    const data = await client.request<
      (GetPostsQuery & GetPostsByTopicQuery) | undefined
    >(postsQuery, {
      first,
      after,
      topic,
    });

    return {
      fetchedPosts:
        (data?.postsByTopic as PostConnection) ||
        (data?.posts as PostConnection),
    };
  };

  return {
    posts:
      (data?.postsByTopic as PostConnection) || (data?.posts as PostConnection),
    fetchMore,
  };
};
