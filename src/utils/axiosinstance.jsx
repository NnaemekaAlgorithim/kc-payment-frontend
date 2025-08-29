import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const baseURL =
  import.meta.env.REACT_APP_API_URL || "http://34.44.132.174/dev/api/";

if (!baseURL) {
  throw new Error(
    "No baseURL found. Ensure there is an environment variable called `REACT_APP_API_URL`."
  );
}

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get("accessToken");
    if (authToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${authToken}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login.");
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

export const redirectToLogin = () => {
  toast.error("Session expired. Please login to perform action.");
  Cookies.remove("authToken");
  Cookies.remove("userId");
  Cookies.remove("userProfile");
  window.location.href = "/login";
};

export const handleError = (error, fallbackMessage) => {
  const errorMessage = error?.response?.data?.error?.error || fallbackMessage;
  console.error(error);
  toast.error(errorMessage, {
    toastId: errorMessage,
  });
};
