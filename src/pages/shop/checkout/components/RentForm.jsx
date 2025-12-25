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
    duration: "3",
  });

  const [errors, setErrors] = useState({});

  /* ================= ESTIMATED PRICE (UI ONLY) ================= */
  const estimatedMonthly = useMemo(() => {
    if (!product?.price) return 0;
    return Math.round(Number(product.price) / 12);
  }, [product]);

  const estimatedTotal = useMemo(() => {
    return (
      estimatedMonthly *
      Number(form.quantity) *
      Number(form.duration)
    );
  }, [estimatedMonthly, form.quantity, form.duration]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";

    if (!form.email.trim()) {
      newErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.phone.trim()) newErrors.phone = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onContinue({
      rental_details: {
        product_id: product.id,
        quantity: Number(form.quantity),
        duration_months: Number(form.duration),
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* HEADER */}
      <div className="text-center">
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-4 py-1 rounded-full mb-2">
          Renting {product?.model_name}
        </span>
        <h3 className="text-xl font-semibold">Rental Details</h3>
        <p className="text-sm text-gray-500 mt-1">
          Enter your details to continue with rental
        </p>
      </div>

      {/* PERSONAL DETAILS */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700">
          Personal Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className={`input ${errors.firstName && "border-red-500"}`}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className={`input ${errors.lastName && "border-red-500"}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className={`input ${errors.email && "border-red-500"}`}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className={`input ${errors.phone && "border-red-500"}`}
          />
        </div>
      </div>

      {/* RENT OPTIONS */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700">
          Rental Configuration
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Quantity
            </label>
            <select
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="input"
            >
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q} value={q}>
                  {q} Unit{q > 1 && "s"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Rental Duration
            </label>
            <select
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="input"
            >
              <option value="1">1 Month</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">12 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* ESTIMATED SUMMARY */}
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center gap-2 mb-4">
          <FiBox className="text-green-600" />
          <h4 className="font-semibold text-green-700">
            Estimated Cost Summary
          </h4>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Monthly estimate</span>
            <span>${estimatedMonthly}</span>
          </div>

          <div className="flex justify-between">
            <span>Units</span>
            <span>{form.quantity}</span>
          </div>

          <div className="flex justify-between">
            <span>Duration</span>
            <span>{form.duration} months</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between text-base font-semibold">
            <span>Total estimate</span>
            <span className="text-green-700">
              ${estimatedTotal.toLocaleString()}
            </span>
          </div>

          {/* <p className="text-xs text-gray-600 mt-2">
            This amount is an estimate. Final pricing is securely calculated
            on the server during checkout.
          </p> */}
        </div>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
      >
        {loading ? "Processing..." : "Continue to Payment"}
      </button>
    </form>
  );
};

export default RentForm;
