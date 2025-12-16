import React, { useEffect, useState, useMemo } from "react";
import { useCart } from "../../../context/CartContext";
import paymentApi from "../../../api/paymentApi";

import ShippingForm from "./components/ShippingForm";
import OrderSummary from "./components/OrderSummary";
import PaymentSection from "./components/PaymentSection";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const CheckoutPage = () => {
  const { cart, reloadCart, loading } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState("details"); // details | payment
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    reloadCart();
  }, []);

  /* ================= TOTAL ================= */
  const total = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.qty ?? item.quantity ?? 1);
      return acc + price * qty;
    }, 0);
  }, [cart]);

  /* ================= VALIDATION ================= */
  const validateFields = () => {
    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Full name is required";
    if (!form.email.trim()) tempErrors.email = "Email is required";
    if (!form.phone.trim()) tempErrors.phone = "Phone number is required";
    if (!form.address.trim()) tempErrors.address = "Address is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  /* ================= CREATE PAYMENT INTENT ================= */
  const placeOrder = async () => {
    if (!validateFields()) return;

    try {
      setProcessing(true);

      const res = await paymentApi.createPaymentIntent({
        purchase_type: "buy",
        address: {
          name: form.name,
          line1: form.address,
          city: "N/A",
          state: "N/A",
          postal_code: "000000",
          country: "IN",
        },
      });

      setClientSecret(res.data.client_secret);
      setStep("payment");
    } catch (err) {
      console.error("Payment intent error:", err?.response?.data || err);
      alert("Unable to start payment");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading checkout...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-16">
      <h1 className="text-4xl font-bold mb-10">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-16">
        {/* LEFT */}
        <div>
          <ShippingForm
            form={form}
            setForm={setForm}
            errors={errors}
            onSubmit={placeOrder}
            processing={processing}
            disabled={step === "payment"}
          />

          {step === "payment" && clientSecret && (
            <div className="mt-10">
              <Elements
                stripe={stripePromise}
                options={{ clientSecret }}
              >
                <PaymentSection />
              </Elements>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <OrderSummary cart={cart} total={total} />
      </div>
    </div>
  );
};

export default CheckoutPage;
