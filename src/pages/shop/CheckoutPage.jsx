import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import paymentApi from "../../api/paymentApi";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, reloadCart, loading } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  /* ================= LOAD CART ================= */
  useEffect(() => {
    window.scrollTo(0, 0);
    reloadCart();
  }, []);

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

  /* ================= TOTAL ================= */
  const total = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.qty ?? item.quantity ?? 1);
    return acc + price * quantity;
  }, 0);

  /* ================= PLACE ORDER → START PAYMENT ================= */
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

      // Redirect to payment page with client_secret
      navigate(`/payment?client_secret=${res.data.client_secret}`);

    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Unable to start payment. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const isFormValid =
    form.name && form.email && form.phone && form.address;

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
        {/* ================= BILLING DETAILS ================= */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className={`w-full bg-[#0a1628] p-3 rounded-lg ${
                errors.name ? "border border-red-500" : ""
              }`}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              className={`w-full bg-[#0a1628] p-3 rounded-lg ${
                errors.email ? "border border-red-500" : ""
              }`}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <input
              type="text"
              placeholder="Phone Number"
              className={`w-full bg-[#0a1628] p-3 rounded-lg ${
                errors.phone ? "border border-red-500" : ""
              }`}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}

            <textarea
              placeholder="Shipping Address"
              rows="4"
              className={`w-full bg-[#0a1628] p-3 rounded-lg ${
                errors.address ? "border border-red-500" : ""
              }`}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          <button
            onClick={placeOrder}
            disabled={!isFormValid || processing}
            className={`mt-8 px-8 py-3 rounded-lg text-lg font-semibold transition
              ${
                isFormValid && !processing
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-700 cursor-not-allowed"
              }
            `}
          >
            {processing ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="bg-[#0a1628] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          {cart.length === 0 && (
            <p className="text-gray-400">Your cart is empty</p>
          )}

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-4">
              <p>
                {item.name} × {item.qty ?? item.quantity}
              </p>
              <p>${item.price}</p>
            </div>
          ))}

          <hr className="border-gray-700 my-4" />

          <p className="text-xl font-bold">
            Total:{" "}
            <span className="text-green-400">
              ${total.toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
