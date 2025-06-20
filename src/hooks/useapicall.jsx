import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "@/utilities/toastutils";
import { axiosInstance } from "../utilities/axiosinstance";
import toast from "react-hot-toast";
import axios from "axios";

const useApiHandler = () => {
  async function apiCall(url, method, data = null) {
    // Show loading toast
    const loadingToast = showLoadingToast(" Please wait...");

    try {
      const res = await axiosInstance.request({
        url,
        method,
        ...(data && { data }),
      });

      // Dismiss loading toast and optionally show success
      toast.dismiss(loadingToast);

      if (res?.data?.status_code === 200 || res?.data?.success) {
        const successMessage =
          res?.data?.message || "OPERATION COMPLETED SUCCESSFULLY";
        showSuccessToast(successMessage);
        return res;
      } else {
        const errMessage = res?.data?.message || "Unexpected Error";
        showErrorToast(errMessage);
      }
    } catch (error) {
      toast.dismiss(loadingToast);

      let errorMessage = "An error occurred while processing your request.";

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      showErrorToast(errorMessage);
      console.error("API Error:", errorMessage, error);
    }
    
 
  }
   return apiCall;

};

export default useApiHandler;
