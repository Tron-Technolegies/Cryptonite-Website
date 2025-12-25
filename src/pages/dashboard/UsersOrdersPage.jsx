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
      console.log("🔑 Token exists:", !!token);
      console.log("🔑 Token value:", token ? token.substring(0, 20) + "..." : "null");
      
      if (!token) {
        setError("Please login to view your orders");
        return;
      }

      console.log("📡 Fetching from: /api/orders/my-orders/");
      
      let response = await fetch("/api/orders/my-orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      console.log("📊 Response Status:", response.status);
      console.log("📊 Response OK:", response.ok);
      console.log("📊 Response Headers:", Object.fromEntries(response.headers.entries()));

      // Handle 401 - Token expired, try refresh
      if (response.status === 401) {
        console.log("🔄 Token expired (401), attempting refresh...");
        
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) {
          setError("Session expired. Please login again.");
          // Optionally redirect to login
          // window.location.href = '/login';
          return;
        }

        const refreshResponse = await fetch("/api/auth/token/refresh/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        console.log("🔄 Refresh Response Status:", refreshResponse.status);

        if (refreshResponse.ok) {
          const { access } = await refreshResponse.json();
          localStorage.setItem("access", access);
          console.log("✅ Token refreshed successfully");
          
          // Retry original request with new token
          response = await fetch("/api/orders/my-orders/", {
            headers: {
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          });

          console.log("📊 Retry Response Status:", response.status);
        } else {
          setError("Session expired. Please login again.");
          // Optionally redirect to login
          // window.location.href = '/login';
          return;
        }
      }

      // Read response as text first for debugging
      const responseText = await response.text();
      console.log("📄 Raw Response:", responseText);

      if (!response.ok) {
        setError(`Server Error (${response.status}): ${responseText}`);
        return;
      }

      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("✅ Parsed Data:", data);
      } catch (parseError) {
        console.error("❌ JSON Parse Error:", parseError);
        setError("Invalid response format from server");
        return;
      }
      
      setOrders(Array.isArray(data) ? data : []);
      
      if (Array.isArray(data) && data.length === 0) {
        console.log("ℹ️ No orders found");
      }

    } catch (err) {
      console.error("❌ Fetch Error:", err);
      console.error("❌ Error Stack:", err.stack);
      setError(`Failed to load orders: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return date;
    }
  };

  const formatPrice = (price) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
    } catch (e) {
      return `$${price}`;
    }
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  /* ---------- ERROR ---------- */
  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 mb-2">Error Loading Orders</h3>
              <p className="text-red-700 text-sm">{error}</p>
              <button
                onClick={fetchOrders}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        
        {/* Debug Info */}
        <div className="mt-4 bg-gray-50 border border-gray-200 p-4 rounded-lg text-xs">
          <p className="font-semibold mb-2">🔍 Debug Information:</p>
          <p>• Check browser console (F12) for detailed logs</p>
          <p>• Check Network tab for API request details</p>
          <p>• API Endpoint: /api/orders/my-orders/</p>
          <p>• Token exists: {localStorage.getItem("access") ? "Yes" : "No"}</p>
        </div>
      </div>
    );
  }

  /* ---------- EMPTY ---------- */
  if (!orders.length) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-800">No Orders Found</h3>
        <p className="text-gray-600 mt-2 mb-6">
          You haven't placed any orders yet.
        </p>
        <button
          onClick={() => window.location.href = '/products'}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  /* ---------- ORDERS ---------- */
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
        <button
          onClick={fetchOrders}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Order #{order.id}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {formatDate(order.created_at)} · {order.items?.length || 0} items
                </p>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full font-medium">
                  ● {order.status || 'Completed'}
                </span>
                <p className="text-xl font-bold text-green-600 mt-2">
                  {formatPrice(order.total_amount)}
                </p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="flex flex-wrap gap-4 mt-5">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-lg border border-gray-200 p-3 flex items-center gap-3 min-w-[200px]"
                  >
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.product_name || "Product"}
                      className="w-14 h-14 rounded object-cover bg-gray-200"
                      onError={(e) => {
                        e.target.src = "/placeholder.png";
                      }}
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.product_name || "Unknown Product"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity || 1}
                      </p>
                      <p className="text-sm font-semibold text-green-600 mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No items available</p>
              )}
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => console.log("View details for order:", order.id)}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                👁️ View Details
              </button>
              <button
                onClick={() => {
                  window.location.href = `/invoice/${order.id}`;
                }}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
              >
                📄 Invoice
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Test API Button (Remove in production) */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 mb-2">🔧 Developer Tools:</p>
        <button
          onClick={() => {
            console.log("=== MANUAL API TEST ===");
            fetch("/api/orders/my-orders/", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            })
              .then(r => {
                console.log("Status:", r.status);
                return r.text();
              })
              .then(text => {
                console.log("Response:", text);
                try {
                  console.log("Parsed:", JSON.parse(text));
                } catch (e) {
                  console.log("Not JSON");
                }
              })
              .catch(err => console.error("Error:", err));
          }}
          className="text-xs bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          Test API in Console
        </button>
      </div>
    </div>
  );
};

export default UsersOrdersPage;