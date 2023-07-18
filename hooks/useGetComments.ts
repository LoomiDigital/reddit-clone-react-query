import { useGetCommentsByPostIdQuery } from "@d20/generated/graphql";
import { useQuery } from "@tanstack/react-query";

import client from "@d20/react-query/client";

export const useGetComments = (postId: number) => {
  const { data: commentsData, isLoading } = useQuery(
    useGetCommentsByPostIdQuery.getKey({
      post_id: postId,
    }),
    useGetCommentsByPostIdQuery.fetcher(client, {
      post_id: postId,
    })
  );

  return {
    commentsData,
    isLoading,
  };
};
