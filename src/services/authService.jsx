import { axiosInstance, handleError } from "../utils/axiosinstance";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const login = async (data) => {
  try {
    const response = await axiosInstance.post("v1/users/login/", data);
    const { access_token, refresh_token, user } = response?.data?.data || {};

    if (access_token && user && response?.data?.success) {
      Cookies.set("accessToken", access_token, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("refreshToken", refresh_token, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("userId", user.id, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("user", JSON.stringify(user), {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      toast.success("Login successful!");
      return response.data;
    } else {
      throw new Error("Invalid login response: Token or User is missing.");
    }
  } catch (error) {
    handleError(error, "An unexpected error occurred during login.");
    throw error;
  }
};
export const register = async (data) => {
  console.log(data, "register data in service");

  try {
    const response = await axiosInstance.post("v1/users/register/", data);
    return response.data;
  } catch (error) {
    handleError(error, "Registration failed.");
    throw error;
  }
};
export const forgotPassword = async (data) => {
  try {
    const response = await axiosInstance.post(
      "v1/users/forgot_password/",
      data
    );
    return response.data;
  } catch (error) {
    handleError(error, "Forgot password failed.");
    throw error;
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await axiosInstance.post("v1/users/reset_password/", data);
    return response.data;
  } catch (error) {
    handleError(error, "Reset password failed.");
    throw error;
  }
};
export const verifyAccount = async (data) => {
  try {
    const response = await axiosInstance.post("v1/auth/activate/", data);
    const { access_token, refresh_token, user } = response?.data?.data || {};

    if (access_token && user && response?.data?.success) {
      Cookies.set("accessToken", access_token, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("refreshToken", refresh_token, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("userId", user.id, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("user", JSON.stringify(user), {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      toast.success("Account verified successfully!");
      return response.data;
    } else {
      throw new Error(
        "Invalid verification response: Token or User is missing."
      );
    }
  } catch (error) {
    handleError(error, "Account verification failed.");
    throw error;
  }
};

export const getProfile = async (id) => {
  try {
    const response = await axiosInstance.get(`v1/users/get-user/${id}`);

    if (response.status !== 200) {
      throw new Error("Unable to fetch profile");
    }

    Cookies.set("userProfile", JSON.stringify(response.data));
    const cookieData = Cookies.get("userProfile");
    const profile = cookieData ? JSON.parse(cookieData) : response.data;
    return profile;
  } catch (error) {
    handleError(error, "Failed to fetch user profile.");
    throw error;
  }
};
