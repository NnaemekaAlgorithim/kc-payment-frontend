import { axiosInstance, handleError } from "../utils/axiosInstance";

export const submitProofOfPayment = async (data) => {
  try {
    const formData = new FormData();

    // append normal fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    const response = await axiosInstance.post("transactions", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response, "response from submit proof of payment");
    return response.data;
  } catch (error) {
    handleError(error, "Failed to submit proof of payment");
    throw error;
  }
};

export const getTransactions = async () => {
  const response = await axiosInstance.get("/transactions/");
  return response.data;
};
