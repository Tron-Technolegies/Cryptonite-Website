import React from "react";

const ShippingForm = ({
  form,
  setForm,
  errors,
  onSubmit,
  processing,
}) => {
  const isFormValid =
    form.name && form.email && form.phone && form.address;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Billing Details
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className={`w-full bg-[#0a1628] p-3 rounded-lg ${
            errors.name ? "border border-red-500" : ""
          }`}
          value={form.name}
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
          value={form.email}
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
          value={form.phone}
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
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />
        {errors.address && (
          <p className="text-red-500 text-sm">
            {errors.address}
          </p>
        )}
      </div>

      <button
        onClick={onSubmit}
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
  );
};

export default ShippingForm;
