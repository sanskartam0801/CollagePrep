import { toast } from "react-hot-toast";

// Shared base styles for all toasts
const baseToastStyle = {
  padding: "14px 16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  width: "300px",
 
};

// Individual styles
export const customPromiseStyles = {
  loading: {
    ...baseToastStyle,
    background: "#f3f4f6", // light gray
    color: "#0f766e", // teal-700
  },
  success: {
    ...baseToastStyle,
    background: "#ecfdf5", // emerald-50
    color: "#047857", // emerald-700
  },
  error: {
    ...baseToastStyle,
    background: "#fee2e2", // red-100
    color: "#b91c1c", // red-700
  },
};

// Show success toast
export const showSuccessToast = (message, options = {}, dismiss = false) => {
  const toastId = toast.success(message, {
    duration: 2000,
    position: "top-right",
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
    position: "top-right",
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
    position: "top-right",
    style: customPromiseStyles.loading,
    ...options,
  });

  if (dismiss) {
    setTimeout(() => toast.dismiss(toastId), 1000);
  }

  return toastId;
};
