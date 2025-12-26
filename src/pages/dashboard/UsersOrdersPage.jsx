import React, { useEffect, useState } from "react";
import ordersApi from "../../api/ordersApi";

const UsersOrdersPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = async () => {
    try {
      setLoading(true);

      const [buyRes, rentRes, hostRes] = await Promise.all([
        ordersApi.getMyOrders(),
        ordersApi.getMyRentals(),
        ordersApi.getMyHostingRequests(),
      ]);

      // -------- BUY --------
      const buyOrders = (buyRes.data || []).map((o) => ({
        id: o.id,
        type: "buy",
        title: `Order #${o.id}`,
        amount: o.total_amount,
        date: o.created_at,
        items: o.items,
      }));

      // -------- RENT --------
      const rentOrders = (rentRes.data || []).map((r) => ({
        id: r.id,
        type: "rent",
        title: r.product_name,
        amount: r.amount_paid,
        date: r.start_date,
      }));

      // -------- HOSTING --------
      const hostingOrders = (hostRes.data || []).map((h) => ({
        id: h.id,
        type: "hosting",
        title: `Hosting (${h.hosting_location})`,
        amount: h.total_amount,
        date: h.created_at,
      }));

      // Merge + sort by latest
      const merged = [...buyOrders, ...rentOrders, ...hostingOrders].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setItems(merged);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="py-8 text-center">Loading orders...</p>;
  }

  if (!items.length) {
    return <p className="py-8 text-center">No orders found</p>;
  }

  const badgeClass = (type) => {
    if (type === "buy") return "bg-green-100 text-green-700";
    if (type === "rent") return "bg-blue-100 text-blue-700";
    return "bg-purple-100 text-purple-700";
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">My Orders</h2>

      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className="border rounded-lg p-5 bg-white"
          >
            {/* Header */}
            <div className="flex justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{item.title}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${badgeClass(
                      item.type
                    )}`}
                  >
                    {item.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">
                  ${Number(item.amount).toFixed(2)}
                </p>
              </div>
            </div>

            {/* BUY ITEMS ONLY */}
            {item.type === "buy" && item.items && (
              <div className="border-t pt-3 space-y-1 text-sm">
                {item.items.map((i) => (
                  <div key={i.id} className="flex justify-between">
                    <span>
                      {i.product_name || i.bundle_name || "Item"}
                    </span>
                    <span>× {i.quantity}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Invoice button (UNCHANGED) */}
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
