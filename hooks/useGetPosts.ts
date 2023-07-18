import { useQuery } from "@tanstack/react-query";

import {
  GetPostsDocument,
  GetPostsQuery,
  PostConnection,
  useGetPostsQuery,
} from "@d20/generated/graphql";

import client from "@d20/react-query/client";

export const useGetPosts = (first: number) => {
  const { data } = useQuery<GetPostsQuery | undefined>(
    useGetPostsQuery.getKey(),
    useGetPostsQuery.fetcher(client, { first })
  );

  const fetchMore = async (first: number, after: string) => {
    const data = await client.request<GetPostsQuery | undefined>(
      GetPostsDocument,
      {
        first,
        after,
      }
    );

    return {
      fetchedPosts: data?.posts as PostConnection,
    };
  };

  return {
    posts: data?.posts as PostConnection,
    fetchMore,
  };
};
