import { axiosInstance, handleError } from "../utils/axiosinstance";

export const updateUserProfile = async (data) => {
  try {
    const response = await axiosInstance.put("/v1/users/update_profile/", {
      first_name: data.first_name,
      last_name: data.last_name,
    });
    console.log(response, "response from updateUserProfile");
    return response.data;
  } catch (error) {
    handleError(error, "Failed to update profile");
    throw error;
  }
};
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/v1/users/profile/");
    console.log(response, "response from getUserProfile");
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch profile");
    throw error;
  }
};

export const getUserNotification = async () => {
  try {
    const response = await axiosInstance.get("/notifications/");
    console.log(response, "response from getNoitification");
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch Notification");
    throw error;
  }
};
