import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import useRedirectStore from "@/store/useRedirectStore";
import Loader from "@/components/Loader";

const AuthRoute = ({ element }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();
  const setMessage = useRedirectStore((state) => state.setMessage);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setMessage("⚠️ First login to access content");
    }
  }, [isLoaded, isSignedIn, setMessage]);

  if (!isLoaded) {
    // Auth status still loading, show nothing or loader
    return <Loader />;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return element;
};

export default AuthRoute;
