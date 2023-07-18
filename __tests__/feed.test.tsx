import { render } from "@testing-library/react";

import { mockPostConnection } from "@d20/mocks/getPosts";

import Feed from "@d20/components/Feed";
import PostCard from "@d20/components/PostCard";
import { PostLoader } from "@d20/components/Loaders";

jest.mock("@d20/components/PostCard");
jest.mock("@d20/components/Loaders", () => ({
  PostLoader: jest.fn(),
}));

describe("Feed component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle the loading state", async () => {
    render(
      <Feed
        loading={true}
        loadingRef={() => {}}
        posts={mockPostConnection.edges}
      />
    );

    expect(PostLoader).toHaveBeenCalled();
  });

  it("should render the correct number of posts", async () => {
    render(
      <Feed
        loading={false}
        loadingRef={() => {}}
        posts={mockPostConnection.edges}
      />
    );

    expect(PostCard).toHaveBeenCalledTimes(2);
  });
});
