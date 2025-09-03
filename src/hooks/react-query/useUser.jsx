import { useMutation, useQuery } from "@tanstack/react-query";
import {
  updateUserProfile,
  getUserProfile,
  getUserNotification,
} from "../../services/userService";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      console.log("✅ Profile updated successfully:", data);
    },
    onError: (error) => {
      console.error("❌ Failed to update profile:", error);
    },
  });
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: 1,
    refetchOnMount: "always",
    staleTime: 3,
  });
};

export const useGetNotification = () => {
  return useQuery({
    queryKey: ["userNotification"],
    queryFn: getUserNotification,
    retry: 1, // retry once on failure
  });
};
