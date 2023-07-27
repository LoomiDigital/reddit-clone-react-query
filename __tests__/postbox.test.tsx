import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import { SessionProvider } from "next-auth/react";
import { toast } from "react-hot-toast";

import { useAddPost } from "@d20/hooks/useAddPost";

import Postbox from "@d20/components/Postbox";

jest.mock("@d20/hooks/useAddPost");

const mockAddPost = useAddPost as jest.MockedFunction<typeof useAddPost>;

const addPost = jest.fn();
const addSubreddit = jest.fn();

mockAddPost.mockImplementation(() => ({
  addPost: addPost,
  addSubreddit: addSubreddit,
}));

describe("Postbox Component", () => {
  const toastSuccess = jest.spyOn(toast, "success");
  const toastLoading = jest.spyOn(toast, "loading");
  const queryClient = new QueryClient();

  it("should call submitPost on form submission", async () => {
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
          <Postbox />
        </QueryClientProvider>
      </SessionProvider>
    );

    const postTitleInput = screen.getByPlaceholderText(
      "Create a post by entering a title!"
    );
    const imageOpenIcon = screen.getByTitle("Add an image");

    fireEvent.click(imageOpenIcon);

    await userEvent.type(postTitleInput, "This is a new post");

    const postSubredditInput = screen.getByPlaceholderText("i.e. r/nextjs");
    const postBodyInput = screen.getByPlaceholderText("Text (optional)");
    const imageInput = screen.getByPlaceholderText("Image URL");

    await userEvent.type(postSubredditInput, "testsubreddit");
    await userEvent.type(imageInput, "https://via.placeholder.com/150");
    await userEvent.type(postBodyInput, "A brand new post!");

    const postButton = await screen.getByRole("button", {
      name: "Create Post",
    });

    fireEvent.click(postButton);

    await waitFor(() => {
      expect(toastLoading).toHaveBeenCalledWith("Creating post...");
    });
  });
});
