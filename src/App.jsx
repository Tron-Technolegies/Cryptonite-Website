import React from "react";

import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CursorSplash from "./components/common/CursorSplash";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
)

const App = () => {
  return (
    <div>
      <CursorSplash/>
      <Elements stripe={stripePromise}>
      <AppRoutes />
      <ToastContainer
      position="top-right"
      autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
      </Elements>
    </div>
  );
};

export default App;
