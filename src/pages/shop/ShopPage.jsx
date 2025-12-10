import React, { useState } from "react";
import miningProducts from "../../utils/products";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const ShopPage = () => {
  const [search, setSearch] = useState("");
  const [manufacturer, setManufacturer] = useState("All Manufacturers");
  const [priceFilter, setPriceFilter] = useState("All prices");

  const brands = ["All Manufacturers", ...new Set(miningProducts.map(p => p.brand))];

  const getPriceValue = (price) =>
    Number(price.replace("$", "").replace(",", ""));

  const filteredProducts = miningProducts
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => manufacturer === "All Manufacturers" ? true : p.brand === manufacturer)
    .filter(p => {
      const val = getPriceValue(p.price);
      if (priceFilter === "Below 2000") return val < 2000;
      if (priceFilter === "2000-4000") return val >= 2000 && val <= 4000;
      if (priceFilter === "Above 4000") return val > 4000;
      return true;
    });

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-16">
      
      {/* CENTER CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
          MINING <br /> EQUIPMENT
        </h1>

        <p className="text-black text-lg mt-4 max-w-2xl font-medium dm-sans">
          Professional grade ASIC miners from industry leading manufacturers.
          All equipment comes with warranty and expert support.
        </p>

        {/* FILTER BAR */}
        <div className="mt-10 flex flex-col md:flex-row gap-6">

          {/* SEARCH BAR */}
          <div className="relative w-full md:w-[50%]">
            <FiSearch className="absolute left-5 top-4 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search equipment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full px-14 py-3.5 shadow-sm focus:ring-2 focus:ring-black"
            />
          </div>

          {/* MANUFACTURER DROPDOWN */}
          <select
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-6 py-3.5 shadow-sm text-gray-700 w-full md:w-auto"
          >
            {brands.map(b => (
              <option key={b}>{b}</option>
            ))}
          </select>

          {/* PRICE DROPDOWN */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-6 py-3.5 shadow-sm text-gray-700 w-full md:w-auto"
          >
            <option>All prices</option>
            <option>Below 2000</option>
            <option>2000-4000</option>
            <option>Above 4000</option>
          </select>

        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-xl transition p-8"
            >
              {/* IMAGE */}
              <div className="flex justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[260px] object-contain"
                />
              </div>

              {/* NAME + PRICE */}
              <div className="flex justify-between items-center mt-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h2>

                <span className="bg-[#E7F8E7] text-green-600 font-semibold px-4 py-1 rounded-full">
                  {product.price}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm mt-2">
                {product.description.substring(0, 110)}...
              </p>

              {/* SPECS */}
              <div className="mt-4 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Hashrate</span>
                  <span className="font-medium">{product.hashRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Power</span>
                  <span className="font-medium">{product.powerConsumption}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-medium">Multiple Locations</span>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-6">
                <Link
                  to={`/product/${product.id}`}
                  className="flex-1 border border-gray-300 rounded-full py-2 text-center text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  Learn More
                </Link>

                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-full py-2 font-medium transition">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ShopPage;
