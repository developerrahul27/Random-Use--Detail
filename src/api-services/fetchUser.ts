import axios from "axios";
import type { ApiResponse } from "../types";

const BASE_URL = "https://randomuser.me/api";

export const fetchUserApi = async (): Promise<ApiResponse> => {
  const { data } = await axios.get<ApiResponse>(BASE_URL);
  return data;
};
