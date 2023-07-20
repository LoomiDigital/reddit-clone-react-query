import { useEffect, useState } from "react";
import { Vote, useUpdateVoteMutation } from "@d20/generated/graphql";

import client from "@d20/react-query/client";

export const useAddVote = (votes: [Vote], username: string) => {
  const [displayVotes, setDisplayVotes] = useState<number>(0);
  const [vote, setVote] = useState<boolean | null>(null);

  useEffect(() => {
    const userVote = votes?.find((vote) => vote?.username === username)?.upvote;

    setVote(userVote!);
  }, [votes, username, setVote]);

  useEffect(() => {
    const totalVotes = votes?.reduce(
      (total, vote) => (vote?.upvote ? ++total : --total),
      0
    );

    setDisplayVotes(totalVotes!);
  }, [votes, setDisplayVotes]);

  const { mutateAsync: updateVote } = useUpdateVoteMutation(client, {
    onMutate: async (variables) => {
      const isUpvote = variables?.upvote;
      const updatedUpvotes = isUpvote ? displayVotes + 2 : displayVotes - 2;

      setDisplayVotes(updatedUpvotes);
      setVote(isUpvote);
    },
    onError: () => {
      const isUpvote = !!vote;
      const updatedUpvotes = isUpvote ? displayVotes - 2 : displayVotes + 2;

      setDisplayVotes(updatedUpvotes);
      setVote(!isUpvote);
    },
  });

  return {
    updateVote,
    displayVotes,
    vote,
  };
};
