import React from "react";

const OrderSummary = ({ cart }) => {
  const total = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty ?? item.quantity ?? 1);
    return acc + price * qty;
  }, 0);

  return (
    <div className="bg-[#0a1628] p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

      {cart.length === 0 && (
        <p className="text-gray-400">Your cart is empty</p>
      )}

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center mb-4"
        >
          <p>
            {item.name} × {item.qty ?? item.quantity}
          </p>
          <p>${Number(item.price).toFixed(2)}</p>
        </div>
      ))}

      <hr className="border-gray-700 my-4" />

      <p className="text-xl font-bold">
        Total:{" "}
        <span className="text-green-400">
          ${total.toFixed(2)}
        </span>
      </p>
    </div>
  );
};

export default OrderSummary;
