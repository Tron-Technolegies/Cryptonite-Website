import { useLocation, useNavigate } from "react-router-dom";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BundleCheckout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.clientSecret) {
    navigate("/");
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Bundle Checkout</h2>

      <div className="mb-6 p-4 border rounded">
        <p className="font-semibold">{state.bundle.name}</p>
        <p>Type: {state.purchaseType}</p>
      </div>

      <Elements stripe={stripePromise} options={{ clientSecret: state.clientSecret }}>
        <PaymentElement />
      </Elements>
    </div>
  );
};

export default BundleCheckout;
