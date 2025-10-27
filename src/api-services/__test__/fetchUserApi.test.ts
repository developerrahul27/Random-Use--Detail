/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import { ApiResponse } from "../../types";
import { fetchUserApi } from "../fetchUser";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchUserApi", () => {
  const mockResponse: ApiResponse = {
    results: [
      {
        name: { title: "Mr", first: "John", last: "Doe" },
        email: "john.doe@example.com",
        location: {
          city: "New York",
          country: "USA",
        } as any,
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch user data successfully", async () => {
    (
      mockedAxios.get as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce({ data: mockResponse });

    const result = await fetchUserApi();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("https://randomuser.me/api");
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when API call fails", async () => {
    (
      mockedAxios.get as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValueOnce(new Error("Network Error"));

    await expect(fetchUserApi()).rejects.toThrow("Network Error");
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
