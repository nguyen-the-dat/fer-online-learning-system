import React from "react";
import AppRoutes from "./routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TestImage } from "./components/testimage";
import  useScrollToTop  from "../src/hooks/useScrollToTop";
function App() {
  useScrollToTop();

  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* <TestImage/> */}
    </>
  );
}

export default App;
