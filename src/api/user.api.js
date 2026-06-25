import { API } from "./axiosInstance.api";

export const getCurrentUser = async () => {
    const { data } = await API.get("/auth/me");
    return data.user;
};