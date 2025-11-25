import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productApi from "../../api/productApi";
import cartApi from "../../api/cartApi";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-3xl">
        Product Not Found
      </div>
    );
  }

  // ---------------- IMAGE URL ----------------
  const imageUrl = `${import.meta.env.VITE_API_BASE}${product.image}`;

  // ---------------- BUY NOW ----------------
  const handleBuyNow = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      alert("Please login to add the product to cart.");
      navigate("/login");
      return;
    }

    try {
      await cartApi.addToCart({
        product_id: product.id,
        quantity: 1,
      });

      navigate("/cart");
    } catch (err) {
      console.error("Add to cart error:", err);

      if (err.response?.status === 401) {
        alert("Your session expired. Please login again.");
        navigate("/login");
      } else {
        alert("Unable to add to cart. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020b19] text-white px-6 md:px-20 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.model_name}
            className="w-full max-w-lg rounded-xl shadow-lg object-contain bg-[#0d1a2c] p-4"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            {product.model_name}
          </h1>

          <p className="text-gray-300 text-lg mb-6">{product.description}</p>

          <div className="space-y-3 text-lg">
            <p><span className="font-semibold">Product Details:</span> {product.product_details}</p>
            <p><span className="font-semibold">Hashrate:</span> {product.hashrate}</p>
            <p><span className="font-semibold">Power:</span> {product.power}</p>
            <p><span className="font-semibold">Algorithm:</span> {product.algorithm}</p>
            <p><span className="font-semibold">Minable Coins:</span> {product.minable_coins}</p>
            <p><span className="font-semibold">Hosting Fee Per KW:</span> ${product.hosting_fee_per_kw}</p>
          </div>

          <p className="text-3xl font-bold text-orange-400 mt-6">
            $ {product.price}
          </p>

          <button
            className="mt-8 bg-green-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-all"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>

          <button
            className="mt-8 bg-amber-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all ml-4"
            onClick={() => navigate(`/rent-checkout/${product.id}`)}
          >
            Rent Now
          </button>
        </div>
      </div>

      <div className="mt-20 bg-[#0a1628] p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-green-300 mb-4">
          About this miner
        </h2>
        <p className="text-gray-300 leading-relaxed">
          This miner offers high performance, long-term durability,
          and optimized power efficiency.
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
