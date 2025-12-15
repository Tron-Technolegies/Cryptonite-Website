import { createContext, useContext, useEffect, useState } from "react";
import cartApi from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD CART (NORMALIZED) ================= */
  const loadCart = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setCart([]);
      return;
    }

    try {
      const res = await cartApi.getCart();

      const normalizedCart = Array.isArray(res.data)
        ? res.data.map((item) => ({
            id: item.id,

            // ✅ SAFE NAME RESOLUTION
            name:
              item.product?.name ??
              item.product_name ??
              item.productTitle ??
              item.name ??
              "Product",

            // ✅ SAFE PRICE RESOLUTION
            price: Number(
              item.product?.price ??
              item.product_price ??
              item.price ??
              0
            ),

            // ✅ SAFE QUANTITY RESOLUTION
            qty: Number(item.quantity ?? item.qty ?? 1),
          }))
        : [];

      setCart(normalizedCart);
    } catch (err) {
      console.error("Error loading cart:", err);
      setCart([]);
    }
  };

  /* ================= ADD TO CART ================= */
  const addToCart = async (productId, qty = 1) => {
    try {
      await cartApi.addToCart({
        product_id: productId,
        quantity: qty,
      });
      await loadCart();
    } catch (err) {
      console.error("Add to cart error:", err);
      throw err;
    }
  };

  /* ================= UPDATE QUANTITY ================= */
  const updateQty = async (id, qty) => {
    try {
      await cartApi.updateCart(id, { quantity: qty });
      await loadCart();
    } catch (err) {
      console.error("Update qty error:", err);
    }
  };

  /* ================= REMOVE ITEM ================= */
  const removeFromCart = async (id) => {
    try {
      await cartApi.deleteItem(id);
      await loadCart();
    } catch (err) {
      console.error("Remove item error:", err);
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadCart();
      setLoading(false);
    };
    init();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQty,
        removeFromCart,
        reloadCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
