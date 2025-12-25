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
    { id: "US", name: "USA - No service fees", available: true },
    { id: "ET", name: "Ethiopia (Full)", available: false },
    { id: "UAE", name: "Dubai #2", available: true },
  ];

  const validate = () => {
    const err = {};
    if (!selectedLocation) err.location = "Select a location";
    if (!formData.whatsapp.trim()) err.whatsapp = "WhatsApp is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onContinue({
      phone: formData.whatsapp.trim(),
      message: formData.message.trim(),
      hosting_location: selectedLocation,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold">Hosting Location</h3>

      {errors.location && (
        <div className="text-red-500 flex items-center gap-2">
          <FiAlertCircle /> {errors.location}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {locations.map((loc) => (
          <button
            key={loc.id}
            type="button"
            disabled={!loc.available}
            onClick={() => setSelectedLocation(loc.id)}
            className={`border p-4 rounded-lg ${
              selectedLocation === loc.id
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
          >
            {selectedLocation === loc.id && <FiCheck />}
            <p>{loc.name}</p>
          </button>
        ))}
      </div>

      <input
        type="tel"
        placeholder="WhatsApp number"
        className="w-full border px-4 py-3 rounded-lg"
        value={formData.whatsapp}
        onChange={(e) =>
          setFormData({ ...formData, whatsapp: e.target.value })
        }
      />

      <textarea
        placeholder="Message (optional)"
        className="w-full border px-4 py-3 rounded-lg"
        value={formData.message}
        onChange={(e) =>
          setFormData({ ...formData, message: e.target.value })
        }
      />

      <button
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg"
      >
        {loading ? "Processing..." : "Continue to Payment"}
      </button>
    </form>
  );
};

export default HostForm;
