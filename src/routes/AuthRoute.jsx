import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginSignupPage from "@/pages/LoginSignupPage";
import { showErrorToast } from "@/utilities/toastutils";
import { clearLogoutFlag } from "@/redux/slices/Authslice";

const AuthRoute = ({ element }) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const justLoggedOut = useSelector((state) => state.auth.justLoggedOut);

  const hasShownToast = useRef(false);

  useEffect(() => {
    // Run only once when not logged in
    if (!isLoggedIn) {
      if (justLoggedOut) {
        // Reset the logout flag after handling
        dispatch(clearLogoutFlag(false));
      } else if (!hasShownToast.current) {
        hasShownToast.current = true;
      }
    } else {
      // Reset toast flag when user logs in
      hasShownToast.current = false;
    }
  }, [isLoggedIn, justLoggedOut, dispatch]);

  if (!isLoggedIn) {
    
        showErrorToast("Login Please to access");
    return <LoginSignupPage />;
  }

  return element;
};

export default AuthRoute;
