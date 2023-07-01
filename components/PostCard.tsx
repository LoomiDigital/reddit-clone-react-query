import React, { SyntheticEvent, useEffect, useState } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TimeAgo from "react-timeago";
import {
  GetPostDocument,
  PostAttributesFragment,
  UpdateVoteDocument,
  useGetCommentsByPostIdQuery,
  useUpdateVoteMutation,
} from "@d20/generated/graphql";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Avatar from "./Avatar";

interface Props {
  post: PostAttributesFragment;
}

function PostCard({ post }: Props) {
  const { data: session } = useSession();
  // const { data: commentsData, loading } = useGetCommentsByPostIdQuery({
  //   variables: {
  //     post_id: post.id,
  //   },
  // });
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [vote, setVote] = useState<boolean | null>();
  const [displayVotes, setDisplayVotes] = useState<number>(0);
  // const [updateVote] = useUpdateVoteMutation();
  const votes = post?.votes;

  // useEffect(() => {
  //   const userVote = votes?.find(
  //     (vote) => vote?.username === session?.user?.name
  //   )?.upvote;

  //   setVote(userVote);
  // }, [votes, session]);

  useEffect(() => {
    const totalVotes = votes?.reduce(
      (total, vote) => (vote?.upvote ? ++total : --total),
      0
    );

    setDisplayVotes(totalVotes!);
  }, [votes]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // const upVote = async (e: SyntheticEvent, isUpvote: boolean) => {
  //   e.preventDefault();

  //   if (!session) {
  //     console.log("Log in to upvote");
  //     return;
  //   }

  //   if (isUpvote && vote) {
  //     console.log("You may only upvote once");
  //     return;
  //   }

  //   if (!isUpvote && vote === false) {
  //     console.log("You may only downvote once");
  //     return;
  //   }

  //   updateVote({
  //     variables: {
  //       post_id: post.id,
  //       upvote: isUpvote,
  //       username: session?.user.name,
  //     },
  //     optimisticResponse(vars) {
  //       return {
  //         updateVote: {
  //           __typename: "Vote",
  //           id: -1,
  //           post_id: vars.post_id,
  //           upvote: vars.upvote,
  //           username: vars.username,
  //         },
  //       };
  //     },
  //     update(cache, { data }) {
  //       const isUpvote = data?.updateVote?.upvote;
  //       const updatedUpvotes = isUpvote ? displayVotes + 2 : displayVotes - 2;

  //       cache.writeQuery({
  //         query: UpdateVoteDocument,
  //         variables: {
  //           post_id: post.id,
  //         },
  //         data: {
  //           updateVote: {
  //             __typename: "Vote",
  //             id: data?.updateVote?.id,
  //             post_id: post.id,
  //             upvote: isUpvote,
  //             username: session?.user.name,
  //           },
  //         },
  //       });

  //       setDisplayVotes(updatedUpvotes);
  //       setVote(isUpvote);
  //     },
  //     refetchQueries: [
  //       {
  //         query: GetPostDocument,
  //         variables: {
  //           id: post.id,
  //         },
  //       },
  //     ],
  //   });
  // };

  const loadSubredditPage = (e: SyntheticEvent) => {
    e.preventDefault();
    const href = `/subreddit/${post.subreddit_topic}`;
    Router.push(href);
  };

  // const comments = commentsData?.commentsByPostId;

  return (
    <Link passHref href={`/post/${post.id}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            // onClick={(e) => upVote(e, true)}
            title="upvote"
            className={`voteButtons cursor-pointer hover:text-red-400 ${
              vote && "text-red-400"
            }`}
          />

          <p title="votes" className="votes text-xs font-bold text-black">
            {displayVotes}
          </p>

          <ArrowDownIcon
            // onClick={(e) => upVote(e, false)}
            title="downvote"
            className={`voteButtons cursor-pointer hover:text-blue-400 ${
              !vote && "text-blue-400"
            }`}
          />
        </div>
        <div className="p-3 pb-1">
          <div className="flex items-center space-x-2">
            <Avatar seed={post?.subreddit_topic!} />
            <p className="text-xs text-gray-400">
              <span
                onClick={(e) => loadSubredditPage(e)}
                className="font-bold text-black hover:text-blue-400 hover:underline"
              >
                r/{post.subreddit_topic}
              </span>

              <span>
                • Posted by u/{post.username}{" "}
                {hasMounted ? (
                  <TimeAgo date={post.created_at} autoPlay={false} />
                ) : (
                  "Loading..."
                )}
              </span>
            </p>
          </div>

          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>
          {post.image && <img className="w-full" src={post.image} alt="" />}

          <div className="flex space-x-4 text-gray-400 ">
            <div className="postButtons">
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
              {/* <p>{loading ? 0 : comments?.length} Comments</p> */}
            </div>
            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
