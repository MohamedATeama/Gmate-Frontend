import axios from "axios";
import cookie from "react-cookies";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = cookie.load("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = cookie.load("refreshToken");
        if (refreshToken) {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            {
              refreshToken,
            },
          );
          const newAccessToken = response.data.data;
          cookie.save("accessToken", newAccessToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60),
          });
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        cookie.remove("accessToken", { path: "/" });
        cookie.remove("refreshToken", { path: "/" });
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
