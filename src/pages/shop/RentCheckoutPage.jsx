import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import miningProducts from "../../utils/products";

const RentCheckoutPage = () => {
  const { id } = useParams();
  const product = miningProducts.find((p) => p.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    rentDuration: "7",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <h1 className="text-white text-center mt-20">Invalid Product</h1>;

  // Rent price calculation
  const calculateRent = () => {
    const base = Number(product.price.replace(/[^0-9.-]+/g, ""));
    const days = Number(form.rentDuration);

    // Example calculation: 5% of product price * days
    return ((base * 0.05) * days).toFixed(2);
  };

  const validate = () => {
    let temp = {};
    if (!form.name) temp.name = "Name required";
    if (!form.email) temp.email = "Email required";
    if (!form.phone) temp.phone = "Phone required";
    if (!form.address) temp.address = "Address required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleRentSubmit = () => {
    if (!validate()) return;

    const rentData = {
      product,
      customer: form,
      rentAmount: calculateRent(),
    };

    localStorage.setItem("rent_order", JSON.stringify(rentData));

    // Proceed to payment page (next step)
    window.location.href = "/rent-payment";
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-16">
      <h1 className="text-4xl font-bold mb-10">Rent Checkout</h1>

      <div className="grid md:grid-cols-2 gap-16">
        
        {/* Left - Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Customer Details</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className={`w-full p-3 bg-[#0a1628] rounded ${errors.name && "border border-red-500"}`}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            <input
              type="email"
              placeholder="Email"
              className={`w-full p-3 bg-[#0a1628] rounded ${errors.email && "border border-red-500"}`}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <input
              type="text"
              placeholder="Phone Number"
              className={`w-full p-3 bg-[#0a1628] rounded ${errors.phone && "border border-red-500"}`}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}

            <textarea
              placeholder="Address"
              rows="4"
              className={`w-full p-3 bg-[#0a1628] rounded ${errors.address && "border border-red-500"}`}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            ></textarea>
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>

          {/* Rent Duration */}
          <h3 className="text-xl mt-8">Select Rent Duration</h3>
          <select
            className="w-full bg-[#0a1628] p-3 rounded mt-3"
            onChange={(e) => setForm({ ...form, rentDuration: e.target.value })}
          >
            <option value="7">20 Days</option>
            <option value="15">30 Days</option>
            <option value="30">90 Days</option>
          </select>

          {/* Rent Button */}
          <button
            onClick={handleRentSubmit}
            className="mt-8 px-8 py-3 bg-(--primary-color) rounded-lg font-semibold hover:bg-(--primary-color)"
          >
            Proceed to Payment
          </button>
        </div>

        {/* Right - Summary */}
        <div className="bg-[#0a1628] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Rent Summary</h2>

          <div className="flex gap-6">
            <img src={product.image} className="w-32 h-32 object-contain" />
            <div>
              <h3 className="text-xl">{product.name}</h3>
              <p className="text-gray-400 mt-2">Duration: {form.rentDuration} days</p>
            </div>
          </div>

          <hr className="border-gray-700 my-4" />

          <p className="text-xl font-bold">
            Rent Amount: <span className="text-green-400">${calculateRent()}</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RentCheckoutPage;
