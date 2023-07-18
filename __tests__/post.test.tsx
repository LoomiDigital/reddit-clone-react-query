import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { mockPost } from "@d20/mocks/getPost";
import { mockComments } from "@d20/mocks/getComments";
import { mockAddComment } from "@d20/mocks/addComment";

import { useGetComments } from "@d20/hooks/useGetComments";
import { useGetPost } from "@d20/hooks/useGetPost";
import { useAddComment } from "@d20/hooks/useAddComment";

import PostPage from "@d20/pages/post/[postId]";
import PostCard from "@d20/components/PostCard";
import { CommentLoader } from "@d20/components/Loaders";

jest.mock("@d20/components/Loaders", () => ({
  CommentLoader: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("1"),
  }),
}));

jest.mock("@d20/hooks/useGetPost");
jest.mock("@d20/hooks/useGetComments");
jest.mock("@d20/hooks/useAddComment");

jest.mock("@d20/components/PostCard");

const mockGetPost = useGetPost as jest.MockedFunction<typeof useGetPost>;

const mockGetComments = useGetComments as jest.MockedFunction<
  typeof useGetComments
>;

const mockAddCommentMutation = useAddComment as jest.MockedFunction<
  typeof useAddComment
>;

const queryClient = new QueryClient();

describe("Post component", () => {
  mockAddCommentMutation.mockImplementation(() => ({
    addComment: jest.fn(),
    incomingComment: {} as any,
    optimisticRender: false,
    setOptimisticRender: jest.fn(),
  }));

  mockGetPost.mockImplementation(() => ({
    postData: { getPost: mockPost },
    isLoading: false,
  }));

  mockGetComments.mockImplementation(() => ({
    commentsData: { commentsByPostId: [] },
    isLoading: true,
  }));

  it("should display the loader during the loading state", async () => {
    render(
      <SessionProvider
        session={{
          expires: "2021-10-10",
          user: {
            name: "Buck",
            expires: "2021-10-10",
            email: "user@test.com",
            address: "123 Fake St",
            image: "https://via.placeholder.com/150",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <PostPage />
        </QueryClientProvider>
      </SessionProvider>
    );

    expect(CommentLoader).toHaveBeenCalled();
  });

  it("should render the correct number of comments", async () => {
    mockGetComments.mockImplementation(() => ({
      commentsData: mockComments,
      isLoading: false,
    }));

    render(
      <SessionProvider
        session={{
          expires: "2021-10-10",
          user: {
            name: "Buck",
            expires: "2021-10-10",
            email: "user@test.com",
            address: "123 Fake St",
            image: "https://via.placeholder.com/150",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <PostPage />
        </QueryClientProvider>
      </SessionProvider>
    );

    expect(await screen.findAllByText("aUser")).toHaveLength(2);
  });

  it("should render the PostCard component", async () => {
    render(
      <SessionProvider
        session={{
          expires: "2021-10-10",
          user: {
            name: "Buck",
            expires: "2021-10-10",
            email: "user@test.com",
            address: "123 Fake St",
            image: "https://via.placeholder.com/150",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <PostPage />
        </QueryClientProvider>
      </SessionProvider>
    );

    expect(PostCard).toHaveBeenCalled();
  });

  it("should render a new comment", async () => {
    mockAddCommentMutation.mockImplementation(() => ({
      addComment: jest.fn(),
      incomingComment: mockAddComment,
      optimisticRender: true,
      setOptimisticRender: jest.fn(),
    }));

    render(
      <SessionProvider
        session={{
          expires: "2021-10-10",
          user: {
            name: "Buck",
            expires: "2021-10-10",
            email: "user@test.com",
            address: "123 Fake St",
            image: "https://via.placeholder.com/150",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <PostPage />
        </QueryClientProvider>
      </SessionProvider>
    );

    expect(
      await screen.findByText("This is a new comment")
    ).toBeInTheDocument();
  });
});
