import axios from "axios";
import { USER_ITEM } from "./constants";
import { logOutUser } from "../redux/actions";
import store from "../redux/store";

export const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en",
    "Content-Language": "en",
  },
  withCredentials: true, // ✅ Send refresh token cookies automatically
});

// 🔒 Add access token to requests
API.interceptors.request.use(
  async function (config) {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    config.headers["Authorization"] = `Bearer ${userData.accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 🔁 Refresh logic
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
      console.log("hi i am expired");
    }
  });
  failedQueue = [];
};

const refreshAccessToken = async () => {
  try {
    console.log("Refreshing access token...");
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}auth/refresh`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log("response data", response.data);
    const { accessToken } = response.data;

    // Update token in localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.accessToken = accessToken;
    localStorage.setItem(USER_ITEM, JSON.stringify(user));

    return accessToken;
  } catch (err) {
    console.error("Refresh token expired. Logging out...", err);
    store.dispatch(logOutUser());
    return null;
  }
};

// 🔁 Response interceptor with retry
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("hrlo world");
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      //console.log("API(originalRequest)", API(originalRequest));
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(API(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        processQueue(null, newToken);
        isRefreshing = false;

        if (newToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return API(originalRequest);
        }
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
