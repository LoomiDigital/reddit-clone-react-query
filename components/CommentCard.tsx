import React, { useEffect, useState } from "react";
import Avatar from "@d20/components/Avatar";
import Timeago from "react-timeago";
import { Comment } from "@d20/generated/graphql";

type Props = {
  comment: Comment;
};

function CommentCard({ comment }: Props) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="relative flex items-center space-x-2 space-y-10">
      <hr className="absolute left-7 top-16 z-0 h-16 border" />
      <div className="z-50">
        <Avatar seed={comment?.username} />
      </div>
      <div className="flex flex-col">
        <p className="py-2 text-xs text-gray-400">
          <span className="font-semibold text-gray-600">
            {comment?.username}
          </span>{" "}
          • {hasMounted && <Timeago date={comment?.created_at} />}
        </p>
        <p className="text-sm">{comment?.text}</p>
      </div>
    </div>
  );
}

export default CommentCard;
