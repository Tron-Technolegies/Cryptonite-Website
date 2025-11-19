import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

const CheckoutPage = () => {
  const { cart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateFields = () => {
    let tempErrors = {};

    if (!form.name.trim()) tempErrors.name = "Full name is required.";
    if (!form.email.trim()) tempErrors.email = "Email is required.";
    if (!form.phone.trim()) tempErrors.phone = "Phone number is required.";
    if (!form.address.trim()) tempErrors.address = "Address is required.";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const total = cart.reduce((acc, item) => {
    const price = Number(item.price.replace(/[^0-9.-]+/g, ""));
    return acc + price * item.qty;
  }, 0);

  const placeOrder = () => {
    if (!validateFields()) return;

    const orderData = {
      customer: form,
      cart,
      total,
    };

    localStorage.setItem("order", JSON.stringify(orderData));

    alert("Order placed successfully!");
  };

  // disbaling button if no address entered
  const isFormValid = form.name && form.email && form.phone && form.address;

  return (
    <div className="min-h-screen bg-[#000000] text-white px-6 md:px-20 py-16">
      <h1 className="text-4xl font-bold mb-10">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full bg-[#0a1628] p-3 rounded-lg ${
                  errors.name ? "border border-red-500" : ""
                }`}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full bg-[#0a1628] p-3 rounded-lg ${
                  errors.email ? "border border-red-500" : ""
                }`}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Phone Number"
                className={`w-full bg-[#0a1628] p-3 rounded-lg ${
                  errors.phone ? "border border-red-500" : ""
                }`}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* ADDRESS */}
            <div>
              <textarea
                placeholder="Shipping Address"
                className={`w-full bg-[#0a1628] p-3 rounded-lg ${
                  errors.address ? "border border-red-500" : ""
                }`}
                rows="4"
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={!isFormValid}
            className={`mt-8 px-8 py-3 rounded-lg text-lg font-semibold transition-all 
              ${
                isFormValid
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-700 cursor-not-allowed"
              }
            `}
          >
            Place Order
          </button>
        </div>

        <div className="bg-[#0a1628] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-4">
              <p>
                {item.name} x {item.qty}
              </p>
              <p>{item.price}</p>
            </div>
          ))}

          <hr className="border-gray-700 my-4" />

          <p className="text-xl font-bold">
            Total: <span className="text-green-400">${total}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
