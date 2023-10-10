import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { render } from "@testing-library/react";

import { PostConnection } from "@d20/generated/graphql";
import { mockPosts } from "@d20/mocks/getPosts";
import { useGetPosts } from "@d20/hooks/useGetPosts";

import Feed from "@d20/components/Feed";
import Home from "@d20/pages";

jest.mock("@d20/hooks/useGetPosts");
jest.mock("@d20/components/Feed");

const mockGetPosts = useGetPosts as jest.MockedFunction<typeof useGetPosts>;
const queryClient = new QueryClient();

describe("The index page", () => {
  it("should render the feed component when post data is returned", async () => {
    mockGetPosts.mockReturnValue({
      ...jest.requireActual("@d20/hooks/useGetPosts"),
      posts: mockPosts.posts as PostConnection,
      fetchMore: jest.fn(),
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
          <Home />
        </QueryClientProvider>
      </SessionProvider>
    );

    expect(Feed).toHaveBeenCalled();
  });
});
