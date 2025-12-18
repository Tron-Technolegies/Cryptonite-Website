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

  const [errors, setErrors] = useState({});

  /* ---------------- PRICE CALCULATION ---------------- */
  const monthlyPrice = useMemo(() => {
    if (!product?.price) return 0;
    return Math.round(Number(product.price) / 12);
  }, [product]);

  const totalMonthly = useMemo(() => {
    return monthlyPrice * Number(form.quantity);
  }, [monthlyPrice, form.quantity]);

  const totalAmount = useMemo(() => {
    return totalMonthly * Number(form.duration);
  }, [totalMonthly, form.duration]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* HEADER */}
      <div className="text-center">
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          Renting {product?.model_name}
        </span>
        <h3 className="text-xl font-semibold">Complete Your Order</h3>
      </div>

      {/* NAME FIELDS */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            name="firstName"
            value={form.firstName}
            placeholder="First Name"
            onChange={handleChange}
            className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <input
            name="lastName"
            value={form.lastName}
            placeholder="Last Name"
            onChange={handleChange}
            className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* EMAIL & PHONE */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        
        <div>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            placeholder="Phone"
            onChange={handleChange}
            className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* QUANTITY & DURATION */}
      <div className="grid grid-cols-2 gap-4">
        <select
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="1">1 Unit</option>
          <option value="2">2 Units</option>
          <option value="3">3 Units</option>
          <option value="4">4 Units</option>
          <option value="5">5 Units</option>
        </select>

        <select
          name="duration"
          value={form.duration}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="1">1 Month</option>
          <option value="3">3 Months</option>
          <option value="6">6 Months</option>
          <option value="12">12 Months</option>
        </select>
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-gray-50 p-5 rounded-xl border">
        <div className="flex items-center gap-2 mb-3">
          <FiBox className="text-green-600" />
          <h4 className="font-semibold">Order Summary</h4>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {product?.model_name} × {form.quantity}
            </span>
            <span className="font-medium">${totalMonthly}/month</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">{form.duration} months</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between text-base">
            <span className="font-semibold">Total Amount</span>
            <span className="text-green-600 font-bold text-lg">
              ${totalAmount.toLocaleString()}
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            (${totalMonthly}/month × {form.duration} months)
          </p>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Continue to Payment"
        )}
      </button>

      <p className="text-xs text-center text-gray-500">
        Your rental will be activated after payment confirmation
      </p>
    </form>
  );
};

export default RentForm;