import { use, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { QueryClient, dehydrate, useQueryClient } from "@tanstack/react-query";
import client from "@d20/react-query/client";

import {
  GetPostQuery,
  PostAttributesFragment,
  useGetCommentsByPostIdQuery,
  useGetPostQuery,
} from "@d20/generated/graphql";

import { useGetPost } from "@d20/hooks/useGetPost";
import { useGetComments } from "@d20/hooks/useGetComments";
import { useAddComment } from "@d20/hooks/useAddComment";

import { CommentLoader } from "@d20/components/Loaders";
import PostCard from "@d20/components/PostCard";
import CommentCard from "@d20/components/CommentCard";

type FormData = {
  comment: string;
};

function PostPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const postId = parseInt(searchParams.get("postId")!);

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);

  const { postData } = useGetPost(postId);
  const { commentsData, isLoading } = useGetComments(postId);
  const { addComment, incomingComment, optimisticRender, setOptimisticRender } =
    useAddComment();

  const post: PostAttributesFragment = postData?.getPost!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormData>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsSubmitSuccessful(false);
    }
  }, [isSubmitSuccessful, reset]);

  const comments = commentsData?.commentsByPostId;

  const submitComment = handleSubmit(async (formData) => {
    const notification = toast.loading("Adding comment...");
    setOptimisticRender(true);

    addComment(
      {
        post_id: post.id,
        text: formData.comment,
        username: session?.user?.name!,
      },
      {
        onSuccess: () => {
          setIsSubmitSuccessful(true);

          toast.success("Comment added!", { id: notification });
        },
        onSettled: async () => {
          await queryClient.invalidateQueries(
            useGetCommentsByPostIdQuery.getKey({
              post_id: postId,
            })
          );

          setOptimisticRender(false);
        },
      }
    );
  });

  return (
    <div className="mx-auto my-7 max-w-5xl">
      {post && <PostCard post={post} />}
      <div className="mt-5 rounded-t-md border border-b-0 border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comments as{" "}
          <span className="text-red-500">{session?.user?.name}</span>
        </p>
        <form onSubmit={submitComment} className="flex flex-col space-y-2">
          <textarea
            disabled={!session}
            {...register("comment", { required: true })}
            className="h-24 rounded-sm border border-gray-200 p-2 pl-4 outline-none focus-within:border-gray-900 disabled:bg-gray-50"
            placeholder={
              session ? "What are your thoughts?" : "Please log in to comment"
            }
          ></textarea>
          <button
            disabled={!isValid || !session}
            type="submit"
            name="comment"
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:cursor-default disabled:bg-gray-500 disabled:text-gray-300"
          >
            Comment
          </button>
        </form>
      </div>
      <div className="rounded-b-md border border-t-0 border-gray-300 bg-white px-10 py-5">
        <hr className="py-2" />
        {optimisticRender && <CommentCard comment={incomingComment!} />}
        {isLoading ? (
          <CommentLoader length={1} />
        ) : (
          comments?.map((comment) => (
            <CommentCard key={comment?.id} comment={comment!} />
          ))
        )}
      </div>
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
