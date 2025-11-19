import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import miningProducts from "../../utils/products";
import { useCart } from "../../context/CartContext";

const ProductDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  const {addToCart} =  useCart();

  const navigate = useNavigate();

  // find product in dummy data
  const product = miningProducts.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="text-center text-white py-32">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020b19] text-white px-6 md:px-20 py-16">

      {/* Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-lg rounded-xl shadow-lg object-contain"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            {product.name}
          </h1>

          <p className="text-gray-300 text-lg mb-6">
            {product.description}
          </p>

          <div className="space-y-3 text-lg">
            <p><span className="font-semibold">Brand:</span> {product.brand}</p>
            <p><span className="font-semibold">Hash Rate:</span> {product.hashRate}</p>
            <p><span className="font-semibold">Power Consumption:</span> {product.powerConsumption}</p>
            <p><span className="font-semibold">Algorithm:</span> {product.algorithm}</p>
          </div>

          <p className="text-3xl font-bold text-orange-400 mt-6">
            {product.price}
          </p>

          <button className="mt-8 bg-green-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-all" onClick={()=>{addToCart(product); navigate("/cart");}}>
            Buy Now
          </button>
        </div>

      </div>

      {/* Extra Info Section */}
      <div className="mt-20 bg-[#0a1628] p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-green-300 mb-4">About this miner</h2>
        <p className="text-gray-300 leading-relaxed">
          This miner offers high performance, long-term durability, and optimized
          power consumption, making it suitable for small-scale and industrial-level mining setups.
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
