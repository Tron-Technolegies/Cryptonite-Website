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

  const [errors, setErrors] = useState({});

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
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!selectedLocation) {
      newErrors.location = "Please select a hosting location";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

    // ✅ SEND PROPER ADDRESS STRUCTURE FOR HOSTING
    const payload = {
      address: {
        full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.whatsapp.trim(),
        street: `Hosting Service - ${selectedLocationData?.name || selectedLocation}`,
        city: "Data Center",
        state: selectedLocation.toUpperCase(),
        zip_code: "00000",
        country: "USA", // Or map location to country
      },
      hosting_details: {
        location_id: selectedLocation,
        location_name: selectedLocationData?.name,
        price_per_kwh: selectedLocationData?.price,
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        whatsapp: formData.whatsapp.trim(),
        email: formData.email.trim(),
        quantity: formData.quantity,
        message: formData.message.trim(),
      }
    };

    console.log("HostForm payload:", payload);
    onContinue(payload);
  };

  return (
    <div className="space-y-6">
      {/* LOCATION SELECTION */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Select your hosting area
        </h3>

        {errors.location && (
          <p className="text-red-500 text-sm text-center mb-2">{errors.location}</p>
        )}

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {locations.map((location) => (
            <button
              key={location.id}
              type="button"
              onClick={() => {
                if (location.available) {
                  setSelectedLocation(location.id);
                  if (errors.location) {
                    setErrors(prev => ({ ...prev, location: null }));
                  }
                }
              }}
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
            Enter your details and we'll contact you about hosting.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name *"
                className={`w-full px-4 py-2.5 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name *"
                className={`w-full px-4 py-2.5 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email *"
              className={`w-full px-4 py-2.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* WHATSAPP */}
          <div>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="WhatsApp Number *"
              className={`w-full px-4 py-2.5 border ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            />
            {errors.whatsapp && (
              <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>
            )}
          </div>

          {/* MESSAGE */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Special instructions (optional)"
            rows="3"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />

          {/* SUBMIT */}
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
        </form>
      </div>
    </div>
  );
};

export default HostForm;