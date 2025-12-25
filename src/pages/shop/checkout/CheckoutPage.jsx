import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import paymentApi from "../../../api/paymentApi";
import rentApi from "../../../api/rentApi";
import hostingApi from "../../../api/hostingApi";
import { getImageUrl } from "../../../utils/imageUtils";

import ShippingForm from "./components/ShippingForm";
import HostForm from "./components/HostForm";
import RentForm from "./components/RentForm";
import PaymentSuccess from "./components/PaymentSuccess";

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FiArrowLeft } from "react-icons/fi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

/* ================= PAYMENT FORM ================= */
const PaymentForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setPaying(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message);
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (confirmError) {
        setError(confirmError.message);
      } else {
        onSuccess();
      }
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <PaymentElement />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        disabled={!stripe || paying}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
      >
        {paying ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

/* ================= CHECKOUT PAGE ================= */
const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, reloadCart, loading } = useCart();

  const mode = location.state?.mode;       // buy / rent
  const buyType = location.state?.buyType; // ship / host

  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    reloadCart();
  }, []);

  useEffect(() => {
    if (!mode) navigate("/products");
  }, [mode, navigate]);

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum + Number(item.product?.price || 0) * Number(item.quantity || 1),
      0
    );
  }, [cart]);

  /* ================= CREATE PAYMENT ================= */
  const createPaymentIntent = async (data) => {
    setProcessing(true);
    setError(null);

    try {
      // ================= HOSTING =================
      if (mode === "buy" && buyType === "host") {
        const hostingRes = await hostingApi.createHostingRequest(data);

        const paymentRes = await paymentApi.createPaymentIntent({
          purchase_type: "hosting",
          hosting_request_id: hostingRes.data.hosting_request_id,
        });

        setClientSecret(paymentRes.data.client_secret);
        return;
      }

      // ================= BUY (SHIP) =================
      if (mode === "buy" && buyType === "ship") {
        const res = await paymentApi.createPaymentIntent({
          purchase_type: "buy",
          address: data.address,
        });

        setClientSecret(res.data.client_secret);
        return;
      }

      // ================= RENT =================
      if (mode === "rent") {
        const res = await paymentApi.createPaymentIntent({
          purchase_type: "rent",
          duration_days: data.duration_days,
        });

        setClientSecret(res.data.client_secret);
      }
    } catch (err) {
      console.error(err.response?.data || err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Unable to create payment intent"
      );
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (success) return <PaymentSuccess />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 border rounded-full">
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-semibold">Checkout</h1>
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white border rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4">
            <img
              src={getImageUrl(item.product?.image)}
              className="w-16 h-16 object-contain bg-gray-50 rounded"
            />
            <div className="flex-1">
              <p className="font-medium">{item.product?.model_name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-green-600">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="border-t pt-4 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-green-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* DETAILS FORM */}
      {!clientSecret && (
        <div className="bg-white border rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">
            {mode === "rent"
              ? "Rental Details"
              : buyType === "host"
              ? "Hosting Details"
              : "Shipping Details"}
          </h2>

          {mode === "buy" && buyType === "ship" && (
            <ShippingForm onContinue={createPaymentIntent} loading={processing} />
          )}

          {mode === "buy" && buyType === "host" && (
            <HostForm onContinue={createPaymentIntent} loading={processing} />
          )}

          {mode === "rent" && (
            <RentForm
              cart={cart}
              onContinue={createPaymentIntent}
              loading={processing}
            />
          )}

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
        </div>
      )}

      {/* PAYMENT */}
      {clientSecret && (
        <div className="bg-white border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Payment</h2>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm onSuccess={() => setSuccess(true)} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
