import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/slices/store";
import { Toaster } from "react-hot-toast";
// import { ClerkProvider } from "@clerk/clerk-react";

// Import your Publishable Key
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />
        <App />
      </>
    </BrowserRouter>
  </Provider>
    
);
