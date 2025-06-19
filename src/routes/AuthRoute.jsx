import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const AuthRoute = ({ element }) => {
  const location = useLocation();


  const token = localStorage.getItem("token");
  // console.log("authrou",token);
  
 
  


  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Redirect to /login if not logged in or token is missing
  if ( token==null) {
    return <Navigate to="/login" />;
  }

  // Authenticated: render the protected element
  return element;
};

export default AuthRoute;
