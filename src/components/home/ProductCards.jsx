import React from "react";
import miningProducts from "../../utils/products";

const ProductCards = () => {
  const topProducts = miningProducts.slice(0, 3);

  return (
    <div className="bg-black py-16 px-6 md:px-16">
      
      {/* PRODUCT GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {topProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800"
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-contain p-6"
            />

            {/* Info */}
            <div className="p-6 text-gray-300">
              <h2 className="text-lg font-semibold text-white mb-3">
                {product.name}
              </h2>

              <div className="text-sm space-y-1 mb-4">
                <p>
                  <span className="font-medium text-gray-400">Hashrate:</span>{" "}
                  {product.hashRate}
                </p>
                <p>
                  <span className="font-medium text-gray-400">
                    Power Consumption:
                  </span>{" "}
                  {product.powerConsumption}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Cost:</span>{" "}
                  {product.costPerKwh}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Location:</span>{" "}
                  {product.location}
                </p>
              </div>

              <div className="text-lg font-bold text-green-400 mb-2">
                {product.price}
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* SINGLE CENTER BUTTON */}
      <div className="text-center mt-12">
        <button className="bg-(--primary-color) text-black font-semibold py-3 px-10 rounded-xl hover:brightness-110 transition duration-300">
          Shop Now
        </button>
      </div>

    </div>
  );
};

export default ProductCards;
