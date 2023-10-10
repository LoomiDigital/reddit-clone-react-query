import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { mockPost } from "@d20/mocks/getPost";
import { mockComments } from "@d20/mocks/getComments";

import { useComments } from "@d20/hooks/useComments";
import { useAddVote } from "@d20/hooks/useAddVote";

import PostCard from "@d20/components/PostCard";

jest.mock("@d20/hooks/useComments");
jest.mock("@d20/hooks/useAddVote");

const queryClient = new QueryClient();

const mockUseComments = useComments as jest.MockedFunction<typeof useComments>;

const mockUseAddVote = useAddVote as jest.MockedFunction<typeof useAddVote>;

const mockVoteResponse = {
  updateVote: jest.fn(),
  displayVotes: 1,
  vote: true,
};

mockUseComments.mockReturnValue({
  ...jest.requireActual("@d20/hooks/useComments"),
  comments: mockComments?.commentsByPostId,
  isLoading: false,
});

mockUseAddVote.mockReturnValue({
  ...mockVoteResponse,
});

describe("PostCard component", () => {
  it("should render a post correctly", async () => {
    const { getByText } = render(
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
          <PostCard post={mockPost} />
        </QueryClientProvider>
      </SessionProvider>
    );

    expect(getByText("This is a test post")).toBeInTheDocument();
  });

  it("should handle an upvote", async () => {
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
          <PostCard post={mockPost} />
        </QueryClientProvider>
      </SessionProvider>
    );

    const upvoteButton = await screen.findByTitle("upvote");

    expect((await screen.findByTitle("votes")).innerHTML).toBe("1");
    expect(upvoteButton.parentElement).toHaveClass("text-red-400");
  });

  it("should handle a downvote", async () => {
    mockUseAddVote.mockReturnValue({
      ...mockVoteResponse,
      displayVotes: -1,
      vote: false,
    });

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
          <PostCard post={mockPost} />
        </QueryClientProvider>
      </SessionProvider>
    );

    const downButton = screen.getByTitle("downvote");

    expect((await screen.findByTitle("votes")).innerHTML).toBe("-1");
    expect(downButton.parentElement).toHaveClass("text-blue-400");
  });

  it("should display the correct number of comments", async () => {
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
          <PostCard post={mockPost} />
        </QueryClientProvider>
      </SessionProvider>
    );

    expect(await screen.findByText("2 Comments")).toBeInTheDocument();
  });
});
