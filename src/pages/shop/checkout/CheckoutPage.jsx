import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "../../../context/CartContext";
import paymentApi from "../../../api/paymentApi";

import OrderSummary from "./components/OrderSummary";
import StepIndicator from "./components/StepIndicator";
import BuyOrRent from "./components/BuyOrRent";
import BuyOptions from "./components/BuyOptions";
import ShippingForm from "./components/ShippingForm";
import HostForm from "./components/HostForm";
import RentForm from "./components/RentForm";
import PaymentSection from "./components/PaymentSection";
import PaymentSuccess from "./components/PaymentSuccess";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

/* ---------------- STRIPE ---------------- */
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const CheckoutPage = () => {
  const { cart, reloadCart, loading } = useCart();

  /* ---------------- STATE ---------------- */
  const [step, setStep] = useState(1); // 1 → 5
  const [mode, setMode] = useState(null); // buy | rent
  const [buyType, setBuyType] = useState(null); // ship | host
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  /* ---------------- LOAD CART ---------------- */
  useEffect(() => {
    reloadCart();
  }, []);

  /* ---------------- CART TOTAL ---------------- */
  const total = useMemo(() => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce(
      (sum, item) =>
        sum + Number(item.product?.price || 0) * Number(item.quantity || 1),
      0
    );
  }, [cart]);

  /* ---------------- START STRIPE PAYMENT ---------------- */
  const startPayment = async (data = {}) => {
    setProcessing(true);
    setError(null);

    try {
      if (!cart || cart.length === 0) {
        throw new Error("Cart is empty");
      }

      const payload = {
        purchase_type: mode, // buy | rent
        delivery_type: buyType || null,
        items: cart.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
        ...data,
      };

      console.log("Creating payment intent:", payload);

      const res = await paymentApi.createPaymentIntent(payload);

      if (!res?.data?.client_secret) {
        throw new Error("Invalid payment response");
      }

      setClientSecret(res.data.client_secret);
      setStep(4);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Unable to start payment"
      );
    } finally {
      setProcessing(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600">
        Loading checkout…
      </div>
    );
  }

  /* ---------------- EMPTY CART ---------------- */
  if (!cart || cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <a
          href="/products"
          className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Browse Products
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* ================= HEADER ================= */}
      <h1 className="text-xl font-semibold mb-6">Order summary</h1>

      <OrderSummary cart={cart} reloadCart={reloadCart} />

      {/* ================= ERROR ================= */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg my-4">
          {error}
        </div>
      )}

      {/* ================= FLOW ================= */}
      <div className="border rounded-xl p-6 mt-10 bg-white">
        <StepIndicator step={step} />

        {/* STEP 1 – BUY OR RENT */}
        {step === 1 && (
          <BuyOrRent
            cart={cart}
            onBuy={() => {
              setMode("buy");
              setStep(2);
            }}
            onRent={() => {
              setMode("rent");
              setStep(3);
            }}
          />
        )}

        {/* STEP 2 – SHIP / HOST */}
        {step === 2 && mode === "buy" && (
          <BuyOptions
            onShip={() => {
              setBuyType("ship");
              setStep(3);
            }}
            onHost={() => {
              setBuyType("host");
              setStep(3);
            }}
          />
        )}

        {/* STEP 3 – FORMS */}
        {step === 3 && mode === "buy" && buyType === "ship" && (
          <ShippingForm
            onContinue={startPayment}
            loading={processing}
          />
        )}

        {step === 3 && mode === "buy" && buyType === "host" && (
          <HostForm
            onContinue={startPayment}
            loading={processing}
          />
        )}

        {step === 3 && mode === "rent" && (
          <RentForm
            cart={cart}
            onContinue={startPayment} // ✅ rent also goes through Stripe
            loading={processing}
          />
        )}

        {/* STEP 4 – STRIPE PAYMENT (FIXED JSX) */}
        {step === 4 && clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <PaymentSection onSuccess={() => setStep(5)} />
          </Elements>
        )}

        {/* STEP 5 – SUCCESS */}
        {step === 5 && <PaymentSuccess />}
      </div>
    </div>
  );
};

export default CheckoutPage;
