import axios from "axios";

export const API = axios.create({
    baseURL: "https://tripgenie-9yhp.onrender.com/api/v1",
    withCredentials: true
})

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)