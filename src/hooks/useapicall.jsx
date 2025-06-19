import { showErrorToast, showLoadingToast, showSuccessToast } from "@/utilities/toastutils";
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

      // const errMessage =
      //   axios.isAxiosError(error) && error.response?.data?.message
      //     ? "Some error occured try again"
      //     : "An error occurred while processing your request.";

      showErrorToast(error.response?.data?.message);
      console.error("API Error:", error);
    }

  }

  return apiCall;
};

export default useApiHandler;
