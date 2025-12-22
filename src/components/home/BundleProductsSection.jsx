import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import { getImageUrl } from "../../utils/imageUtils";
import bundleProductApi from "../../api/bundleProductApi";
import { Link } from "react-router-dom";
import { FiMapPin, FiTrendingUp, FiZap } from "react-icons/fi";

export default function BundleProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await bundleProductApi.getAll();
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(data.slice(0, 3)); // first 3 products
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#F8FBF9] py-20 px-6 md:px-16 text-center">
        Loading products...
      </section>
    );
  }

  return (
    <section className="bg-[#F8FBF9] py-20 px-6 md:px-16">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase josefin-sans">
          Bundle Products
        </h2>
        <p className="text-black mt-2 text-base dm-sans ">
          Choose the perfect package for your mining needs
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition p-0 overflow-hidden bg-white"
          >
            {/* IMAGE */}
            <img
              src={getImageUrl(product.image)}
              alt={product.model_name}
              className="w-full h-64 object-contain bg-gray-50 p-6"
            />

            <div className="p-6">
              {/* NAME + PRICE */}
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-black dm-sans">{product.model_name}</h3>

                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                  ${product.price}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-black mt-2 text-base leading-relaxed line-clamp-3 dm-sans">
                {product.description}
              </p>

              {/* SPECS */}
              <div className="mt-5 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiTrendingUp className="text-green-600" />
                    <span>Hashrate</span>
                  </div>
                  <span className="font-semibold text-black">{product.total_hashrate}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiZap className="text-green-600" />
                    <span>Power</span>
                  </div>
                  <span className="font-semibold text-black">{product.total_power}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMapPin className="text-green-600" />
                    <span>Hosting Fee/KW</span>
                  </div>
                  <span className="font-semibold text-black">${product.hosting_fee_per_kw}</span>
                </div>
              </div>

              {/* SINGLE CTA */}
              <div className="mt-6">
                <Link
                  to={`/bundles/${product.id}`}
                  className="block w-full py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold text-center"
                >
                  Know More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW ALL */}
      <div className="text-center mt-14">
        <Link
          to="/bundles"
          className="border border-gray-300 py-3 px-10 rounded-full text-sm font-medium hover:bg-gray-100 transition inline-block"
        >
          View All Bundle Product →
        </Link>
      </div>
    </section>
  );
}
