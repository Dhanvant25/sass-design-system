import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const bare = axios.create({ baseURL: BASE_URL });

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

let isRefreshing = false;
let queued = [];

const onRefreshed = (newAccess) => {
  queued.forEach((cb) => cb(newAccess));
  queued = [];
};

axiosInstance.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error?.config;
    const status = error?.response?.status;

    if (status === 401 && !original?._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          queued.push((newAccess) => {
            if (newAccess) {
              original.headers.Authorization = `Bearer ${newAccess}`;
            }
            resolve(axiosInstance(original));
          });
        });
      }

      isRefreshing = true;
      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await bare.post("/api/v1/auth/refresh-token", {
          refreshToken,
        });

        const tokens = data?.data?.tokens || data?.tokens || data;
        const newAccess = tokens?.accessToken;
        const newRefresh = tokens?.refreshToken;

        if (!newAccess) throw new Error("No access token in refresh response");

        Cookies.set("accessToken", newAccess);
        if (newRefresh) Cookies.set("refreshToken", newRefresh);

        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccess}`;

        original.headers.Authorization = `Bearer ${newAccess}`;

        onRefreshed(newAccess);
        return axiosInstance(original);
      } catch (e) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
