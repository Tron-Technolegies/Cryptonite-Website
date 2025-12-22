import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import bundleProductApi from "../../api/bundleProductApi";
import { getImageUrl } from "../../utils/imageUtils";

export default function BundleProductPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("All prices");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BUNDLE PRODUCTS ================= */
  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const res = await bundleProductApi.getAll();
        console.log(res.data);
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching bundle products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, []);

  const getPriceValue = (price) => Number(price ?? 0);

  const filteredProducts = products
    .filter((p) => p?.name?.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => {
      const val = Number(p?.price ?? 0);
      if (priceFilter === "Below 5000") return val < 5000;
      if (priceFilter === "5000-10000") return val >= 5000 && val <= 10000;
      if (priceFilter === "Above 10000") return val > 10000;
      return true;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading bundle products...
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <h1 className="text-5xl font-extrabold tracking-tight josefin-sans text-gray-900 leading-tight">
          BUNDLE <br /> PACKAGES
        </h1>

        <p className="text-black text-lg mt-4 max-w-2xl font-medium">
          Pre-configured mining bundles with optimized hashrate, power, and hosting.
        </p>

        {/* ================= FILTER BAR ================= */}
        <div className="mt-10 flex flex-col md:flex-row gap-6">
          {/* SEARCH */}
          <div className="relative w-full md:w-[50%]">
            <FiSearch className="absolute left-5 top-4 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search bundle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full px-14 py-3.5 shadow-sm focus:ring-2 focus:ring-black"
            />
          </div>

          {/* PRICE FILTER */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-6 py-3.5 shadow-sm text-gray-700"
          >
            <option>All prices</option>
            <option>Below 5000</option>
            <option>5000-10000</option>
            <option>Above 10000</option>
          </select>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-xl transition p-8"
            >
              {/* IMAGE */}
              <div className="flex justify-center">
                <img
                  src={product.image ? getImageUrl(product.image) : "/placeholder.png"}
                  alt={product.name}
                  className="h-[260px] object-contain"
                />
              </div>

              {/* TITLE & PRICE */}
              <div className="flex justify-between items-center mt-5">
                <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>{" "}
                <span className="bg-[#E7F8E7] text-green-600 font-semibold px-4 py-1 rounded-full">
                  ${product.price}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm mt-2">
                {product.description?.substring(0, 110)}...
              </p>

              {/* SPECS */}
              <div className="mt-4 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Hashrate</span>
                  <span className="font-medium">{product.total_hashrate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Power</span>
                  <span className="font-medium">{product.total_power}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hosting Fee / KW</span>
                  <span className="font-medium">${product.hosting_fee_per_kw}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <Link
                  to={`/bundles/${product.id}`}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-2.5 text-center font-semibold transition"
                >
                  Know More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
