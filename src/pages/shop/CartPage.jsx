import React, { useEffect, useState } from "react";
import cartApi from "../../api/cartApi";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const res = await cartApi.getCart();
      setCart(res.data);

      const totalRes = await cartApi.getTotal();
      setTotal(totalRes.data.total_price);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCart();
  }, []);

  const handleQtyChange = async (id, qty) => {
    if (qty < 1) return;
    await cartApi.updateQty(id, { quantity: qty });
    loadCart();
  };

  const handleRemove = async (id) => {
    await cartApi.removeItem(id);
    loadCart();
  };

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (cart.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Your cart is empty
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 md:px-24 py-20">
      {/* PAGE TITLE */}
      <h1 className="text-4xl font-semibold mb-14">Checkout</h1>

      {/* CART ITEMS */}
      <div className="space-y-10">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-8"
          >
            {/* PRODUCT */}
            <div className="flex items-center gap-6">
              <img
                src={item.product?.image}
                alt={item.product?.model_name}
                className="w-20 h-20 object-contain bg-white rounded-lg p-2"
              />

              <div>
                <h2 className="text-lg font-medium">
                  {item.product?.model_name}
                </h2>
                <p className="text-green-600 font-semibold mt-1">
                  ${item.product?.price}
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-6">
              {/* QTY */}
              <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm">
                <button
                  onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                  className="text-lg"
                >
                  −
                </button>
                <span className="min-w-[20px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                  className="text-lg"
                >
                  +
                </button>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => handleRemove(item.id)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DIVIDER */}
      <div className="my-16 border-t" />

      {/* TOTAL + CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <p className="text-gray-500 mb-1">Total</p>
          <p className="text-3xl font-semibold text-green-600">
            ${total}
          </p>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="
            w-full md:w-auto
            bg-green-500 hover:bg-green-600
            text-white
            px-12 py-4
            rounded-full
            text-lg
            font-medium
            transition
          "
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;
