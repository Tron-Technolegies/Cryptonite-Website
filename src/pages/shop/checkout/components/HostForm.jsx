import React, { useState } from "react";
import { FiCheck, FiAlertCircle } from "react-icons/fi";

const HostForm = ({ onContinue, loading }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formData, setFormData] = useState({
    whatsapp: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const locations = [
    {
      id: "US",
      name: "USA - No service fees",
      price: "$0.0788 / kWh",
      available: true,
    },
    {
      id: "ET",
      name: "Ethiopia - (Full)",
      price: "$0.0548 / kWh",
      available: false,
    },
    {
      id: "UAE",
      name: "Dubai #2",
      price: "$0.0788 / kWh",
      available: true,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!selectedLocation) {
      newErrors.location = "Please select a hosting location";
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // ✅ EXACT PAYLOAD BACKEND EXPECTS
    const payload = {
      phone: formData.whatsapp.trim(),
      message: formData.message.trim() || "",
      hosting_location: selectedLocation,
    };

    console.log("Sending hosting request:", payload);
    onContinue(payload);
  };

  return (
    <div className="space-y-6">
      {/* LOCATION SELECTION */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Hosting Location</h3>
        
        {errors.location && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
            <FiAlertCircle />
            <span>{errors.location}</span>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4">
          {locations.map((loc) => (
            <button
              key={loc.id}
              type="button"
              disabled={!loc.available}
              onClick={() => {
                if (loc.available) {
                  setSelectedLocation(loc.id);
                  setErrors((prev) => ({ ...prev, location: null }));
                }
              }}
              className={`border rounded-xl p-4 text-left relative transition-all
                ${!loc.available ? "opacity-50 cursor-not-allowed bg-gray-100" : "hover:border-green-400"}
                ${selectedLocation === loc.id
                  ? "border-green-500 bg-green-50 shadow-md"
                  : "border-gray-300"}
              `}
            >
              {selectedLocation === loc.id && (
                <span className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full">
                  <FiCheck size={14} />
                </span>
              )}
              
              <h4 className="font-semibold text-gray-900">{loc.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{loc.price}</p>
              
              {!loc.available && (
                <span className="text-xs text-red-500 mt-2 block">Currently unavailable</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CONTACT FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-xl border">
        <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>

        {/* WhatsApp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <input
            name="whatsapp"
            type="tel"
            // placeholder="+1 234 567 8900"
            value={formData.whatsapp}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
              ${errors.whatsapp ? "border-red-500" : "border-gray-300"}
            `}
          />
          {errors.whatsapp && (
            <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Message (Optional)
          </label>
          <textarea
            name="message"
            placeholder="Any special requirements or questions..."
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Info Box */}
        {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Setup Fee:</strong> $1,150 per unit will be added to your total at checkout.
            We'll contact you via WhatsApp to finalize hosting details and coordinate setup.
          </p>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !selectedLocation}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </button>
      </form>
    </div>
  );
};

export default HostForm;