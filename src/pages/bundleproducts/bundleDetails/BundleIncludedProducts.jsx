import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import bundleProductApi from "../../../api/bundleProductApi";

const BundleIncludedProducts = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncluded = async () => {
      try {
        const res = await bundleProductApi.getOne(id);
        setItems(res.data.items || []);
      } catch (err) {
        console.error("Failed to load bundle products", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIncluded();
  }, [id]);

  if (loading || !items.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mt-20">
      <h2 className="text-2xl font-bold mb-6">Included Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.product_id} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold">{item.product_name}</h3>

            <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>

            <p className="text-green-600 font-semibold mt-2">${item.product_price}</p>

            <Link
              to={`/product/${item.product_id}`}
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
