import React, { useEffect, useState } from "react";
import cartApi from "../../api/cartApi";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";
import { getImageUrl } from "../../utils/imageUtils";

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (cart.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Your cart is empty
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 md:px-24 py-20">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <FiArrowLeft size={18} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold mb-14 text-gray-900 josefin-sans">
        Shopping Cart
      </h1>

      {/* CART ITEMS */}
      <div className="space-y-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="
              bg-white
              rounded-3xl
              border border-gray-200
              shadow-sm
              p-6 md:p-8
              flex flex-col md:flex-row
              md:items-center
              justify-between
              gap-10
            "
          >
            {/* PRODUCT */}
            <div className="flex items-center gap-8">
              <div className="w-28 h-28 bg-gray-50 rounded-2xl flex items-center justify-center">
                <img
                  src={getImageUrl(item.product?.image)}
                  alt={item.product?.model_name}
                  className="w-24 h-24 object-contain"
                  loading="lazy"
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {item.product?.model_name}
                </h2>
                <p className="text-green-600 font-semibold text-lg mt-2">
                  ${item.product?.price}
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-6">
              {/* QTY */}
              <div className="flex items-center gap-5 bg-gray-50 rounded-full px-6 py-3 border">
                <button
                  onClick={() =>
                    handleQtyChange(item.id, item.quantity - 1)
                  }
                  className="text-xl font-medium"
                >
                  −
                </button>

                <span className="min-w-[24px] text-center font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    handleQtyChange(item.id, item.quantity + 1)
                  }
                  className="text-xl font-medium"
                >
                  +
                </button>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => handleRemove(item.id)}
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  border
                  text-gray-400
                  hover:text-red-500
                  hover:border-red-500
                  transition
                "
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DIVIDER */}
      <div className="my-16 border-t border-gray-200" />

      {/* TOTAL + CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div>
          <p className="text-gray-500 mb-2 text-sm">Total Amount</p>
          <p className="text-4xl font-bold text-green-600">
            ${total}
          </p>
        </div>

        {/* <button
          onClick={() => navigate("/checkout")}
          className="
            w-full md:w-auto
            bg-green-600 hover:bg-green-700
            text-white
            px-14 py-4
            rounded-full
            text-lg
            font-semibold
            transition
          "
        >
          Proceed to Payment
        </button> */}
      </div>
    </div>
  );
};

export default CartPage;
