import React, { useEffect, useState } from "react";
import cartApi from "../../api/cartApi";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Cart Items
  const loadCart = async () => {
    try {
      const res = await cartApi.getCart();
      setCart(res.data);

      const totalRes = await cartApi.getTotal();
      setTotal(totalRes.data.total_price);

      setLoading(false);
    } catch (err) {
      console.error("Error loading cart:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCart();
  }, []);

  // Update quantity
  const handleQtyChange = async (itemId, newQty) => {
    try {
      await cartApi.updateQty(itemId, { quantity: newQty });
      loadCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Remove item
  const handleRemove = async (itemId) => {
    try {
      await cartApi.removeItem(itemId);
      loadCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#020b19] text-white flex justify-center items-center text-3xl">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white px-6 md:px-20 py-16">
      <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-[#0a1628] p-6 rounded-xl"
          >
            <div className="flex items-center gap-6">
              <img
                src={item.product?.image || item.bundle?.image}
                className="w-24 h-24 object-contain rounded-lg"
              />

              <div>
                <h2 className="text-xl font-semibold">
                  {item.product?.model_name || item.bundle?.name}
                </h2>

                <p className="text-orange-400 text-lg">
                  ₹{item.product?.price || item.bundle?.price}
                </p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  handleQtyChange(item.id, Math.max(1, item.quantity - 1))
                }
                className="bg-gray-700 px-3 py-1 rounded"
              >
                -
              </button>

              <span className="text-lg">{item.quantity}</span>

              <button
                onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                className="bg-gray-700 px-3 py-1 rounded"
              >
                +
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10 bg-[#0a1628] p-6 rounded-xl max-w-md ml-auto">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <p className="text-lg">Total Amount:</p>
        <p className="text-3xl text-green-400 font-bold">₹{total}</p>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-6 w-full bg-green-500 py-3 rounded-lg text-lg font-semibold hover:bg-green-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
