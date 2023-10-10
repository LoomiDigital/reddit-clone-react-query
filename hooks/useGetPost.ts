import {
  GetPostQuery,
  PostAttributesFragment,
  useGetPostQuery,
} from "@d20/generated/graphql";
import { useQuery } from "@tanstack/react-query";

import client from "@d20/react-query/client";

export const useGetPost = (postId: number) => {
  const { data: postData, isLoading } = useQuery<GetPostQuery | undefined>(
    useGetPostQuery.getKey({
      id: postId,
    }),
    useGetPostQuery.fetcher(client, {
      id: postId,
    })
  );

  const post: PostAttributesFragment = postData?.getPost!;

  return {
    post,
    isLoading,
  };
};
