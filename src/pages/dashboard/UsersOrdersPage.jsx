import React, { useEffect, useState } from "react";

const UsersOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access");
      if (!token) {
        setError("Please login to view your orders");
        return;
      }

      const response = await fetch("/api/orders/my-orders/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // 🔥 FIXES 304 Not Modified issue
      });

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Orders fetch error:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const getStatusColor = (status) => {
    const map = {
      completed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return map[status?.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  /* ---------- ERROR ---------- */
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center text-red-700">
        {error}
      </div>
    );
  }

  /* ---------- EMPTY ---------- */
  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-semibold text-gray-800">
          No Orders Found
        </h3>
        <p className="text-gray-600 mt-2">
          You haven’t placed any orders yet.
        </p>
      </div>
    );
  }

  /* ---------- ORDERS ---------- */
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">My Orders</h2>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-6 hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">
                  Order #{order.id}
                </h3>
                <p className="text-sm text-gray-600">
                  {formatDate(order.created_at)}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                <p className="text-lg font-bold mt-2">
                  {formatPrice(order.total_amount)}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="border-t pt-4 space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>
                    {item.product_name} × {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t pt-4 flex justify-end">
              <button
                onClick={() =>
                  (window.location.href = `/orders/${order.id}`)
                }
                className="text-green-600 font-medium text-sm hover:underline"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersOrdersPage;
