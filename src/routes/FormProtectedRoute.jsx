import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "@clerk/clerk-react";
import useFormStore from "@/store/useFormStore";
// import useRedirectStore from "@/store/useRedirectStore";
import Loader from "@/components/Loader";
import { showErrorToast } from "@/utilities/toastutils";

const FormProtectedRoute = ({ element }) => {
  // const { isSignedIn, isLoaded } = useAuth();
  const formFilled = useFormStore((state) => state.formFilled);
  console.log("formFilled",formFilled);
  
  const location = useLocation();
  // const setMessage = useRedirectStore((state) => state.setMessage);

  // useEffect(() => {
  //   if (isLoaded) {
  //     if (!isSignedIn) {
  //       setMessage("⚠️ First login to access content");
  //     } else if (!formFilled) {
  //       setMessage("⚠️ First fill out details on main page.");
  //     }
  //   }
  // }, [isSignedIn, isLoaded, formFilled, setMessage]);

  // Show loader while Clerk is checking auth state
  // if (!isLoaded) {
  //   return <Loader />;
  // }

  // After Clerk loads, enforce auth logic
  // if (!isSignedIn) {
  //   return <Navigate to="/" replace state={{ from: location }} />;
  // }

  if (!formFilled) {
    showErrorToast("You Need to fill Form to access Read Page")
    return <Navigate to="/main"  />;
  }

  return element;
};

export default FormProtectedRoute;
