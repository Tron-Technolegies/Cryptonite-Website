import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import paymentApi from "../../../api/paymentApi";
import rentApi from "../../../api/rentApi";
import { getImageUrl } from "../../../utils/imageUtils";

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
import { FiArrowLeft } from "react-icons/fi";

/* ---------------- STRIPE ---------------- */
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, reloadCart, loading } = useCart();

  /* ---------------- STATE ---------------- */
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(null); // buy | rent
  const [buyType, setBuyType] = useState(null); // ship | host
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [rentalData, setRentalData] = useState(null); // Store rental details for after payment

  /* ---------------- LOAD CART ---------------- */
  useEffect(() => {
    reloadCart();
  }, []);

  /* ---------------- CART TOTAL ---------------- */
  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum +
        Number(item.product?.price || 0) *
          Number(item.quantity || 1),
      0
    );
  }, [cart]);

  /* ---------------- STEP CLICK HANDLER ---------------- */
  const handleStepChange = (targetStep) => {
    // allow only backward navigation
    if (targetStep < step) {
      setStep(targetStep);
    }
  };

  /* ---------------- START PAYMENT (BUY MODE) ---------------- */
  const startPayment = async (data = {}) => {
    setProcessing(true);
    setError(null);

    try {
      // Build base payload
      const payload = {
        purchase_type: mode,
        items: cart.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
      };

      // Add mode-specific data
      if (mode === "buy") {
        payload.delivery_type = buyType;
        
        // For shipping, add address at root level
        if (buyType === "ship" && data.address) {
          payload.address = data.address;
        }
        
        // For hosting, add hosting details
        if (buyType === "host" && data.hosting_details) {
          payload.hosting_details = data.hosting_details;
        }
      }

      // For rent, add rental details and store them for later
      if (mode === "rent" && data.rental_details) {
        payload.rental_details = data.rental_details;
        
        // Store rental data to create rental record after payment
        setRentalData(data.rental_details);
      }

      console.log("Payment payload:", payload);

      const res = await paymentApi.createPaymentIntent(payload);

      if (!res?.data?.client_secret) {
        throw new Error("Invalid payment response");
      }

      setClientSecret(res.data.client_secret);
      setStep(4);
    } catch (err) {
      console.error("Payment error:", err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Unable to start payment"
      );
    } finally {
      setProcessing(false);
    }
  };

  /* ---------------- HANDLE PAYMENT SUCCESS ---------------- */
  const handlePaymentSuccess = async () => {
    // If it's a rental, create the rental record in database
    if (mode === "rent" && rentalData) {
      try {
        setProcessing(true);
        
        // Calculate duration in days (months * 30)
        const durationDays = rentalData.duration_months * 30;
        
        // Calculate amount paid (monthly price * duration * quantity)
        const monthlyPrice = Math.round(Number(cart[0]?.product?.price) / 12);
        const amountPaid = monthlyPrice * rentalData.duration_months * rentalData.quantity;

        // Call rent API to save rental in database
        await rentApi.rentMiner({
          product_id: rentalData.product_id,
          duration_days: durationDays,
          amount_paid: amountPaid,
        });

        console.log("Rental record created successfully");
      } catch (err) {
        console.error("Failed to create rental record:", err);
        // Don't show error to user since payment succeeded
        // Just log it for debugging
      } finally {
        setProcessing(false);
      }
    }

    // Move to success step
    setStep(5);
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
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full border hover:bg-gray-100"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-semibold josefin-sans">Checkout</h1>
      </div>

      {/* ================= ORDER SUMMARY ================= */}
      <div className="bg-white border rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={getImageUrl(item.product?.image)}
                alt={item.product?.model_name}
                className="w-16 h-16 object-contain bg-gray-50 rounded-lg p-2"
              />

              <div className="flex-1">
                <p className="font-medium">
                  {item.product?.model_name}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold text-green-600">
                $
                {(
                  Number(item.product?.price) *
                  Number(item.quantity)
                ).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-4 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-green-600">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* ================= CHECKOUT FLOW ================= */}
      <div className="border rounded-2xl p-6 bg-white">
        <StepIndicator
          step={step}
          onStepChange={handleStepChange}
        />

        {/* STEP 1 */}
        {step === 1 && (
          <BuyOrRent
            price={total}
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

        {/* STEP 2 */}
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

        {/* STEP 3 */}
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
            onContinue={startPayment}
            loading={processing}
          />
        )}

        {/* STEP 4 */}
        {step === 4 && clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <PaymentSection
              onSuccess={handlePaymentSuccess}
            />
          </Elements>
        )}

        {/* STEP 5 */}
        {step === 5 && <PaymentSuccess />}
      </div>
    </div>
  );
};

export default CheckoutPage;