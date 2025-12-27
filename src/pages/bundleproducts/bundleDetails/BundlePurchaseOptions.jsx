import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../../context/CartContext";

const BundlePurchaseOptions = ({ bundle }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [location, setLocation] = useState("USA");
  const [loading, setLoading] = useState(false);

  if (!bundle) return null;

  const monthlyRentPrice = useMemo(() => {
    return Math.round(Number(bundle.price || 0) / 12);
  }, [bundle]);
  const handleCheckout = async (mode, type = null) => {
    if (!localStorage.getItem("access")) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    await addToCart({
      bundle_id: bundle.id,
      quantity: 1,
    });

    navigate("/checkout", {
      state: {
        mode,
        buyType: type,
      },
    });
  };

  return (
    <div className="w-full flex justify-center mt-14">
      <div className="max-w-6xl w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ================= HOSTING ================= */}
          <div className="border rounded-2xl p-8 bg-white flex flex-col shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Hosting</h3>

            <div className="flex gap-2 mb-4">
              {["USA", "Dubai", "Ethiopia"].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`px-4 py-1 rounded-md border text-sm ${
                    location === loc
                      ? "bg-green-100 border-green-400 text-green-700"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            <ul className="text-sm text-gray-700 space-y-2 mb-6">
              <li>• Includes setup & installation</li>
              <li>• Hosting infrastructure included</li>
              <li>• Online in 5 days</li>
              <li>• 24/7 monitoring</li>
            </ul>

            <div className="text-right mb-6">
              <p className="text-sm text-gray-500">Starting from</p>
              <p className="text-2xl font-bold text-green-600">€{bundle.price}</p>
            </div>

            <button
              onClick={() => handleCheckout("buy", "host")}
              disabled={loading}
              className="mt-auto bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-60"
            >
              Host Here
            </button>
          </div>

          {/* ================= RENT ================= */}
          <div className="border rounded-2xl p-8 bg-white flex flex-col shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Rent</h3>

            <ul className="text-sm text-gray-700 space-y-2 mb-6">
              <li>• No upfront hardware cost</li>
              <li>• Maintenance included</li>
              <li>• Flexible rental period</li>
              <li>• Easy upgrade options</li>
            </ul>

            <div className="text-right mb-6">
              <p className="text-sm text-gray-500">Starting from</p>
              <p className="text-2xl font-bold text-green-600">€{monthlyRentPrice}/mo</p>
            </div>

            <button
              onClick={() => handleCheckout("rent")}
              disabled={loading}
              className="mt-auto bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-60"
            >
              Rent Now
            </button>
          </div>

          {/* ================= SHIPMENT ================= */}
          <div className="border rounded-2xl p-8 bg-white flex flex-col shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Shipment</h3>

            <ul className="text-sm text-gray-700 space-y-2 mb-6">
              <li>• Doorstep delivery</li>
              <li>• Fully insured shipping</li>
              <li>• 2–4 weeks delivery time</li>
              <li>• Worldwide support</li>
            </ul>

            <div className="text-right mb-6">
              <p className="text-sm text-gray-500">One-time purchase</p>
              <p className="text-2xl font-bold text-green-600">€{bundle.price}</p>
            </div>

            <button
              onClick={() => handleCheckout("buy", "ship")}
              disabled={loading}
              className="mt-auto bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-60"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundlePurchaseOptions;
