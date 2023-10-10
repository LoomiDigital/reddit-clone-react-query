import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { mockPost } from "@d20/mocks/getPost";
import { useGetPost } from "@d20/hooks/useGetPost";

import PostPage from "@d20/pages/post/[postId]";
import PostCard from "@d20/components/PostCard";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("1"),
  }),
}));

jest.mock("@d20/hooks/useGetPost");
jest.mock("@d20/components/PostCard");
jest.mock("@d20/components/CommentCard");

const mockGetPost = useGetPost as jest.MockedFunction<typeof useGetPost>;
const queryClient = new QueryClient();

mockGetPost.mockReturnValue({
  post: mockPost,
  isLoading: false,
});

describe("Post component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

    expect(PostCard).toHaveBeenCalledTimes(1);
  });
});
