import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import client from "@d20/react-query/client";
import { toast } from "react-hot-toast";
// import { newPostIncoming } from "@d20/reactivities/posts";

import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import {
  AddPostMutation,
  AddSubredditMutation,
  GetPostQuery,
  GetSubredditByTopicDocument,
  GetSubredditByTopicQuery,
  PostAttributesFragmentDoc,
  PostConnection,
  PostEdge,
  Subreddit,
  useAddPostMutation,
  useAddSubredditMutation,
  useAddVoteMutation,
  useGetPostsQuery,
  useGetSubredditByTopicQuery,
} from "@d20/generated/graphql";

import Avatar from "./Avatar";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  subreddit?: string;
};

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

function Postbox({ subreddit }: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { mutateAsync: addSubreddit } =
    useAddSubredditMutation<AddSubredditMutation>(client);

  const { mutateAsync: addPost } = useAddPostMutation<AddPostMutation>(client);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);

  const submitPost = handleSubmit(async (formData) => {
    const notification = toast.loading("Creating post...");

    try {
      // newPostIncoming(true);

      const data = await client.request<GetSubredditByTopicQuery>(
        GetSubredditByTopicDocument,
        {
          topic: subreddit || formData.subreddit.toLowerCase(),
        }
      );

      const subredditExists = data?.getSubredditByTopic;

      const postFields = {
        title: formData.postTitle!,
        body: formData.postBody || "",
        image: formData.postImage || "",
        username: session?.user?.name!,
      };

      let newSubreddit = null;

      if (!subredditExists) {
        const { insertSubreddit } = await addSubreddit({
          topic: formData.subreddit.toLowerCase(),
        });

        newSubreddit = insertSubreddit;
      }

      await addPost(
        {
          ...postFields,
          subreddit_id: newSubreddit?.id || subredditExists?.id!,
          subreddit_topic: newSubreddit?.topic || subredditExists?.topic!,
        },
        {
          onSuccess: ({ insertPost }) => {
            queryClient.setQueryData<GetPostQuery | unknown>(
              useGetPostsQuery.getKey(),
              (old: { posts: PostConnection }) => {
                return {
                  posts: {
                    edges: [
                      {
                        node: insertPost!,
                      },
                      ...old?.posts?.edges!,
                    ],
                    pageInfo: {
                      endCursor: old?.posts?.pageInfo?.endCursor!,
                      hasNextPage: old?.posts?.pageInfo?.hasNextPage!,
                    },
                  },
                };
              }
            );
          },
        }
      );

      // addPost({
      //   variables: {
      //     ...postFields,
      //     subreddit_id: newSubreddit?.id || subredditExists?.id!,
      //     subreddit_topic: newSubreddit?.topic || subredditExists?.topic!,
      //   },
      //   optimisticResponse(vars) {
      //     return {
      //       insertPost: {
      //         __typename: "Post",
      //         id: -1,
      //         title: vars.title,
      //         body: vars.body,
      //         image: vars.image,
      //         username: vars.username,
      //         votes: [],
      //         subreddit_id: -1,
      //         subreddit_topic: vars.subreddit_topic,
      //         created_at: new Date().toISOString(),
      //       },
      //     };
      //   },
      //   update: async (cache, { data: addPostData }) => {
      //     const fieldName = subreddit ? "postsByTopic" : "posts";

      //     cache.modify({
      //       fields: {
      //         [fieldName](existingPosts = {}) {
      //           const newPostRef = cache.writeFragment({
      //             data: {
      //               ...addPostData?.insertPost!,
      //               votes: [
      //                 {
      //                   __typename: "Vote",
      //                   id: -1,
      //                   post_id: addPostData?.insertPost?.id!,
      //                   username: session?.user.name!,
      //                   upvote: true,
      //                 },
      //               ],
      //             },
      //             fragment: PostAttributesFragmentDoc,
      //             fragmentName: "postAttributes",
      //           });

      //           return {
      //             ...existingPosts,
      //             edges: [
      //               {
      //                 __typename: "PostEdge",
      //                 node: newPostRef,
      //                 cursor: addPostData?.insertPost?.id!,
      //               },
      //               ...existingPosts.edges,
      //             ],
      //           };
      //         },
      //       },
      //     });
      //   },
      //   onCompleted: async (data) => {
      //     addVote({
      //       variables: {
      //         post_id: data?.insertPost?.id!,
      //         username: session?.user.name!,
      //         upvote: true,
      //       },
      //     });

      //     newPostIncoming(false);
      //   },
      // });

      setValue("postTitle", "");
      setValue("postBody", "");
      setValue("postImage", "");
      setValue("subreddit", "");

      toast.success("Post created!", { id: notification });
    } catch (error) {
      console.log("error", error);
      toast.error("Error creating post!", { id: notification });
    }
  });

  return (
    <form
      className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2"
      onSubmit={submitPost}
    >
      <div className="flex items-center space-x-3">
        <Avatar />

        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          className="w-full flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : "Create a post by entering a title!"
              : "Sign in to create a post"
          }
        />
        <PhotoIcon
          onClick={() => {
            setImageBoxOpen(!imageBoxOpen);
          }}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && "text-blue-500"
          }`}
          title="Add an image"
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>
      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register("postBody")}
              type="text"
              placeholder="Text (optional)"
            />
          </div>
          {!subreddit && (
            <div className="flex flex-col py-2">
              <div className="flex items-center px-2">
                <p className="min-w-[90px]">Subreddit:</p>
                <input
                  className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                  {...register("subreddit", { required: true })}
                  type="text"
                  placeholder="i.e. r/nextjs"
                />
              </div>
            </div>
          )}
          {imageBoxOpen && (
            <div className="flex flex-col py-2">
              <div className="flex items-center px-2">
                <p className="min-w-[90px]">Image URL:</p>
                <input
                  className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                  {...register("postImage")}
                  type="text"
                  placeholder="Image URL"
                />
              </div>
            </div>
          )}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>- Post title is required</p>
              )}
              {errors.subreddit?.type === "required" && (
                <p>- A subreddit is required</p>
              )}
            </div>
          )}
          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-500 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default Postbox;
