// RedirectMessageListener.jsx
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import useRedirectStore from "@/store/useRedirectStore";

const RedirectMessageListener = () => {
  const message = useRedirectStore((state) => state.message);
  const clearMessage = useRedirectStore((state) => state.clearMessage);

  useEffect(() => {
    if (message) {
      toast.error(message);
      clearMessage();
    }
  }, [message, clearMessage]);

  return null;
};

export default RedirectMessageListener;
