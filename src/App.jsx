import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader"; // Loader component

import Home from "./pages/Home";
import Main from "./pages/Main";
import Reading from "./pages/Reading";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";

import AuthRoute from "@/routes/AuthRoute";
import FormProtectedRoute from "./routes/FormProtectedRoute";

import RedirectMessageListener from "@/components/RedirectMessageListener";
import LoginSignupPage from "./pages/LoginSignupPage";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading (e.g., for assets, auth check, etc.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<AuthRoute element={<Main />} />} />
          <Route
            path="/reading"
            element={
              <AuthRoute
                element={<FormProtectedRoute element={<Reading />} />}
              />
            }
          />
          <Route path="/upload" element={<AuthRoute element={<Upload />} />} />
          <Route path="/contact" element={<AuthRoute element={<Contact />} />} />
          <Route path="/login" element={<LoginSignupPage />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        toastClassName="text-sm"
        bodyClassName="p-2"
      />
      <RedirectMessageListener />
    </div>
  );
};

export default App;
