import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import paymentApi from "../../../api/paymentApi";
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
import {
  FiArrowLeft,
  FiPlus,
  FiMinus,
  FiTrash2,
} from "react-icons/fi";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

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
        setPaying(false);
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (confirmError) {
        setError(confirmError.message);
        setPaying(false);
      } else {
        onSuccess();
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Payment failed. Please try again.");
      setPaying(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <PaymentElement />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || paying}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {paying ? "Processing Payment..." : "Pay Now"}
      </button>
    </form>
  );
};

/* ================= CHECKOUT PAGE ================= */
const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    cart,
    reloadCart,
    updateQty,       // ✅ correct function
    removeFromCart,
    loading,
  } = useCart();

  const mode = location.state?.mode;       // buy / rent
  const buyType = location.state?.buyType; // ship / host

  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updatingItem, setUpdatingItem] = useState(null);

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
        sum +
        Number(item.product?.price || 0) *
          Number(item.quantity || 1),
      0
    );
  }, [cart]);

  /* ================= QUANTITY HANDLERS ================= */
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdatingItem(itemId);
    try {
      await updateQty(itemId, newQuantity); // ✅ FIXED
      await reloadCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert("Failed to update quantity. Please try again.");
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (!confirm("Remove this item from cart?")) return;

    setUpdatingItem(itemId);
    try {
      await removeFromCart(itemId);
      await reloadCart();
      if (cart.length === 1) navigate("/cart");
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item. Please try again.");
    } finally {
      setUpdatingItem(null);
    }
  };

  /* ================= CREATE PAYMENT ================= */
  const createPaymentIntent = async (data) => {
    setProcessing(true);
    setError(null);

    try {
      // HOSTING
      if (mode === "buy" && buyType === "host") {
        const hostingRes = await hostingApi.createHostingRequest(data);

        const paymentRes = await paymentApi.createPaymentIntent({
          purchase_type: "hosting",
          hosting_request_id:
            hostingRes.data.hosting_request_id,
        });

        setClientSecret(paymentRes.data.client_secret);
        return;
      }

      // BUY (SHIP)
      if (mode === "buy" && buyType === "ship") {
        const res =
          await paymentApi.createPaymentIntent({
            purchase_type: "buy",
            address: data.address,
          });

        setClientSecret(res.data.client_secret);
        return;
      }

      // RENT
      if (mode === "rent") {
        const durationDays =
          data.rental_details.duration_months * 30;

        const product = cart[0]?.product;
        const monthlyPrice = Math.round(
          Number(product?.price || 0) / 12
        );

        const totalAmount =
          monthlyPrice *
          data.rental_details.quantity *
          data.rental_details.duration_months;

        const res =
          await paymentApi.createPaymentIntent({
            purchase_type: "rent",
            product_id:
              data.rental_details.product_id,
            quantity:
              data.rental_details.quantity,
            duration_days: durationDays,
            amount: totalAmount,
            rental_details:
              data.rental_details,
          });

        setClientSecret(res.data.client_secret);
      }
    } catch (err) {
      console.error("Payment intent error:", err);
      setError(
        err.response?.data?.message ||
          "Unable to create payment."
      );
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <PaymentSuccess />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 border rounded-full"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-semibold">
          Checkout
        </h1>
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white border rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Order Summary
        </h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 pb-4 border-b"
          >
            <img
              src={getImageUrl(item.product?.image)}
              className="w-16 h-16 object-contain bg-gray-50 rounded"
            />

            <div className="flex-1">
              <p className="font-medium">
                {item.product?.model_name}
              </p>
              <p className="text-sm text-gray-500">
                $
                {Number(
                  item.product?.price
                ).toFixed(2)}{" "}
                each
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleUpdateQuantity(
                    item.id,
                    item.quantity - 1
                  )
                }
                disabled={
                  item.quantity <= 1 ||
                  updatingItem === item.id ||
                  clientSecret
                }
              >
                <FiMinus />
              </button>

              <span className="px-3">
                {updatingItem === item.id
                  ? "..."
                  : item.quantity}
              </span>

              <button
                onClick={() =>
                  handleUpdateQuantity(
                    item.id,
                    item.quantity + 1
                  )
                }
                disabled={
                  updatingItem === item.id ||
                  clientSecret
                }
              >
                <FiPlus />
              </button>

              <button
                onClick={() =>
                  handleRemoveItem(item.id)
                }
                className="text-red-500"
                disabled={clientSecret}
              >
                <FiTrash2 />
              </button>
            </div>

            <p className="font-semibold text-green-600">
              $
              {(
                item.product.price *
                item.quantity
              ).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="flex justify-between mt-4 text-lg font-semibold">
          <span>Total</span>
          <span className="text-green-600">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* DETAILS FORM */}
      {!clientSecret && (
        <div className="bg-white border rounded-2xl p-6 mb-8">
          {mode === "buy" && buyType === "ship" && (
            <ShippingForm
              onContinue={createPaymentIntent}
              loading={processing}
            />
          )}

          {mode === "buy" && buyType === "host" && (
            <HostForm
              onContinue={createPaymentIntent}
              loading={processing}
            />
          )}

          {mode === "rent" && (
            <RentForm
              cart={cart}
              onContinue={createPaymentIntent}
              loading={processing}
            />
          )}

          {error && (
            <p className="text-red-500 text-center mt-4">
              {error}
            </p>
          )}
        </div>
      )}

      {/* PAYMENT */}
      {clientSecret && (
        <div className="bg-white border rounded-2xl p-6">
          <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <PaymentForm
              onSuccess={() =>
                setSuccess(true)
              }
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
