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

/* ================= BUNDLE OFFER POPUP (COMPACT) ================= */
const BundleOfferPopupCompact = ({ open, onClose }) => {
  if (!open) return null;

  const handleChatClick = () => {
    window.open(
      "https://wa.me/919999999999?text=Hi%20I%20am%20interested%20in%20your%20bundle%20offers",
      "_blank"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 left-full ml-[-56px] z-20 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-800 transition shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white -mt-12 pt-14">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">Exclusive Bundle Offers</h3>
          </div>
          <p className="text-green-50">Ordering more than 5? We have Special offers for you</p>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Benefits Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6 ml-20">
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Save More</h4>
              <p className="text-xs text-gray-600">Up to 15% off</p>
            </div>

            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Premium Support</h4>
              <p className="text-xs text-gray-600">Priority setup</p>
            </div>

            {/* <div className="text-center p-3 bg-purple-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Free Extras</h4>
              <p className="text-xs text-gray-600">Cables & cooling</p>
            </div> */}
          </div>

          {/* Special Offer Banner */}
          {/* <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-4 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎉</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">Limited Time Offer</h4>
                <p className="text-sm text-gray-700">
                  Orders of 5+ miners qualify for special bundle pricing. Our team will create a custom package for you!
                </p>
              </div>
            </div>
          </div> */}

          {/* CTA Button */}
          <button
            onClick={handleChatClick}
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3.5 text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Chat with our team
          </button>

          {/* Trust Indicators */}
          {/* <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span>
              <span>Instant Response</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span>
              <span>Custom Pricing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span>
              <span>No Obligation</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FiArrowLeft, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

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

  const { cart, reloadCart, updateQty, removeFromCart, loading } = useCart();

  const mode = location.state?.mode;
  const buyType = location.state?.buyType;

  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [showBundlePopup, setShowBundlePopup] = useState(false);
  const getItemPrice = (item) => {
    if (item?.product?.price) return Number(item.product.price);
    if (item?.bundle?.price) return Number(item.bundle.price);
    return 0;
  };

  const getItemTitle = (item) => {
    if (item?.product?.model_name) return item.product.model_name;
    if (item?.bundle?.name) return item.bundle.name;
    return "Item";
  };

  const getItemImage = (item) => {
    return item?.product?.image || item?.bundle?.image || "/placeholder.png";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    reloadCart();
  }, []);

  useEffect(() => {
    if (!mode) navigate("/products");
  }, [mode, navigate]);

  // Calculate total quantity in cart
  const totalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  }, [cart]);

  // Show bundle popup when total quantity is 5 or more
  useEffect(() => {
    if (totalQuantity >= 5 && !clientSecret) {
      setShowBundlePopup(true);
    }
  }, [totalQuantity, clientSecret]);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = getItemPrice(item);
      return sum + price * item.quantity;
    }, 0);
  }, [cart]);

  /* ================= QUANTITY HANDLERS ================= */
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdatingItem(itemId);
    try {
      await updateQty(itemId, newQuantity);
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
      // ==========================
      // HOSTING FLOW
      // ==========================
      if (mode === "buy" && buyType === "host") {
        // ✅ ENSURE CART HAS ITEMS
        if (!cart.length) {
          throw new Error("Cart is empty. Please add item again.");
        }

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

      // Get the primary cart item (assume single item for rent flows)
      const primaryItem = cart[0];
      if (!primaryItem) {
        throw new Error("Cart is empty. Please add an item.");
      }

      // BUY/SHIP
      if (mode === "buy" && buyType === "ship") {
        const res = await paymentApi.createPaymentIntent({
          purchase_type: "buy",
          address: data.address,
        });

        setClientSecret(res.data.client_secret);
        return;
      }

      // RENT
      if (mode === "rent") {
        const rentBody = {
          purchase_type: "rent",
          quantity: data.rental_details.quantity,
          duration_days: data.rental_details.duration_months * 30,
        };

        // Add item reference for product or bundle
        if (primaryItem.product) {
          rentBody.product_id = primaryItem.product.id;
        } else if (primaryItem.bundle) {
          rentBody.bundle_id = primaryItem.bundle.id;
        }

        const res = await paymentApi.createPaymentIntent(rentBody);

        setClientSecret(res.data.client_secret);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <PaymentSuccess />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Bundle Offer Popup */}
      <BundleOfferPopupCompact open={showBundlePopup} onClose={() => setShowBundlePopup(false)} />

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

        {cart
          .filter((item) => item?.product || item?.bundle)
          .map((item) => {
            const price = getItemPrice(item);
            const title = getItemTitle(item);
            const image = getItemImage(item);

            return (
              <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
                <img
                  src={getImageUrl(image)}
                  className="w-16 h-16 object-contain bg-gray-50 rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-gray-500">€{price.toFixed(2)} each</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1 || updatingItem === item.id}
                  >
                    <FiMinus />
                  </button>

                  <span className="px-3">{item.quantity}</span>

                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    disabled={updatingItem === item.id}
                  >
                    <FiPlus />
                  </button>

                  <button onClick={() => handleRemoveItem(item.id)} className="text-red-500">
                    <FiTrash2 />
                  </button>
                </div>

                <p className="font-semibold text-green-600">
                  €{(price * item.quantity).toFixed(2)}
                </p>
              </div>
            );
          })}

        <div className="flex justify-between mt-4 text-lg font-semibold">
          <span>Total</span>
          <span className="text-green-600">€{total.toFixed(2)}</span>
        </div>
      </div>

      {/* DETAILS FORM */}
      {!clientSecret && (
        <div className="bg-white border rounded-2xl p-6 mb-8">
          {mode === "buy" && buyType === "ship" && (
            <ShippingForm onContinue={createPaymentIntent} loading={processing} />
          )}

          {mode === "buy" && buyType === "host" && (
            <HostForm onContinue={createPaymentIntent} loading={processing} />
          )}

          {mode === "rent" && (
            <RentForm cart={cart} onContinue={createPaymentIntent} loading={processing} />
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
