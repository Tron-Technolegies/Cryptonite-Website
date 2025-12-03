import React from "react";
import miningProducts from "../../utils/products";
import { FiTrendingUp, FiZap, FiMapPin } from "react-icons/fi";

const ProductCards = () => {
  const topProducts = miningProducts.slice(0, 3); 

  return (
    <section className="bg-[#F8FBF9] py-20 px-6 md:px-16">
      
     
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase josefin-sans">
          Premium Mining <br /> Equipment
        </h2>
        <p className="text-(--text-black-color) mt-2 text-base dm-sans">
          Industry leading ASIC miners for maximum efficiency and profitability
        </p>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid gap-10 md:grid-cols-3">
        {topProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition p-0 overflow-hidden bg-white"
          >
            {/* IMAGE */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">

              {/* NAME + PRICE */}
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-black dm-sans">{product.name}</h3>

                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                  {product.price}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-black mt-2 text-base leading-relaxed line-clamp-3 font-normal dm-sans">
                {product.description}
              </p>

              {/* SPECS */}
              <div className="mt-5 space-y-3">
                {/* Hashrate */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiTrendingUp className="text-(--primary-color)" />
                    <span>Hashrate</span>
                  </div>
                  <span className="font-semibold text-black">{product.hashRate}</span>
                </div>

                {/* Power */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiZap className="text-(--primary-color)" />
                    <span>Power</span>
                  </div>
                  <span className="font-semibold text-black">{product.powerConsumption}</span>
                </div>

                {/* Locations */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMapPin className="text-(--primary-color)" />
                    <span>Location</span>
                  </div>
                  <span className="font-semibold text-black">Multiple Locations</span>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="mt-6 flex justify-between gap-4">
                <button className="w-1/2 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
                  Learn More
                </button>

                <button className="w-1/2 py-2 bg-(--primary-color) text-white rounded-lg hover:brightness-110 transition text-sm font-medium">
                  Order Now
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="text-center mt-14">
        <button className="border border-gray-300 py-3 px-10 rounded-full text-sm font-medium hover:bg-gray-100 transition">
          View All Equipment →
        </button>
      </div>

    </section>
  );
};

export default ProductCards;
