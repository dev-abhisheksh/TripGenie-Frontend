import { API } from "./axiosInstance.api";

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const logoutUser = () => API.post("/auth/logout");
export const updateProfile = (formData) => API.put("/auth/profile", formData, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
});