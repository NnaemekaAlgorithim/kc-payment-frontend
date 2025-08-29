import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getProfile,
  login,
  register,
  forgotPassword,
  resetPassword,
  verifyAccount,
} from "../../services/authService";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useGetProfile = (id) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
  });
};
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
export const useVerifyAccount = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyAccount,
    onSuccess: (res) => {
      toast.success(res?.message || "Account verified successfully!");
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error("Login failed:", err);

      const backend = err?.response?.data;

      const backendMessage =
        backend?.response_data?.errors?.email?.[0] ||
        backend?.response_data?.message ||
        "Login failed. Please try again.";
      toast.error(backendMessage);
    },
  });
};
