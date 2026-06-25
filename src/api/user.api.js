import { API } from "./axiosInstance.api";

export const getCurrentUser = () => API.get("/auth/me")