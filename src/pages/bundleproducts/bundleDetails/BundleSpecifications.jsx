import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bundleProductApi from "../../../api/bundleProductApi";

const TABS = {
  SPECIFICATIONS: "specs",
  FEATURES: "features",
  INCLUDED: "included",
};

const BundleSpecifications = () => {
  const { id } = useParams();

  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TABS.SPECIFICATIONS);

  useEffect(() => {
    const fetchBundleSpecs = async () => {
      try {
        const res = await bundleProductApi.getOne(id);
        setBundle(res.data);
      } catch (err) {
        console.error("Error fetching bundle specs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBundleSpecs();
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center text-black">Loading specifications...</div>;
  }

  if (!bundle) {
    return <div className="py-20 text-center text-black">Specifications not available</div>;
  }

  return (
    <section className="max-w-7xl mb-5 mx-auto px-4 md:px-6 mt-24 text-black">
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        <TabButton
          active={activeTab === TABS.SPECIFICATIONS}
          onClick={() => setActiveTab(TABS.SPECIFICATIONS)}
        >
          Specifications
        </TabButton>

        <TabButton active={activeTab === TABS.FEATURES} onClick={() => setActiveTab(TABS.FEATURES)}>
          Features
        </TabButton>

        <TabButton active={activeTab === TABS.INCLUDED} onClick={() => setActiveTab(TABS.INCLUDED)}>
          What's Included
        </TabButton>
      </div>

      {/* ================= TAB CONTENT ================= */}

      {/* SPECIFICATIONS */}
      {activeTab === TABS.SPECIFICATIONS && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-8">
          <h2 className="text-lg font-bold text-black mb-6">Bundle Specifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
            <Spec label="Total Hashrate" value={bundle.total_hashrate} />
            <Spec label="Total Power" value={bundle.total_power} />

            <Spec label="Hosting Fee / kW" value={`$${bundle.hosting_fee_per_kw}`} />
            <Spec label="Included Products" value={bundle.products?.length} />

            <Spec label="Bundle Type" value="Mining Bundle" />
            <Spec label="Delivery" value="Instant" />
          </div>
        </div>
      )}

      {/* FEATURES */}
      {activeTab === TABS.FEATURES && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-8">
          <h2 className="text-lg font-bold mb-4">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Pre-configured mining bundle for optimal performance</li>
            <li>Cost-effective compared to individual purchases</li>
            <li>Optimized total power and hashrate balance</li>
            <li>Ideal for beginners and scalable mining setups</li>
          </ul>
        </div>
      )}

      {/* WHAT'S INCLUDED */}
      {activeTab === TABS.INCLUDED && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-8">
          <h2 className="text-lg font-bold mb-4">What's Included</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>{bundle.products?.length} Mining Machines</li>
            <li>Pre-configured bundle setup</li>
            <li>Power cables & accessories</li>
            <li>Bundle warranty & documentation</li>
          </ul>
        </div>
      )}
    </section>
  );
};

const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`pb-3 text-sm font-semibold transition ${
      active ? "text-black border-b-2 border-green-500" : "text-black opacity-70 hover:opacity-100"
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

export default BundleSpecifications;
