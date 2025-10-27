import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { useUser } from "./hooks/useUser";
import App from "./App";

vi.mock("./hooks/useUser", () => ({
  useUser: vi.fn(),
}));

vi.mock("./components/UserCard", () => ({
  default: () => <div data-testid="mock-user-card">Mock UserCard</div>,
}));

describe("App Component", () => {
  const mockFetchUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading skeletons when loading is true", () => {
    const mockedUseUser = useUser as unknown as ReturnType<typeof vi.fn>;

    mockedUseUser.mockReturnValue({
      users: [],
      loading: true,
      fetchUser: mockFetchUser,
    });

    render(<App />);
    expect(screen.getByText("User Information")).toBeInTheDocument();
  });
});
