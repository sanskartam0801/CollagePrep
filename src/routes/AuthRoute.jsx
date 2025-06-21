import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import LoginSignupPage from "@/pages/LoginSignupPage";
import { showErrorToast } from "@/utilities/toastutils";

const AuthRoute = ({ element }) => {
  const location = useLocation();

 

  const token = localStorage.getItem("token");
  // console.log("authrou",token);
  
 
  


 

  // Redirect to /login if not logged in or token is missing
  if ( !token ) {
    showErrorToast("Login Please to access");
    return <LoginSignupPage></LoginSignupPage>;
  }

  // Authenticated: render the protected element
  else
  return element;
};

export default AuthRoute;
