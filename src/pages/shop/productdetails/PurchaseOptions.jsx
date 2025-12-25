import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

const PurchaseOptions = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("USA");

  // ✅ Safe hook usage
  const monthlyRentPrice = useMemo(() => {
    if (!product?.price) return 0;
    return Math.round(Number(product.price) / 12);
  }, [product]);

  const handleOptionClick = async (mode, buyType = null) => {
    if (!product) return;

    setLoading(true);
    try {
      await addToCart(product.id, 1);
      navigate("/checkout", { state: { mode, buyType } });
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <div className="w-full flex justify-center mt-14">
      <div className="max-w-6xl w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ================= HOSTING ================= */}
          <div className="border rounded-2xl p-8 bg-white flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-4">Hosting</h3>

            <div className="flex gap-2 mb-6">
              {["USA", "Dubai", "Ethiopia"].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`px-4 py-1 rounded-md border text-sm
                    ${
                      location === loc
                        ? "bg-green-100 border-green-400 text-green-700"
                        : "border-gray-300 text-gray-600"
                    }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            <ul className="text-sm text-black space-y-2 mb-6 dm-sans">
              <li>• including setup</li>
              <li>• including shipping</li>
              <li>• online in 5 days</li>
            </ul>

            <div className="flex justify-between items-center mb-4">
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded">
                Available
              </span>
              <span className="text-sm text-black dm-sans">
                from €0.058/kWh
              </span>
            </div>

            <div className="text-right mb-8">
              <div className="line-through text-sm text-black dm-sans">
                €1554.00
              </div>
              <div className="text-2xl font-bold text-green-600">
                €{Number(product.price).toLocaleString()}
              </div>
            </div>

            <button
              onClick={() => handleOptionClick("buy", "host")}
              disabled={loading}
              className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              Host Here
            </button>
          </div>

          {/* ================= RENT ================= */}
          <div className="border rounded-2xl p-8 bg-white flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-6">Rent</h3>

            <ul className="text-sm text-black dm-sans space-y-2 mb-6">
              <li>• including setup</li>
              <li>• including shipping</li>
              <li>• online in 5 days</li>
            </ul>

            <div className="flex justify-between items-center mb-4">
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded">
                Available
              </span>
              <span className="text-sm text-black dm-sans">
                from €0.058/kWh
              </span>
            </div>

            <div className="text-right mb-8">
              <div className="line-through text-sm text-gray-400">
                €1554.00
              </div>
              <div className="text-2xl font-bold text-green-600">
                €{monthlyRentPrice}
              </div>
            </div>

            <button
              onClick={() => handleOptionClick("rent")}
              disabled={loading}
              className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              Order Now
            </button>
          </div>

          {/* ================= SHIPMENT ================= */}
          <div className="border rounded-2xl p-8 bg-white flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-6">Shipment</h3>

            <ul className="text-sm text-black space-y-2 mb-6 dm-sans">
              <li>• including shipping</li>
              <li>• including customs</li>
              <li>• 2 – 4 weeks</li>
            </ul>

            <div className="flex justify-between items-center mb-4">
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded">
                Available
              </span>
              <span className="text-sm text-black dm-sans">
                from €0.058/kWh
              </span>
            </div>

            <div className="text-right mb-8">
              <div className="line-through text-sm text-gray-400">
                €1554.00
              </div>
              <div className="text-2xl font-bold text-green-600">
                €{Number(product.price).toLocaleString()}
              </div>
            </div>

            <button
              onClick={() => handleOptionClick("buy", "ship")}
              disabled={loading}
              className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              Order Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PurchaseOptions;
