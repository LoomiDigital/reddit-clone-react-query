import { QueryClient } from "@tanstack/react-query";
import { fireEvent, waitFor } from "@testing-library/react";

import {
  GetPostsByTopicQuery,
  GetPostsQuery,
  PostAttributesFragment,
  useGetPostsByTopicQuery,
  useGetPostsQuery,
} from "@d20/generated/graphql";

import { useAddPost } from "@d20/hooks/useAddPost";
import { mockPost } from "@d20/mocks/getPost";
import { mockPosts, mockPostsByQuery } from "@d20/mocks/getPosts";

import { renderWithClient } from "@d20/utils/testUtils";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn().mockReturnValue({
    data: {
      expires: "2021-10-10",
      user: {
        name: "Buck",
        expires: "2021-10-10",
        email: "user@test.com",
        address: "123 Fake St",
        image: "https://via.placeholder.com/150",
      },
    },
  }),
}));

jest.mock("graphql-request");

const GraphQLClient = require("graphql-request").GraphQLClient;
GraphQLClient.mockImplementation(() => ({
  request: jest.fn(),
}));

describe("useAddPost hook", () => {
  it("should update the correct query in cache with a new post when AddPost is called with no subreddit argument", async () => {
    const Page = () => {
      const { addPost } = useAddPost();

      const { posts } = queryClient.getQueryData<GetPostsQuery>(
        useGetPostsQuery.getKey()
      ) as GetPostsQuery;

      const { title, body, image, username, subreddit_id, subreddit_topic } =
        mockPost as PostAttributesFragment;

      return (
        <div>
          <div>
            {posts?.edges.map(({ node }) => (
              <div key={node?.id}>{node?.title}</div>
            ))}
          </div>
          <button
            onClick={() =>
              addPost({
                title,
                body: body!,
                image: image!,
                username,
                subreddit_id,
                subreddit_topic,
              })
            }
          >
            addPost
          </button>
        </div>
      );
    };

    const queryClient = new QueryClient();

    queryClient.setQueryData(useGetPostsQuery.getKey(), mockPosts);

    const { getByText } = renderWithClient(queryClient, <Page />);

    await waitFor(() => {
      fireEvent.click(getByText("addPost"));
    });

    const queryData = queryClient.getQueryData(
      useGetPostsQuery.getKey()
    ) as GetPostsQuery;

    expect(getByText("This is a test post")).toBeInTheDocument();
    expect(queryData.posts?.edges.length).toEqual(3);
  });

  it("should update the correct query in cache with a new post when AddPost is called with a subreddit argument", async () => {
    const Page = ({ subreddit }: { subreddit: string }) => {
      const { addPost } = useAddPost(subreddit);

      const { postsByTopic } = queryClient.getQueryData<GetPostsByTopicQuery>(
        useGetPostsByTopicQuery.getKey({ topic: subreddit })
      ) as GetPostsByTopicQuery;

      const { title, body, image, username, subreddit_id, subreddit_topic } =
        mockPost as PostAttributesFragment;

      return (
        <div>
          <div>
            {postsByTopic?.edges.map(({ node }) => (
              <div key={node?.id}>{node?.title}</div>
            ))}
          </div>
          <button
            onClick={() =>
              addPost({
                title,
                body: body!,
                image: image!,
                username,
                subreddit_id,
                subreddit_topic,
              })
            }
          >
            addPost
          </button>
        </div>
      );
    };

    const queryClient = new QueryClient();

    queryClient.setQueryData(
      useGetPostsByTopicQuery.getKey({ topic: "testSub" }),
      mockPostsByQuery
    );

    const { getByText } = renderWithClient(
      queryClient,
      <Page subreddit="testSub" />
    );

    await waitFor(() => {
      fireEvent.click(getByText("addPost"));
    });

    const queryData = queryClient.getQueryData(
      useGetPostsByTopicQuery.getKey({ topic: "testSub" })
    ) as GetPostsByTopicQuery;

    expect(getByText("This is a test post")).toBeInTheDocument();
    expect(queryData.postsByTopic?.edges.length).toEqual(3);
  });
});
