import { toast } from "react-hot-toast";

// Shared base styles for all toasts
const baseToastStyle = {
  padding: "14px 16px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb", // subtle border
  fontSize: "14px",
  textAlign: "center",
  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
  width: "320px",
};

// Individual styles with refined colors
export const customPromiseStyles = {
  loading: {
    ...baseToastStyle,
    background: "#e0f2fe", // sky-100
    color: "#0369a1", // sky-700
    border: "1px solid #bae6fd", // sky-200
  },
  success: {
    ...baseToastStyle,
    background: "#f0fdf4", // green-50
    color: "#15803d", // green-700
    border: "1px solid #bbf7d0", // green-200
  },
  error: {
    ...baseToastStyle,
    background: "#fef2f2", // rose-50
    color: "#b91c1c", // red-700
    border: "1px solid #fecaca", // red-200
  },
};

// Show success toast
export const showSuccessToast = (message, options = {}, dismiss = false) => {
  const toastId = toast.success(message, {
    duration: 2000,
    position: "bottom-right",
    style: customPromiseStyles.success,
    ...options,
  });

  if (dismiss) {
    setTimeout(() => toast.dismiss(toastId), 1000);
  }

  return toastId;
};

// Show error toast
export const showErrorToast = (message, options = {}, dismiss = false) => {
  const toastId = toast.error(message, {
    duration: 3000,
    position: "bottom-right",
    style: customPromiseStyles.error,
    ...options,
  });

  if (dismiss) {
    setTimeout(() => toast.dismiss(toastId), 1000);
  }

  return toastId;
};

// Show loading toast
export const showLoadingToast = (message, options = {}, dismiss = false) => {
  const toastId = toast.loading(message, {
    duration: 2000,
    position: "bottom-right",
    style: customPromiseStyles.loading,
    ...options,
  });

  if (dismiss) {
    setTimeout(() => toast.dismiss(toastId), 1000);
  }

  return toastId;
};
