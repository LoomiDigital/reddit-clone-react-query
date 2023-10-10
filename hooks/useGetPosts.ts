import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useInfiniteScroll from "react-infinite-scroll-hook";

import client from "@d20/react-query/client";

import {
  GetPostsByTopicDocument,
  GetPostsByTopicQuery,
  GetPostsDocument,
  GetPostsQuery,
  PostConnection,
  useGetPostsByTopicQuery,
  useGetPostsQuery,
} from "@d20/generated/graphql";

export const useGetPosts = (first: number, topic?: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

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

  const posts =
    (data?.postsByTopic as PostConnection) || (data?.posts as PostConnection);

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

  const hasNextPage: boolean = posts?.pageInfo?.hasNextPage!;

  const loadItems = async () => {
    const { fetchedPosts } = await fetchMore(first, posts?.pageInfo?.endCursor);

    queryClient.setQueryData<GetPostsQuery | undefined>(
      useGetPostsQuery.getKey(),
      {
        posts: {
          edges: [...posts?.edges!, ...fetchedPosts?.edges!],
          pageInfo: {
            ...fetchedPosts?.pageInfo,
            ...fetchedPosts?.pageInfo!,
          },
        },
      }
    );

    setIsLoading(false);
  };

  const handleLoadMore = async () => {
    hasNextPage && loadItems();
  };

  const [sentryRef] = useInfiniteScroll({
    hasNextPage,
    loading: isLoading,
    onLoadMore: handleLoadMore,
  });

  return {
    fetchMore,
    sentryRef,
    posts,
    hasNextPage,
    isLoading,
  };
};
