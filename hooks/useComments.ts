import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import client from "@d20/react-query/client";
import {
  AddCommentMutation,
  PostAttributesFragment,
  useAddCommentMutation,
  useGetCommentsByPostIdQuery,
} from "@d20/generated/graphql";

type FormData = {
  comment: string;
};

export const useComments = (post: PostAttributesFragment) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const [optimisticRender, setOptimisticRender] = useState<boolean>(false);
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

  const { data: commentsData, isLoading } = useQuery(
    useGetCommentsByPostIdQuery.getKey({
      post_id: post.id,
    }),
    useGetCommentsByPostIdQuery.fetcher(client, {
      post_id: post.id,
    })
  );

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
              post_id: post.id,
            })
          );

          setOptimisticRender(false);
        },
      }
    );
  });

  const { mutateAsync: addComment, variables: incomingComment } =
    useAddCommentMutation<AddCommentMutation>(client);

  return {
    setOptimisticRender,
    submitComment,
    register,
    comments,
    incomingComment,
    isLoading,
    isValid,
    optimisticRender,
  };
};
