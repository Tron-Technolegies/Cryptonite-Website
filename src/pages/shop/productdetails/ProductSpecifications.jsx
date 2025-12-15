import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productApi from "../../../api/productApi";

const TABS = {
  SPECIFICATIONS: "specs",
  FEATURES: "features",
  INCLUDED: "included",
};

const ProductSpecifications = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TABS.SPECIFICATIONS);

  /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    const fetchProductSpecs = async () => {
      try {
        const res = await productApi.getOne(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching specifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductSpecs();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-black">
        Loading specifications...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center text-black">
        Specifications not available
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mt-24 text-black">

      {/* ================= TABS HEADER ================= */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        <TabButton
          active={activeTab === TABS.SPECIFICATIONS}
          onClick={() => setActiveTab(TABS.SPECIFICATIONS)}
        >
          Specifications
        </TabButton>

        <TabButton
          active={activeTab === TABS.FEATURES}
          onClick={() => setActiveTab(TABS.FEATURES)}
        >
          Features
        </TabButton>

        <TabButton
          active={activeTab === TABS.INCLUDED}
          onClick={() => setActiveTab(TABS.INCLUDED)}
        >
          What's Included
        </TabButton>
      </div>

      {/* ================= TAB CONTENT ================= */}

      {/* SPECIFICATIONS */}
      {activeTab === TABS.SPECIFICATIONS && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-8">
          <h2 className="text-lg font-bold text-black mb-6">
            Technical Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
            <Spec label="Manufacturer" value={product.brand || "Bitmain"} />
            <Spec label="Weight" value={product.weight || "—"} />

            <Spec label="Algorithm" value={product.algorithm} />
            <Spec label="Dimensions" value={product.dimensions || "—"} />

            <Spec label="Hash Rate" value={product.hashrate} />
            <Spec label="Cooling" value={product.cooling || "—"} />

            <Spec label="Power Consumption" value={product.power} />
            <Spec label="Noise Level" value={product.noise_level || "75 dB"} />

            <Spec label="Efficiency" value={product.efficiency || "29.5 J/TH"} />
            <Spec
              label="Operating Temp"
              value={product.operating_temp || "5°C – 40°C"}
            />
          </div>
        </div>
      )}

      {/* FEATURES */}
      {activeTab === TABS.FEATURES && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-8">
          <h2 className="text-lg font-bold mb-4">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>High-efficiency ASIC mining hardware</li>
            <li>Optimized power consumption for long-term mining</li>
            <li>Advanced cooling system for stable operation</li>
            <li>Designed for professional mining environments</li>
          </ul>
        </div>
      )}

      {/* WHAT'S INCLUDED */}
      {activeTab === TABS.INCLUDED && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-8">
          <h2 className="text-lg font-bold mb-4">What's Included</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Mining machine</li>
            <li>Power cables</li>
            <li>User manual</li>
            <li>Warranty card</li>
          </ul>
        </div>
      )}
    </section>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`pb-3 text-sm font-semibold transition ${
      active
        ? "text-black border-b-2 border-green-500"
        : "text-black opacity-70 hover:opacity-100"
    }`}
  >
    {children}
  </button>
);

const Spec = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-green-100 py-3 text-black">
    <span>{label}</span>
    <span className="font-semibold text-right">{value}</span>
  </div>
);

export default ProductSpecifications;
