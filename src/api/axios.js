import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  withCredentials: false,
});

// 🔐 Request interceptor (attach token automatically)
API.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(sessionStorage.getItem("auth"));
    const token = auth?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 🚨 Response interceptor (handle 401 globally)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;

    // 🚫 Do NOT auto redirect if the request itself is login
    const isLoginRequest = requestUrl?.includes("/login");

    if (status === 401 && !isLoginRequest) {
      sessionStorage.removeItem("auth");

      // Better than window.location.href
      window.location.replace("/login");
    }

    return Promise.reject(error);
  },
);

export default API;
