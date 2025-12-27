import React, { useMemo, useState } from "react";
import { FiBox } from "react-icons/fi";

const RentForm = ({ cart = [], onContinue, loading }) => {
  const item = cart?.[0];

  const product = item?.product || null;
  const bundle = item?.bundle || null;

  const basePrice = product?.price || bundle?.price || 0;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    quantity: "1",
    duration: "3",
  });

  const [errors, setErrors] = useState({});

  /* ================= PRICE CALCULATION ================= */
  const monthlyPrice = useMemo(() => {
    if (!basePrice) return 0;
    return Math.round(Number(basePrice) / 12);
  }, [basePrice]);

  const totalPrice = useMemo(() => {
    return monthlyPrice * Number(form.quantity) * Number(form.duration);
  }, [monthlyPrice, form.quantity, form.duration]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const err = {};
    if (!form.firstName) err.firstName = "Required";
    if (!form.lastName) err.lastName = "Required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) err.email = "Valid email required";
    if (!form.phone) err.phone = "Phone required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onContinue({
      rental_details: {
        product_id: product?.id || null,
        bundle_id: bundle?.id || null,
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* HEADER */}
      <div className="text-center">
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-4 py-1 rounded-full mb-2">
          Renting {product?.model_name || bundle?.name}
        </span>
        <h3 className="text-xl font-semibold">Rental Details</h3>
      </div>

      {/* PERSONAL INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="input border p-2"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="input border p-2"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input border p-2"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="input border p-2"
        />
      </div>

      {/* RENT OPTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Quantity</label>
          <select name="quantity" value={form.quantity} onChange={handleChange} className="input">
            {[1, 2, 3, 4, 5].map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Duration</label>
          <select name="duration" value={form.duration} onChange={handleChange} className="input">
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-green-50 p-5 rounded-xl border border-green-200">
        <div className="flex justify-between">
          <span>Monthly</span>
          <span>${monthlyPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Quantity</span>
          <span>{form.quantity}</span>
        </div>
        <div className="flex justify-between">
          <span>Duration</span>
          <span>{form.duration} months</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-green-700">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
      >
        {loading ? "Processing..." : "Continue to Payment"}
      </button>
    </form>
  );
};

export default RentForm;
