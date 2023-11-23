import { API_URL } from "@/config/config";
import axios from "axios";
import jwtDecode from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode<{ exp: number }>(token || "null");
    if (decodedToken) {
      if (decodedToken.exp * 1000 > new Date().getTime()) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
