import React from "react";
import cartApi from "../../../../api/cartApi";

const OrderSummary = ({ cart = [], reloadCart }) => {

  // Fixed helper functions to access nested product data correctly
  const getQty = (item) => Number(item?.quantity ?? 1);
  const getPrice = (item) => Number(item?.product?.price ?? 0);
  const getTitle = (item) => item?.product?.model_name || item?.product?.name || "Product";
  const getImage = (item) => item?.product?.image || "/placeholder.png";

  const subtotal = cart.reduce(
    (acc, item) => acc + getPrice(item) * getQty(item),
    0
  );

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    try {
      await cartApi.updateQty(id, { quantity: qty });
      if (reloadCart) {
        reloadCart();
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      await cartApi.removeItem(id);
      if (reloadCart) {
        reloadCart();
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  return (
    <div className="bg-[#f7fbf9] border border-[#e5efe9] rounded-xl p-6">

      <div className="space-y-6">
        {cart.map((item) => {
          const qty = getQty(item);
          const price = getPrice(item);
          const title = getTitle(item);
          const image = getImage(item);
          
          return (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4"
            >
              <img
                src={image}
                alt={title}
                className="w-20 h-20 object-contain rounded-md border bg-gray-50"
              />

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">
                    {title}
                  </h4>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  {item?.product?.th_s || "10 TH/s"}
                </p>

                <p className="font-semibold text-gray-900 mb-4">
                  Price: ${price.toLocaleString()}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() => updateQty(item.id, qty - 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      disabled={qty <= 1}
                    >
                      −
                    </button>

                    <span className="px-4 py-1 text-sm border-x">
                      {qty}
                    </span>

                    <button
                      onClick={() => updateQty(item.id, qty + 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-orange-500 hover:text-orange-600 hover:underline transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-[#e1f1e7] rounded-lg px-6 py-4 flex justify-between items-center">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="font-bold text-green-600 text-lg">
          ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;