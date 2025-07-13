import { toast } from "react-hot-toast";

// Shared base styles for all toasts
// Shared base styles for all toasts
const baseToastStyle = {
  padding: "16px 20px",
  borderRadius: "14px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  fontSize: "15px",
  fontWeight: "500",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  textAlign: "left",
  width: "350px",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
 

  // 🎯 Slide-in effect
  transform: "translateX(100%)",
  animation: "slideInRight 0.4s ease-out forwards",
};

// Individual styles with refined colors and slight gradients
export const customPromiseStyles = {
  loading: {
    ...baseToastStyle,
    background: "linear-gradient(135deg, #e0f2fe, #f0f9ff)",
    color: "#0369a1",
    border: "1px solid #bae6fd",
  },
  success: {
    ...baseToastStyle,
    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
    color: "#15803d",
    border: "1px solid #bbf7d0",
  },
  error: {
    ...baseToastStyle,
    background: "linear-gradient(135deg, #fef2f2, #ffe4e6)",
    color: "#b91c1c",
    border: "1px solid #fecaca",
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
    duration: 100,
    position: "bottom-right",
    style: customPromiseStyles.loading,
    ...options,
  });

  if (dismiss) {
    setTimeout(() => toast.dismiss(toastId), 1000);
  }

  return toastId;
};
