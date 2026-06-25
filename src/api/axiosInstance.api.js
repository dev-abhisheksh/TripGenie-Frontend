import axios from "axios";

export const API = axios.create({
    baseURL: "https://tripgenie-9yhp.onrender.com/api/v1",
    withCredentials: true
})