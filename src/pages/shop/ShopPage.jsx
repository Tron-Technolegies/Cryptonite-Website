import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import miningProducts from "../../utils/products";

const ShopPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("ALL");
  const [algorithm, setAlgorithm] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");

  const brandOptions = ["ALL", ...new Set(miningProducts.map((p) => p.brand))];

  const algoOptions = [
    "ALL",
    ...new Set(miningProducts.map((p) => p.algorithm)),
  ];

  const filteredProducts = miningProducts
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (brand === "ALL" ? true : p.brand === brand))
    .filter((p) => (algorithm === "ALL" ? true : p.algorithm === algorithm))
    .sort((a, b) => {
      if (sortBy === "price-high") {
        return (
          Number(b.price.replace(/[^0-9\.]/g, "")) -
          Number(a.price.replace(/[^0-9\.]/g, ""))
        );
      }
      if (sortBy === "price-low") {
        return (
          Number(a.price.replace(/[^0-9\.]/g, "")) -
          Number(b.price.replace(/[^0-9\.]/g, ""))
        );
      }
      return b.id - a.id;
    });

  return (
    <div className="bg-[#000000] min-h-screen text-white px-6 md:px-16 py-16 flex gap-10">
      <div className="w-64 hidden md:block bg-[#07101f] p-6 rounded-xl h-fit shadow-lg">
        <h2 className="text-xl font-bold mb-4">Filter</h2>

        {/* Sort */}
        <label className="text-sm">Sort By</label>
        <select
          className="w-full mt-1 mb-4 bg-[#000000] p-2 rounded-md border border-gray-600"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
        </select>

        {/* Search */}
        <label className="text-sm">Search</label>
        <input
          type="text"
          placeholder="Search item..."
          className="w-full mt-1 mb-4 bg-[#000000] p-2 rounded-md border border-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Brand */}
        <label className="text-sm">Manufacturer</label>
        <select
          className="w-full mt-1 mb-4 bg-[#000000] p-2 rounded-md border border-gray-600"
          onChange={(e) => setBrand(e.target.value)}
        >
          {brandOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        {/* Algorithm */}
        <label className="text-sm">Algorithm</label>
        <select
          className="w-full mt-1 mb-4 bg-[#000000] p-2 rounded-md border border-gray-600"
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          {algoOptions.map((alg) => (
            <option key={alg} value={alg}>
              {alg}
            </option>
          ))}
        </select>
      </div>

      {/* productCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 flex-1">
        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-[#0a1628] p-6 rounded-xl hover:-translate-y-2 transition duration-300 shadow-lg block"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-contain mb-4"
            />

            <h2 className="text-xl font-bold mb-1">{product.name}</h2>

            <p className="mt-2 text-orange-400 text-lg">{product.price}</p>

            <button className="mt-4 bg-green-500 px-4 py-2 rounded-lg font-semibold hover:bg-green-600 w-full">
              Buy Now
            </button>
          </Link>
        ))}

        {filteredProducts.length === 0 && (
          <p className="text-gray-300 text-lg col-span-full text-center">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
