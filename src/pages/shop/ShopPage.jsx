import React, { useState, useEffect } from "react";
import productApi from "../../api/productApi";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { getImageUrl } from "../../utils/imageUtils";

const ShopPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [manufacturer, setManufacturer] = useState("All Manufacturers");
  const [priceFilter, setPriceFilter] = useState("All prices");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCTS ONLY ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productApi.getAll();
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getPriceValue = (price) => Number(price ?? 0);

  const brands = ["All Manufacturers", "Bitmain", "Whatsminer"];

  /* ================= FILTERING ================= */
  const filteredProducts = products
    .filter((product) => {
      const searchTerm = search.toLowerCase();
      return product.model_name?.toLowerCase().includes(searchTerm);
    })
    .filter((product) => {
      if (manufacturer === "All Manufacturers") return true;
      return product.model_name
        ?.toLowerCase()
        .includes(manufacturer.toLowerCase());
    })
    .filter((product) => {
      const val = getPriceValue(product.price);
      if (priceFilter === "Below 2000") return val < 2000;
      if (priceFilter === "2000-4000") return val >= 2000 && val <= 4000;
      if (priceFilter === "Above 4000") return val > 4000;
      return true;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
          MINING <br /> EQUIPMENT
        </h1>

        <p className="text-black text-lg mt-4 max-w-2xl font-medium">
          Professional grade ASIC miners from industry leading manufacturers.
        </p>

        {/* ================= FILTER BAR ================= */}
        <div className="mt-10 flex flex-col md:flex-row gap-6">

          {/* SEARCH */}
          <div className="relative w-full md:w-[40%]">
            <FiSearch className="absolute left-5 top-4 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search equipment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full px-14 py-3.5 shadow-sm focus:ring-2 focus:ring-black"
            />
          </div>

          {/* BRAND FILTER */}
          <select
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-6 py-3.5 shadow-sm text-gray-700"
          >
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          {/* PRICE FILTER */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-6 py-3.5 shadow-sm text-gray-700"
          >
            <option>All prices</option>
            <option>Below 2000</option>
            <option>2000-4000</option>
            <option>Above 4000</option>
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
                  src={getImageUrl(product.image)}
                  alt={product.model_name}
                  loading="lazy"
                  className="h-[260px] object-contain"
                />
              </div>

              {/* TITLE & PRICE */}
              <div className="flex justify-between items-center mt-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.model_name}
                </h2>
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
                  <span className="text-gray-500">Hashrate</span>
                  <span className="font-medium">{product.hashrate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Power</span>
                  <span className="font-medium">{product.power}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Algorithm</span>
                  <span className="font-medium">{product.algorithm}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <Link
                  to={`/product/${product.id}`}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-2.5 text-center font-semibold transition"
                >
                  Know More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* NO RESULTS */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No products found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
