import { useState, useEffect, useCallback, useMemo } from "react";
import type { ApiResponse, DisplayUser } from "../types";
import { fetchUserApi } from "../api-services/fetchUser";

export const useUser = () => {
  const [users, setUsers] = useState<DisplayUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const data: ApiResponse = await fetchUserApi();

      if (!data.results || data.results.length === 0) {
        throw new Error("No users found in API response");
      }

      const displayUsers: DisplayUser[] = data.results.map((result) => ({
        fullName: `${result.name.title} ${result.name.first} ${result.name.last}`,
        email: result.email,
        location: `${result.location.city}, ${result.location.street.name}, ${result.location.country}`,
      }));

      localStorage.setItem("users", JSON.stringify(displayUsers));
      setUsers(displayUsers);
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
      setLoading(false);
    } else {
      fetchUser();
    }
  }, [fetchUser]);

  const value = useMemo(
    () => ({ users, loading, fetchUser }),
    [users, loading, fetchUser]
  );

  return value;
};
