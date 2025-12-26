import React, { useEffect, useState } from "react";
import ordersApi from "../../api/ordersApi";

const UsersOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await ordersApi.getMyOrders();
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="py-8 text-center">Loading orders...</p>;
  if (error) return <p className="py-8 text-center text-red-500">{error}</p>;
  if (!orders.length) return <p className="py-8 text-center">No orders found</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">My Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-5 bg-white"
          >
            {/* Header */}
            <div className="flex justify-between mb-4">
              <div>
                <p className="font-semibold">
                  Order #{order.id}
                </p>
                <span className="inline-block mt-1 text-xs px-2 py-1 rounded bg-blue-100 text-primary-color">
                  Purchased
                </span>
              </div>

              <div className="text-right">
                <p className="font-bold">₹{order.total_amount}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="border-t pt-4 space-y-2">
              {order.items.map((item) => {
                const name =
                  item.product_name ||
                  item.bundle_name ||
                  "Unknown item";

                return (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span>{name}</span>
                    <span>× {item.quantity}</span>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="border-t pt-4 mt-4 flex justify-end">
              <button
                disabled
                title="Invoice feature coming soon"
                className="px-4 py-2 text-sm rounded border text-gray-400 cursor-not-allowed"
              >
                Download Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersOrdersPage;
