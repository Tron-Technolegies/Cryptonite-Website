import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { toast } from "react-toastify";

const PurchaseOptions = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("USA");

  // ✅ Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem("access");
    return !!token;
  };

  // ✅ Safe hook usage
  const monthlyRentPrice = useMemo(() => {
    if (!product?.price) return 0;
    return Math.round(Number(product.price) / 12);
  }, [product]);

  const handleOptionClick = async (mode, buyType = null) => {
    if (!product) return;

    // ✅ Check if user is authenticated
    if (!isAuthenticated()) {
      toast.error("Please login to continue with your purchase", {
        position: "top-center",
        autoClose: 4000,
      });
      
      // Store the intended action for after login
      sessionStorage.setItem("redirectAfterLogin", JSON.stringify({
        path: "/checkout",
        state: { mode, buyType },
        productId: product.id
      }));
      
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await addToCart(product.id, 1);
      navigate("/checkout", { state: { mode, buyType } });
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Failed to add item to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  const userLoggedIn = isAuthenticated();

  return (
    <div className="w-full flex justify-center mt-14">
      <div className="max-w-6xl w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ================= HOSTING ================= */}
          <div className="border rounded-2xl p-8 bg-white flex flex-col h-full hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-4">Hosting</h3>

            <div className="flex gap-2 mb-6">
              {["USA", "Dubai", "Ethiopia"].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`px-4 py-1 rounded-md border text-sm transition-colors
                    ${
                      location === loc
                        // ? "bg-green-100 border-green-400 text-green-700"
                        // : "border-gray-300 text-gray-600 hover:border-green-300"
                    }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            <ul className="text-sm text-black space-y-2 mb-6 dm-sans">
              <li>• Including setup ($1,150/unit)</li>
              <li>• Including shipping</li>
              <li>• Online in 5 days</li>
            </ul>

            <div className="flex justify-between items-center mb-4">
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded">
                Available
              </span>
            </div>

            <div className="text-right mb-8">
              <div className="text-sm text-gray-600 mb-1">Setup fee per unit</div>
              <div className="text-2xl font-bold text-green-600">
                €1,150
              </div>
            </div>

            <button
              onClick={() => handleOptionClick("buy", "host")}
              disabled={loading}
              className="w-full mt-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? "Processing..." : "Host with us"}
            </button>
            
            {!userLoggedIn && (
              <p className="text-xs text-gray-500 text-center mt-2">
                {/* Login required */}
              </p>
            )}
          </div>

          {/* ================= RENT ================= */}
          <div className="border rounded-2xl p-8 bg-white flex flex-col h-full hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-6">Rent</h3>

            <ul className="text-sm text-black dm-sans space-y-2 mb-6">
              <li>• Including setup</li>
              <li>• Including shipping</li>
              <li>• Online in 5 days</li>
              <li>• Flexible rental periods</li>
            </ul>

            <div className="flex justify-between items-center mb-4">
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded">
                Available
              </span>
            </div>

            <div className="text-right mb-8">
              <div className="text-sm text-gray-600 mb-1">Starting from</div>
              <div className="text-2xl font-bold text-green-600">
                €{monthlyRentPrice}/mo
              </div>
            </div>

            <button
              onClick={() => handleOptionClick("rent")}
              disabled={loading}
              className="w-full mt-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? "Processing..." : "Rent Now"}
            </button>
            
            {!userLoggedIn && (
              <p className="text-xs text-gray-500 text-center mt-2">
                {/* Login required */}
              </p>
            )}
          </div>

          {/* ================= SHIPMENT ================= */}
          <div className="border rounded-2xl p-8 bg-white flex flex-col h-full hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-6">Shipment</h3>

            <ul className="text-sm text-black space-y-2 mb-6 dm-sans">
              <li>• Including shipping</li>
              <li>• Including customs</li>
              <li>• Delivery: 2 – 4 weeks</li>
              <li>• Direct to your location</li>
            </ul>

            <div className="flex justify-between items-center mb-4">
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded">
                Available
              </span>
            </div>

            <div className="text-right mb-8">
              <div className="text-sm text-gray-600 mb-1">One-time purchase</div>
              <div className="text-2xl font-bold text-green-600">
                €{Number(product.price).toLocaleString()}
              </div>
            </div>

            <button
              onClick={() => handleOptionClick("buy", "ship")}
              disabled={loading}
              className="w-full mt-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
            
            {!userLoggedIn && (
              <p className="text-xs text-gray-500 text-center mt-2">
                {/* Login required */}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PurchaseOptions;