import { render, screen } from "@testing-library/react";
import { RepositoryList } from "../RepositoryList";
import { useQuery } from "@tanstack/react-query";
import { vi } from "vitest";

vi.mock("@tanstack/react-query");

describe("RepositoryList", () => {
  it("shows loading state", () => {
    (useQuery as any).mockReturnValue({ isLoading: true });
    render(<RepositoryList username="octocat" />);
    expect(screen.getByText(/loading repositories/i)).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useQuery as any).mockReturnValue({
      isError: true,
      error: { message: "API error" },
    });
    render(<RepositoryList username="octocat" />);
    expect(screen.getByText(/api error/i)).toBeInTheDocument();
  });

  it("shows empty state", () => {
    (useQuery as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [],
    });
    render(<RepositoryList username="octocat" />);
    expect(screen.getByText(/no public repositories/i)).toBeInTheDocument();
  });

  it("shows repo items", () => {
    (useQuery as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        {
          id: 1,
          name: "repo",
          stargazers_count: 1,
          html_url: "url",
          updated_at: "2023-01-01T00:00:00Z",
        },
      ],
    });
    render(<RepositoryList username="octocat" />);
    expect(screen.getByText(/repo/i)).toBeInTheDocument();
  });
});
