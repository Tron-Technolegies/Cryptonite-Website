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
import BundleOfferPopup from "../../../components/common/BundleOfferPopup";

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FiArrowLeft, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

/* ================= SMALL LOADER ================= */
const QtyLoader = () => (
  <span className="inline-block w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
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
  const { cart, reloadCart, updateQty, removeFromCart, loading } = useCart();

  const mode = location.state?.mode;
  const buyType = location.state?.buyType;

  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [showBundlePopup, setShowBundlePopup] = useState(false);

  /* ================= POPUP LOGIC ================= */
  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [cart]
  );

  useEffect(() => {
    if (totalQuantity >= 5 && !clientSecret) {
      setShowBundlePopup(true);
    }
  }, [totalQuantity, clientSecret]);

  const getItemPrice = (item) =>
    Number(item?.product?.price || item?.bundle?.price || 0);

  const getItemTitle = (item) =>
    item?.product?.model_name || item?.bundle?.name || "Item";

  const getItemImage = (item) =>
    item?.product?.image || item?.bundle?.image || "/placeholder.png";

  useEffect(() => {
    window.scrollTo(0, 0);
    reloadCart();
  }, []);

  useEffect(() => {
    if (!mode) navigate("/products");
  }, [mode, navigate]);

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + getItemPrice(i) * i.quantity, 0),
    [cart]
  );

  /* ================= QTY HANDLERS ================= */
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1 || updatingItem === itemId) return;

    setUpdatingItem(itemId);
    try {
      await updateQty(itemId, newQuantity);
      await reloadCart();
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
    } finally {
      setUpdatingItem(null);
    }
  };

  /* ================= CREATE PAYMENT ================= */
  const createPaymentIntent = async (data) => {
    setProcessing(true);
    setError(null);

    try {
      if (mode === "buy" && buyType === "host") {
        const hostingRes = await hostingApi.createHostingRequest({
          phone: data.phone,
          message: data.message,
          hosting_location: data.hosting_location,
        });

        const paymentRes = await paymentApi.createPaymentIntent({
          purchase_type: "hosting",
          hosting_request_id: hostingRes.data.hosting_request_id,
        });

        setClientSecret(paymentRes.data.client_secret);
        return;
      }

      if (mode === "buy" && buyType === "ship") {
        const res = await paymentApi.createPaymentIntent({
          purchase_type: "buy",
          address: data.address,
        });

        setClientSecret(res.data.client_secret);
        return;
      }

      if (mode === "rent") {
        const res = await paymentApi.createPaymentIntent({
          purchase_type: "rent",
          duration_days: data.rental_details.duration_months * 30,
        });

        setClientSecret(res.data.client_secret);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (success) return <PaymentSuccess />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <BundleOfferPopup
        open={showBundlePopup}
        onClose={() => setShowBundlePopup(false)}
      />

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 border rounded-full">
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-semibold">Checkout</h1>
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white border rounded-2xl p-5 mb-6">
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

        {cart.map((item) => {
          const price = getItemPrice(item);
          const title = getItemTitle(item);
          const image = getItemImage(item);

          return (
            <div
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-3 py-3 border-b items-center"
            >
              <img
                src={getImageUrl(image)}
                className="w-16 h-16 object-contain bg-gray-50 rounded"
                alt={title}
              />

              <div className="min-w-0">
                <p className="font-medium truncate">{title}</p>
                <p className="text-sm text-gray-500">
                  €{price.toFixed(2)} each
                </p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1 || updatingItem === item.id}
                    className="p-1 border rounded w-8 h-8 flex items-center justify-center"
                  >
                    {updatingItem === item.id ? <QtyLoader /> : <FiMinus />}
                  </button>

                  <span className="w-6 text-center text-sm">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    disabled={updatingItem === item.id}
                    className="p-1 border rounded w-8 h-8 flex items-center justify-center"
                  >
                    {updatingItem === item.id ? <QtyLoader /> : <FiPlus />}
                  </button>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 ml-1"
                    disabled={updatingItem === item.id}
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <p className="text-sm font-semibold text-green-600">
                  €{(price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}

        <div className="flex justify-between mt-3 text-base font-semibold">
          <span>Total</span>
          <span className="text-green-600">€{total.toFixed(2)}</span>
        </div>
      </div>

      {/* DETAILS FORM */}
      {!clientSecret && (
        <div className="bg-white border rounded-2xl p-6 mb-6">
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
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      )}

      {/* PAYMENT */}
      {clientSecret && (
        <div className="bg-white border rounded-2xl p-6">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm onSuccess={() => setSuccess(true)} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
