import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiShield,
  FiTruck,
  FiBox,
  FiArrowLeft,
  FiZap,
  FiCpu,
  FiVolume2,
} from "react-icons/fi";
import bundleProductApi from "../../../api/bundleProductApi";
import cartApi from "../../../api/cartApi";
import { toast } from "react-toastify";
import { getImageUrl } from "../../../utils/imageUtils";

const BundleInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bundle, setBundle] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBundle = async () => {
      try {
        const res = await bundleProductApi.getOne(id);
        setBundle(res.data);
      } catch (err) {
        console.error("Error fetching bundle:", err);
        toast.error("Failed to load bundle");
      } finally {
        setLoading(false);
      }
    };

    fetchBundle();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      toast.info("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (addingToCart) return;

    try {
      setAddingToCart(true);

      await cartApi.addToCart({
        bundle_id: bundle.id,
        quantity: Number(qty),
      });

      toast.success("Bundle added to cart");
      navigate("/cart");
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Unable to add bundle to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-600">Loading...</div>
    );
  }

  if (!bundle) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-600">
        Bundle not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8"
      >
        <FiArrowLeft size={16} />
        Back to Bundles
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <img
              src={bundle.image ? getImageUrl(bundle.image) : "/placeholder.png"}
              alt={bundle.name}
              className="w-full object-contain"
            />
          </div>
        </div>

        <div>
          {/* BADGES */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Bundle
            </span>

            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
              {bundle.products?.length || 0} Items
            </span>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
              Available
            </span>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
              Instant Delivery
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{bundle.name}</h1>

          {/* PRICE */}
          <p className="text-3xl font-bold text-green-600 mb-1">${bundle.price}</p>

          {bundle.hosting_fee_per_kw && (
            <p className="text-sm text-gray-500 mb-6">
              Hosting fee: ${bundle.hosting_fee_per_kw} / kW
            </p>
          )}

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed max-w-xl mb-8">{bundle.description}</p>

          {/* SPECS (MATCHING PRODUCT UI) */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Spec icon={<FiCpu />} label="Total Hashrate" value={bundle.total_hashrate} />
            <Spec icon={<FiZap />} label="Total Power" value={bundle.total_power} />

            <Spec label="Included Products" value={bundle.products?.length} />
            <Spec label="Hosting Fee / kW" value={`$${bundle.hosting_fee_per_kw}`} />
          </div>

          {/* CART */}
          <div className="border border-gray-200 rounded-xl p-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-36">
                <span className="text-sm text-gray-500 mr-2">Qty</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="bg-transparent outline-none flex-1"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition
                  ${
                    addingToCart
                      ? "bg-green-300 cursor-not-allowed text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
              >
                <FiShoppingCart />
                {addingToCart ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* TRUST */}
          <div className="grid grid-cols-3 gap-6 text-center text-xs text-gray-600">
            <Trust icon={<FiShield />} title="12 Months" text="Warranty" />
            <Trust icon={<FiTruck />} title="Secure" text="Global Shipping" />
            <Trust icon={<FiBox />} title="Insured" text="Safe Packaging" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Spec = ({ icon, label, value }) => (
  <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center gap-3">
    {icon && <div className="text-green-500 text-lg">{icon}</div>}
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const Trust = ({ icon, title, text }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="text-green-500 text-lg">{icon}</div>
    <p className="font-semibold">{title}</p>
    <p className="text-gray-500">{text}</p>
  </div>
);

export default BundleInfo;
