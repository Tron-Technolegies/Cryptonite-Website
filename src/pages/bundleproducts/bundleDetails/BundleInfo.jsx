import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiShield, FiTruck, FiBox, FiArrowLeft, FiZap, FiCpu } from "react-icons/fi";
import bundleProductApi from "../../../api/bundleProductApi";
import { toast } from "react-toastify";
import { getImageUrl } from "../../../utils/imageUtils";
import BundlePurchaseOptions from "./BundlePurchaseOptions";

const BundleInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBundle = async () => {
      try {
        const res = await bundleProductApi.getOne(id);
        setBundle(res.data);
      } catch (err) {
        toast.error("Failed to load bundle");
      } finally {
        setLoading(false);
      }
    };

    fetchBundle();
  }, [id]);

  if (loading)
    return <div className="min-h-[70vh] flex items-center justify-center">Loading...</div>;

  if (!bundle)
    return <div className="min-h-[70vh] flex items-center justify-center">Bundle not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8"
      >
        <FiArrowLeft size={16} />
        Back to Bundles
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="bg-white border rounded-xl p-5">
            <img
              src={bundle.image ? getImageUrl(bundle.image) : "/placeholder.png"}
              alt={bundle.name}
              className="w-full object-contain"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">Bundle</span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
              {bundle.items?.length || 0} Items
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{bundle.name}</h1>

          <p className="text-3xl font-bold text-green-600 mb-2">€{bundle.price}</p>

          {bundle.hosting_fee_per_kw && (
            <p className="text-sm text-gray-500 mb-6">
              Hosting fee: €{bundle.hosting_fee_per_kw} / kW
            </p>
          )}

          <p className="text-gray-600 mb-8">{bundle.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Spec icon={<FiCpu />} label="Total Hashrate" value={bundle.total_hashrate} />
            <Spec icon={<FiZap />} label="Total Power" value={bundle.total_power} />
            <Spec label="Included Products" value={bundle.items?.length || 0} />
            <Spec label="Hosting Fee / kW" value={`€${bundle.hosting_fee_per_kw}`} />
          </div>
        </div>
      </div>

      {/* ✅ PURCHASE OPTIONS */}
      <BundlePurchaseOptions bundle={bundle} />

      <div className="grid grid-cols-3 gap-6 text-center text-xs text-gray-600 mt-12">
        <Trust icon={<FiShield />} title="12 Months" text="Warranty" />
        <Trust icon={<FiTruck />} title="Secure" text="Global Shipping" />
        <Trust icon={<FiBox />} title="Insured" text="Safe Packaging" />
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
