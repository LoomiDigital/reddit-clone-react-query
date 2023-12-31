import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useSearchParams } from "next/navigation";
import useInfiniteScroll from "react-infinite-scroll-hook";

import client from "@d20/react-query/client";

import {
  GetPostsByTopicQuery,
  useGetPostsByTopicQuery,
} from "@d20/generated/graphql";

import { QueryClient, dehydrate, useQueryClient } from "@tanstack/react-query";

import { useGetPosts } from "@d20/hooks/useGetPosts";

import Avatar from "@d20/components/Avatar";
import Postbox from "@d20/components/Postbox";
import Feed from "@d20/components/Feed";

const Subreddit: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const topic: string = searchParams.get("topic")!;
  const NUMBER_OF_POSTS = 4;

  const { posts, fetchMore } = useGetPosts(NUMBER_OF_POSTS, topic);

  const hasNextPage: boolean = posts?.pageInfo?.hasNextPage!;

  const loadItems = async () => {
    const { fetchedPosts } = await fetchMore(
      NUMBER_OF_POSTS,
      posts?.pageInfo?.endCursor,
      topic
    );

    queryClient.setQueryData<GetPostsByTopicQuery | undefined>(
      useGetPostsByTopicQuery.getKey({
        topic,
      }),
      {
        postsByTopic: {
          edges: [...posts?.edges!, ...fetchedPosts?.edges!],
          pageInfo: {
            ...posts?.pageInfo,
            ...fetchedPosts?.pageInfo!,
          },
        },
      }
    );

    setIsLoading(false);
  };

  const handleLoadMore = () => {
    hasNextPage && loadItems();
  };

  const [sentryRef] = useInfiniteScroll({
    hasNextPage,
    loading: isLoading,
    onLoadMore: handleLoadMore,
  });

  return (
    <div className="h-24 bg-red-400 p-8">
      <div className="-mx-8 mt-10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={topic} large />
          </div>
          <div className="py-2">
            <h1 className="text-3xl font-semibold">
              Welcome to the r/{topic} subreddit
            </h1>
            <p className="text-sm text-gray-400">r/{topic}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-5 max-w-5xl pb-10">
        <Postbox subreddit={topic} />

        {posts.edges?.length && (
          <Feed
            posts={posts?.edges}
            loading={isLoading || hasNextPage}
            loadingRef={sentryRef}
          />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<GetPostsByTopicQuery | undefined>(
    useGetPostsByTopicQuery.getKey({
      topic: params?.topic as string,
    }),
    useGetPostsByTopicQuery.fetcher(client, {
      first: 4,
      topic: params?.topic as string,
    })
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Subreddit;
