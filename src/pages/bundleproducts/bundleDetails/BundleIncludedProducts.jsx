import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import bundleProductApi from "../../../api/bundleProductApi";
import productApi from "../../../api/productApi";

const BundleIncludedProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncluded = async () => {
      try {
        // 1️⃣ Get bundle
        const bundleRes = await bundleProductApi.getOne(id);
        const productIds = bundleRes.data.products || [];

        if (!productIds.length) {
          setProducts([]);
          return;
        }

        // 2️⃣ Fetch products in parallel
        const requests = productIds.map((pid) => productApi.getOne(pid));

        const responses = await Promise.all(requests);
        const fullProducts = responses.map((r) => r.data);

        setProducts(fullProducts);
      } catch (err) {
        console.error("Failed to load bundle products", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIncluded();
  }, [id]);

  if (loading) return null;
  if (!products.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mt-20">
      <h2 className="text-2xl font-bold mb-6">Included Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold">{p.model_name}</h3>
            <p className="text-sm text-gray-500 mt-1">Hashrate: {p.hashrate}</p>

            <Link
              to={`/product/${p.id}`}
              className="text-green-600 text-sm font-semibold mt-3 inline-block"
            >
              View Product →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BundleIncludedProducts;
