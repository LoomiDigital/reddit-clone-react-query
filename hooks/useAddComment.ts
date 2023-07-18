import {
  AddCommentMutation,
  useAddCommentMutation,
} from "@d20/generated/graphql";

import client from "@d20/react-query/client";
import { useState } from "react";

export const useAddComment = () => {
  const { mutateAsync: addComment, variables: incomingComment } =
    useAddCommentMutation<AddCommentMutation>(client);

  const [optimisticRender, setOptimisticRender] = useState<boolean>(false);

  return {
    addComment,
    incomingComment,
    optimisticRender,
    setOptimisticRender,
  };
};
