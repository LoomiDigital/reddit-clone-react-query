import { render, screen } from "@testing-library/react";

import { mockComment } from "@d20/mocks/getComments";

import CommentCard from "@d20/components/CommentCard";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("CommentCard component", () => {
  const queryClient = new QueryClient();

  it("should render a comment correctly", async () => {
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
          <CommentCard comment={mockComment} />
        </QueryClientProvider>
      </SessionProvider>
    );

    expect(await screen.findByText("An amazing comment")).toBeInTheDocument();
    expect(await screen.findByText("aUser")).toBeInTheDocument();
  });
});
