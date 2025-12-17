import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

const HostForm = ({ onContinue, loading }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    whatsapp: "",
    email: "",
    quantity: "1",
    message: "",
  });

  const locations = [
    {
      id: "usa",
      name: "USA - No service fees",
      price: "$0.0788 / kWh",
      capacity: "Capacity: Free",
      connectivity: "Connectivity\n22 ms",
      uptime: "Uptime\n99.54%",
      available: true,
    },
    {
      id: "ethiopia",
      name: "Ethiopia - (Full)",
      price: "$0.0548 / kWh",
      capacity: "Capacity: Full",
      connectivity: "Connectivity\n22 ms",
      uptime: "Uptime\n99.54%",
      available: false,
    },
    {
      id: "dubai",
      name: "Dubai #2",
      price: "$0.0788 / kWh",
      capacity: "Capacity: Free",
      connectivity: "Connectivity\n22 ms",
      uptime: "Uptime\n99.54%",
      available: true,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SUBMIT (FIXED) ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedLocation) {
      alert("Please select a hosting location");
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      alert("Please fill in your name");
      return;
    }

    if (!formData.whatsapp.trim()) {
      alert("Please provide your WhatsApp number");
      return;
    }

    const hostingDetails = {
      location: selectedLocation,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      whatsapp: formData.whatsapp.trim(),
      email: formData.email.trim(),
      quantity: formData.quantity,
      message: formData.message.trim(),
    };

    /* ✅ REQUIRED FOR BACKEND (HOSTING ADDRESS) */
    const hostingAddress = {
      name: `${formData.firstName} ${formData.lastName}`,
      line1: "HOSTING ORDER",
      line2: `Hosting Location: ${selectedLocation}`,
      city: "Hosting",
      state: "Hosting",
      country: selectedLocation.toUpperCase(),
      postal_code: "000000",
      phone: formData.whatsapp,
      email: formData.email || "",
    };

    onContinue({
      address: hostingAddress,          // ✅ FIX
      hosting_details: hostingDetails,
    });
  };

  return (
    <div className="space-y-6">
      {/* LOCATION SELECTION */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Select your hosting area
        </h3>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() =>
                location.available && setSelectedLocation(location.id)
              }
              disabled={!location.available}
              className={`
                relative border rounded-xl p-4 text-left transition-all
                ${
                  !location.available
                    ? "opacity-50 cursor-not-allowed bg-gray-50"
                    : ""
                }
                ${
                  selectedLocation === location.id
                    ? "border-2 border-green-500 bg-green-50"
                    : "border-gray-300 bg-white hover:border-green-300"
                }
              `}
            >
              {selectedLocation === location.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <FiCheck className="text-white text-sm" />
                </div>
              )}

              <h4 className="font-semibold text-sm mb-2">
                {location.name}
              </h4>
              <p className="text-sm font-semibold text-gray-900 mb-3">
                {location.price}
              </p>
              <p
                className={`text-xs mb-2 ${
                  !location.available
                    ? "text-red-500"
                    : "text-gray-600"
                }`}
              >
                {location.capacity}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <p className="whitespace-pre-line">
                  {location.connectivity}
                </p>
                <p className="whitespace-pre-line">
                  {location.uptime}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="text-center mb-6">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
            Hosting Service
          </span>
          <h3 className="text-lg font-semibold">
            Proceed to payment
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Enter your details and we’ll contact you about hosting.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <input
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleInputChange}
            placeholder="WhatsApp Number"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email (optional)"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message (optional)"
            rows="3"
            className="w-full px-4 py-2 border rounded-lg resize-none"
          />

          <button
            type="submit"
            disabled={loading || !selectedLocation}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300"
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HostForm;
