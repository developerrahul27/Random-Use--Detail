import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { useUser } from "../useUser";
import { fetchUserApi } from "../../api-services/fetchUser";
import type { ApiResponse } from "../../types";

vi.mock("../../api-services/fetchUser", () => ({
  fetchUserApi: vi.fn(),
}));

describe("useUser hook", () => {
  const mockResponse: ApiResponse = {
    results: [
      {
        name: { title: "Mr", first: "John", last: "Doe" },
        email: "john.doe@example.com",
        location: {
          city: "New York",
          state: "NY",
          street: { number: 123, name: "Main St" },
          country: "USA",
          postcode: "10001",
        },
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should load users from localStorage if available", () => {
    const storedUsers = [
      { fullName: "Mr John Doe", email: "john@example.com", location: "NY" },
    ];
    localStorage.setItem("users", JSON.stringify(storedUsers));

    const { result } = renderHook(() => useUser());

    expect(result.current.users).toEqual(storedUsers);
    expect(result.current.loading).toBe(false);
  });

  it("should call fetchUserApi if no users are in localStorage", async () => {
    (
      fetchUserApi as jest.MockedFunction<typeof fetchUserApi>
    ).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useUser());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await result.current.fetchUser();
    });

    waitFor(() => {
      expect(fetchUserApi).toHaveBeenCalledTimes(1);
    });

    expect(result.current.users[0].fullName).toBe("Mr John Doe");
    expect(result.current.loading).toBe(false);
  });

  it("should handle API errors gracefully", async () => {
    (
      fetchUserApi as jest.MockedFunction<typeof fetchUserApi>
    ).mockRejectedValueOnce(new Error("Network Error"));

    const { result } = renderHook(() => useUser());

    await act(async () => {
      await result.current.fetchUser();
    });

    waitFor(() => {
      expect(fetchUserApi).toHaveBeenCalledTimes(1);
    });
    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
});
