import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import client from "@d20/react-query/client";
import useInfiniteScroll from "react-infinite-scroll-hook";

import {
  GetPostsDocument,
  GetPostsQuery,
  PostConnection,
  PostEdge,
  useGetPostsQuery,
} from "@d20/generated/graphql";
import {
  QueryClient,
  dehydrate,
  hydrate,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

// import { newPostIncoming } from "@d20/reactivities/posts";

// import PostBox from "@d20/Components/Postbox";
import Feed from "@d20/components/Feed";
import { PostLoader } from "@d20/components/Loaders";
import { useState } from "react";

type Props = {
  posts: PostConnection;
};

const Home: NextPage<Props> = (props) => {
  const [posts, setPosts] = useState<PostConnection>(props.posts);
  const [isLoading, setIsLoading] = useState(false);

  const loadItems = async () => {
    const data = await client.request<GetPostsQuery>(GetPostsDocument, {
      first: 4,
      after: posts?.pageInfo?.endCursor,
    });

    setPosts((prev: PostConnection) => ({
      ...prev,
      edges: [...prev.edges, ...data?.posts?.edges!],
      pageInfo: {
        ...prev.pageInfo,
        ...data?.posts?.pageInfo!,
      },
    }));

    setIsLoading(false);
  };

  const hasNextPage = posts.pageInfo.hasNextPage;

  const handleLoadMore = async () => {
    hasNextPage && loadItems();
  };

  const [sentryRef] = useInfiniteScroll({
    hasNextPage: hasNextPage as boolean,
    loading: isLoading,
    onLoadMore: handleLoadMore,
  });

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Head>
        <title>Reddit 2.0</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <PostBox />
      {newPostIncoming() && <PostLoader length={1} />}
      */}

      <Feed
        posts={posts.edges}
        loading={isLoading || (hasNextPage as boolean)}
        loadingRef={sentryRef}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useGetPostsQuery.getKey(),
    useGetPostsQuery.fetcher(client, { first: 4 })
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      posts: queryClient.getQueryData<GetPostsQuery>(useGetPostsQuery.getKey())
        ?.posts,
    },
  };
};

export default Home;
