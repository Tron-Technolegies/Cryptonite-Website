import React from "react";
// import { useCart } from "../context/CartContext";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQty } = useCart();

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
                src={item.image}
                className="w-24 h-24 object-contain rounded-lg"
              />

              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-orange-400">{item.price}</p>
              </div>
            </div>

            {/* Qty Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  updateQty(item.id, Math.max(1, item.qty - 1))
                }
                className="bg-gray-700 px-3 py-1 rounded"
              >
                -
              </button>

              <span className="text-lg">{item.qty}</span>

              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="bg-gray-700 px-3 py-1 rounded"
              >
                +
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
