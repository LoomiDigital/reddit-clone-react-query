import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import client from "@d20/react-query/client";
import {
  QueryClient,
  dehydrate,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  AddCommentMutation,
  GetCommentsByPostIdQuery,
  GetPostQuery,
  PostAttributesFragment,
  useAddCommentMutation,
  useGetCommentsByPostIdQuery,
  useGetPostQuery,
} from "@d20/generated/graphql";

import { toast } from "react-hot-toast";
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

  const { data: commentsData } = useQuery(
    useGetCommentsByPostIdQuery.getKey({
      post_id: postId,
    }),
    useGetCommentsByPostIdQuery.fetcher(client, {
      post_id: postId,
    })
  );

  const { data: postData, isLoading } = useQuery<GetPostQuery | undefined>(
    useGetPostQuery.getKey({
      id: postId,
    }),
    useGetPostQuery.fetcher(client, {
      id: postId,
    })
  );

  const { mutateAsync: addComment } = useAddCommentMutation<AddCommentMutation>(
    client,
    {
      onMutate: async (comment) => {
        await queryClient.cancelQueries(
          useGetCommentsByPostIdQuery.getKey({
            post_id: postId,
          })
        );

        const previousComments =
          queryClient.getQueryData<GetCommentsByPostIdQuery>(
            useGetCommentsByPostIdQuery.getKey({
              post_id: postId,
            })
          );

        queryClient.setQueryData<GetCommentsByPostIdQuery | undefined>(
          useGetCommentsByPostIdQuery.getKey({
            post_id: postId,
          }),
          (old) => ({
            commentsByPostId: [
              {
                ...comment,
                id: -1,
                created_at: new Date().toISOString(),
              },
              ...old?.commentsByPostId!,
            ],
          })
        );

        return previousComments;
      },
      onError: (_err, _variables, context) => {
        const { commentsByPostId } = context as GetCommentsByPostIdQuery;

        queryClient.setQueryData<GetCommentsByPostIdQuery | unknown>(
          useGetCommentsByPostIdQuery.getKey({
            post_id: postId,
          }),
          commentsByPostId
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(
          useGetCommentsByPostIdQuery.getKey({
            post_id: postId,
          })
        );
      },
    }
  );

  const post: PostAttributesFragment = postData?.getPost!;

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);

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
      }
    );
  });

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <PostCard post={post} />
      <div className="mt-5 rounded-t-md border border-b-0 border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comments as{" "}
          <span className="text-red-500">{session?.user?.name}</span>
        </p>
        <form onSubmit={submitComment} className="flex flex-col space-y-2">
          <textarea
            disabled={!session}
            {...register("comment", { required: true })}
            className="boder h-24 rounded-sm border border-gray-200 p-2 pl-4 outline-none focus-within:border-gray-900 disabled:bg-gray-50"
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
