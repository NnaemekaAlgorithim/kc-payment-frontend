import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  submitProofOfPayment,
  getTransactions,
} from "../../services/transactionService";

export const useProofOfPayment = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: submitProofOfPayment,
    onSuccess: (res) => {
      toast.success(res?.message || "Proof of payment submitted!");
      //   navigate("/dashboard");
    },
    onError: (err) => {
      console.error("Login failed:", err);

      const backend = err?.response?.data;

      const backendMessage =
        backend?.response_data?.errors?.email?.[0] ||
        backend?.response_data?.message ||
        "transaction failed. Please try again.";
      toast.error(backendMessage);
    },
  });
};

export const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
};
