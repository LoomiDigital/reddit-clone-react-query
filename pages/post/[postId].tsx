import { GetServerSideProps } from "next";
import { useSearchParams } from "next/navigation";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import client from "@d20/react-query/client";
import { GetPostQuery, useGetPostQuery } from "@d20/generated/graphql";

import { useGetPost } from "@d20/hooks/useGetPost";

import PostCard from "@d20/components/PostCard";
import Comments from "@d20/components/Comments";

function PostPage() {
  const searchParams = useSearchParams();

  const postId = parseInt(searchParams.get("postId")!);
  const { post } = useGetPost(postId);

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <PostCard post={post} />
      <Comments post={post} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const id = parseInt(params?.postId as string);

  await queryClient.prefetchQuery<GetPostQuery | undefined>(
    useGetPostQuery.getKey({ id }),
    useGetPostQuery.fetcher(client, { id })
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default PostPage;
