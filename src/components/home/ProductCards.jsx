import React from "react";
import { FaStar } from "react-icons/fa";
import miningProducts from "../../utils/products";

const ProductCards = () => {
  const topProducts = miningProducts.slice(0, 4); // 4 items like screenshot

  return (
    <div className="bg-white py-16 px-6 md:px-16">

      {/* SECTION TITLE */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black">
          The Most Profitable Miners
        </h1>
        <p className="text-gray-600 mt-2">
          Choose your miner and hosting starting with 4 cents per KW.
        </p>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {topProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 hover:shadow-xl transition duration-300 relative"
          >
            {/* Black Friday Badge */}
            <div className="absolute top-3 left-3 bg-black text-yellow-400 font-bold text-xs px-3 py-1 rounded-md">
              BLACK FRIDAY %
            </div>

            {/* Discount Badge */}
            <div className="absolute top-3 right-3 bg-red-500 text-white font-semibold text-xs px-3 py-1 rounded-full">
              Save {product.discount || "10%"}
            </div>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-contain mt-8"
            />

            {/* PRODUCT NAME */}
            <h2 className="text-lg font-semibold text-black mt-4">
              {product.name}
            </h2>

            {/* Price Section */}
            <div className="mt-2 flex items-center gap-3">
              <span className="text-sm text-gray-500 line-through">
                {product.oldPrice}
              </span>
              <span className="text-lg font-bold text-red-500">
                {product.newPrice}
              </span>
            </div>

            {/* Profit Per Day */}
            <div className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full w-fit mt-3">
              {product.profitPerDay}
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar className="text-gray-300" /> 
              <span className="text-black text-sm ml-2">{product.rating}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CENTER BUTTON */}
      <div className="text-center mt-12">
        <button className="bg-(--primary-color) text-black font-semibold py-3 px-10 rounded-full hover:brightness-110 transition duration-300">
          Shop Now
        </button>
      </div>

    </div>
  );
};

export default ProductCards;
