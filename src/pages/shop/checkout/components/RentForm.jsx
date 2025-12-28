import React, { useMemo, useState } from "react";

const RentForm = ({ cart = [], onContinue, loading }) => {
  const item = cart?.[0];

  const product = item?.product || null;
  const bundle = item?.bundle || null;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    quantity: "1",
    duration: "3", // months
  });

  const [errors, setErrors] = useState({});

  /* ================= BACKEND-EQUIVALENT RENT CALCULATION ================= */
  const rentCalculation = useMemo(() => {
    if (!product?.power || !product?.hosting_fee_per_kw) return null;

    const powerWatts = Number(product.power);
    const powerKw = powerWatts / 1000;

    const hostingFeePerKw = Number(product.hosting_fee_per_kw);

    const durationDays = Number(form.duration) * 30;
    const quantity = Number(form.quantity);

    // Backend logic replica
    const monthlyCost = powerKw * hostingFeePerKw;
    const dailyCost = monthlyCost / 30.5;
    const singleTotal = dailyCost * durationDays;
    const grandTotal = singleTotal * quantity;

    return {
      powerKw: powerKw.toFixed(2),
      dailyCost: dailyCost.toFixed(2),
      durationDays,
      quantity,
      grandTotal: grandTotal.toFixed(2),
    };
  }, [
    product?.power,
    product?.hosting_fee_per_kw,
    form.duration,
    form.quantity,
  ]);

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
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      err.email = "Valid email required";
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
          className="border p-2 rounded"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      {/* RENT OPTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Quantity</label>
          <select
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Duration</label>
          <select
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-green-50 p-5 rounded-xl border border-green-200">
        {rentCalculation ? (
          <>
            <div className="flex justify-between">
              <span>Power Usage</span>
              <span>{rentCalculation.powerKw} kW</span>
            </div>
            <div className="flex justify-between">
              <span>Daily Cost</span>
              <span>${rentCalculation.dailyCost}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration</span>
              <span>{rentCalculation.durationDays} days</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity</span>
              <span>{rentCalculation.quantity}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-green-700">
              <span>Total</span>
              <span>${rentCalculation.grandTotal}</span>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-600">
            Rent will be calculated based on machine power and hosting cost.
          </p>
        )}
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
