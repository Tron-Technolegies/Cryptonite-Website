import React, { useEffect, useState } from "react";
import cartApi from "../../api/cartApi";
import { FiX, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
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
      console.error("Cart load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) loadCart();
  }, [isOpen]);

  const handleQtyChange = async (id, qty) => {
    if (qty < 1) return;
    await cartApi.updateQty(id, { quantity: qty });
    loadCart();
  };

  const handleRemove = async (id) => {
    await cartApi.removeItem(id);
    loadCart();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* DRAWER */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">
            Cart ({cart.length})
          </h2>
          <button onClick={onClose}>
            <FiX size={22} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : cart.length === 0 ? (
            <p className="text-center text-gray-500">
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center border rounded-lg p-3"
              >
                <img
                  src={item.product?.image}
                  alt={item.product?.model_name}
                  className="w-16 h-16 object-contain border rounded"
                />

                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {item.product?.model_name}
                  </p>
                  <p className="text-green-600 font-semibold text-sm">
                    ${item.product?.price}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        handleQtyChange(item.id, item.quantity - 1)
                      }
                      className="px-2 border rounded"
                    >
                      -
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQtyChange(item.id, item.quantity + 1)
                      }
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t p-5">
          <div className="flex justify-between mb-3 text-sm">
            <span>Total</span>
            <span className="font-semibold text-green-600">
              ${total}
            </span>
          </div>

          <p className="text-xs text-gray-500 mb-3">
            Tax included and shipping calculated at checkout
          </p>

          <button
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
          >
            Check Out
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
