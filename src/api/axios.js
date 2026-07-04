import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  withCredentials: false,
});

// 🔐 Request interceptor (attach token automatically)
API.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;

    const isLoginRequest = requestUrl?.includes("/login");

    if (status === 401 && !isLoginRequest) {
      localStorage.removeItem("auth");
      // Better than window.location.href
      window.location.replace("/login");
    }

    return Promise.reject(error);
  },
);

export default API;
