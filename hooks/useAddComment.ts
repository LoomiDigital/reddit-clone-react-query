import { useState } from "react";

import {
  AddCommentMutation,
  useAddCommentMutation,
} from "@d20/generated/graphql";

import client from "@d20/react-query/client";

export const useAddComment = () => {
  const [optimisticRender, setOptimisticRender] = useState<boolean>(false);

  const { mutateAsync: addComment, variables: incomingComment } =
    useAddCommentMutation<AddCommentMutation>(client);

  return {
    addComment,
    incomingComment,
    optimisticRender,
    setOptimisticRender,
  };
};
