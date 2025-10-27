import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest"; // ✅ correct for Vitest
import UserCard from "../UserCard";
import type { DisplayUser } from "../../types";

describe("UserCard Component", () => {
  const mockUser: DisplayUser = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    location: "New York, USA",
  };

  it("renders loading spinner when loading is true", () => {
    render(<UserCard user={null} loading={true} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders user details when user data is provided", () => {
    render(<UserCard user={mockUser} loading={false} />);
    expect(screen.getByText(/Full Name:/i)).toHaveTextContent(
      "Full Name: John Doe"
    );
    expect(screen.getByText(/Email:/i)).toHaveTextContent(
      "Email: john.doe@example.com"
    );
    expect(screen.getByText(/Location:/i)).toHaveTextContent(
      "Location: New York, USA"
    );
  });

  it("renders 'No user data available' when user is null and not loading", () => {
    render(<UserCard user={null} loading={false} />);
    expect(screen.getByText("No user data available.")).toBeInTheDocument();
  });
});
