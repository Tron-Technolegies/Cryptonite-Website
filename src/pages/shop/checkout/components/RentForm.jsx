import React, { useMemo, useState } from "react";
import { FiBox } from "react-icons/fi";

const RentForm = ({ cart = [], onContinue, loading }) => {
  const product = cart?.[0]?.product;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    quantity: "1",
    duration: "3", // months
  });

  /* ---------------- PRICE (STABLE VERSION) ---------------- */
  const monthlyPrice = useMemo(() => {
    if (!product?.price) return 0;
    return Math.round(Number(product.price) / 12);
  }, [product]);

  const totalMonthly = useMemo(() => {
    return monthlyPrice * Number(form.quantity);
  }, [monthlyPrice, form.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onContinue({
      rental_details: {
        product_id: product.id,
        quantity: Number(form.quantity),
        duration_months: Number(form.duration),
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          Renting {product?.model_name}
        </span>
        <h3 className="text-xl font-semibold">Complete Your Order</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="1">1 Unit</option>
          <option value="2">2 Units</option>
          <option value="3">3 Units</option>
        </select>

        <select
          name="duration"
          value={form.duration}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="1">1 Month</option>
          <option value="3">3 Months</option>
          <option value="6">6 Months</option>
          <option value="12">12 Months</option>
        </select>
      </div>

      <div className="bg-gray-50 p-5 rounded-xl border">
        <div className="flex items-center gap-2 mb-3">
          <FiBox className="text-green-600" />
          <h4 className="font-semibold">Order Summary</h4>
        </div>

        <div className="flex justify-between text-sm">
          <span>{product?.model_name} × {form.quantity}</span>
          <span>${totalMonthly}/month</span>
        </div>

        <div className="flex justify-between text-sm mt-2">
          <span>Minimum term</span>
          <span>{form.duration} months</span>
        </div>

        <div className="flex justify-between mt-4 text-lg font-semibold">
          <span>Total</span>
          <span className="text-green-600">${totalMonthly}/month</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
      >
        Submit Rental Request
      </button>
    </form>
  );
};

export default RentForm;
