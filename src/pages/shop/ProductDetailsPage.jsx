import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productApi from "../../api/productApi";
import cartApi from "../../api/cartApi";
import { FiChevronLeft, FiShoppingCart } from "react-icons/fi";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {
        const res = await productApi.getOne(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await cartApi.addToCart({
        product_id: product.id,
        quantity: qty,
      });
      navigate("/cart");
    } catch (err) {
      alert("Unable to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 px-6 md:px-20 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8"
      >
        <FiChevronLeft /> Back to Equipment
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT - IMAGES */}
        <div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <img
              src={product.image}
              alt={product.model_name}
              className="w-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-24 h-24 bg-gray-100 rounded-lg"
              >
                <img
                  src={product.image}
                  alt="thumb"
                  className="w-full h-full object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div>
          {/* Tags */}
          <div className="flex gap-3 mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {product.brand || "Bitmain"}
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              In Stock
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-2">
            {product.model_name}
          </h1>

          {/* Rating */}
          <p className="text-sm text-gray-500 mb-4">
            ⭐⭐⭐⭐⭐ (447 reviews)
          </p>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-3xl font-bold text-green-600">
              ${product.price}
            </p>
            <p className="line-through text-gray-400">$3680</p>
            <span className="text-green-600 text-sm font-medium">
              Save 15%
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Spec label="Hashrate" value={product.hashrate} />
            <Spec label="Power" value={product.power} />
            <Spec label="Efficiency" value="29.5 J/TH" />
            <Spec label="Noise Level" value="75 dB" />
          </div>

          {/* Quantity & Cart */}
          <div className="flex items-center gap-4 mb-8">
            <select
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="bg-white border border-gray-300 px-4 py-2 rounded-md"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              <FiShoppingCart /> Add to Cart
            </button>
          </div>

          {/* Trust Info */}
          <div className="grid grid-cols-3 gap-6 text-center text-sm text-gray-600">
            <Trust text="12 months Warranty" />
            <Trust text="Free Shipping (5+ units)" />
            <Trust text="Secure Packaging" />
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="mt-20 bg-white p-8 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About this miner
        </h2>
        <p className="text-gray-600 leading-relaxed">
          This miner delivers industry-leading performance, optimized
          power efficiency, and long-term reliability for professional
          mining operations.
        </p>
      </div>
    </div>
  );
};

/* Reusable Components */

const Spec = ({ label, value }) => (
  <div className="border border-gray-200 rounded-lg p-4 bg-white">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-semibold text-gray-900">{value}</p>
  </div>
);

const Trust = ({ text }) => (
  <div>
    <p className="font-medium">{text}</p>
  </div>
);

export default ProductDetailsPage;
