import React from "react";
import { PostEdge } from "@d20/generated/graphql";

import { PostLoader } from "./Loaders";
import PostCard from "./PostCard";

type Props = {
  loading: boolean;
  loadingRef: any;
  posts: PostEdge[] | undefined;
};

function Feed({ loading, loadingRef, posts }: Props) {
  return (
    <div className="mt-5 space-y-4">
      {posts?.map(({ node }) => {
        return (
          <div key={node!.id}>
            <PostCard post={node!} />
          </div>
        );
      })}
      {loading && (
        <div ref={loadingRef} className="flex flex-col">
          <PostLoader length={1} />
        </div>
      )}
    </div>
  );
}

export default Feed;
