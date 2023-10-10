import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { mockPost } from "@d20/mocks/getPost";
import { mockComments } from "@d20/mocks/getComments";
import { mockAddComment } from "@d20/mocks/addComment";

import { useComments } from "@d20/hooks/useComments";

import Comments from "@d20/components/Comments";
import CommentCard from "@d20/components/CommentCard";
import { CommentLoader } from "@d20/components/Loaders";

jest.mock("@d20/components/Loaders", () => ({
  CommentLoader: jest.fn(),
}));

jest.mock("@d20/hooks/useComments");
jest.mock("@d20/components/CommentCard");

const mockUseComments = useComments as jest.MockedFunction<typeof useComments>;
const queryClient = new QueryClient();

describe("Comments component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should display the loader during the loading state", async () => {
    mockUseComments.mockReturnValue({
      ...jest.requireActual("@d20/hooks/useComments"),
      register: jest.fn(),
      isLoading: true,
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
          <Comments post={mockPost} />
        </QueryClientProvider>
      </SessionProvider>
    );

    expect(CommentLoader).toHaveBeenCalled();
  });

  it("should render the correct number of comments", async () => {
    mockUseComments.mockReturnValue({
      ...jest.requireActual("@d20/hooks/useComments"),
      register: jest.fn(),
      comments: mockComments?.commentsByPostId,
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
          <Comments post={mockPost} />
        </QueryClientProvider>
      </SessionProvider>
    );

    expect(CommentCard).toHaveBeenCalledTimes(2);
  });

  it("should optimistically render a new comment", async () => {
    mockUseComments.mockReturnValue({
      ...jest.requireActual("@d20/hooks/useComments"),
      register: jest.fn(),
      incomingComment: mockAddComment,
      optimisticRender: true,
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
          <Comments post={mockPost} />
        </QueryClientProvider>
      </SessionProvider>
    );

    expect(CommentCard).toHaveBeenCalledTimes(1);
  });
});
