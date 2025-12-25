import { createContext, useContext, useEffect, useState } from "react";
import cartApi from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD CART ================= */
  const loadCart = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      const res = await cartApi.getCart();

      const normalizedCart = Array.isArray(res.data)
        ? res.data.map((item) => ({
            id: item.id,
            quantity: Number(item.quantity ?? 1),
            product: item.product || {
              id: item.product_id,
              name: item.product_name ?? item.name ?? "Product",
              model_name: item.model_name ?? item.product_name,
              price: Number(item.product_price ?? item.price ?? 0),
              image: item.product_image ?? item.image,
            },
          }))
        : [];

      setCart(normalizedCart);
    } catch (err) {
      console.error("Error loading cart:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADD TO CART ================= */
  const addToCart = async (productId, qty = 1) => {
    try {
      const res = await cartApi.addToCart({
        product_id: productId,
        quantity: qty,
      });

      await loadCart();
      return res;
    } catch (err) {
      console.error("Add to cart error:", err);
      throw err;
    }
  };

  /* ================= UPDATE QUANTITY ================= */
  const updateQty = async (cartItemId, newQty) => {
    if (newQty < 1) {
      await removeFromCart(cartItemId);
      return;
    }

    try {
      // ✅ FIXED METHOD NAME
      await cartApi.updateQty(cartItemId, { quantity: newQty });
      await loadCart();
    } catch (err) {
      console.error("Update qty error:", err);
      throw err;
    }
  };

  /* ================= REMOVE ITEM ================= */
  const removeFromCart = async (cartItemId) => {
    try {
      // ✅ FIXED METHOD NAME
      await cartApi.removeItem(cartItemId);
      await loadCart();
    } catch (err) {
      console.error("Remove item error:", err);
      throw err;
    }
  };

  /* ================= CLEAR CART ================= */
  const clearCart = async () => {
    try {
      await Promise.all(
        cart.map((item) => cartApi.removeItem(item.id))
      );
      await loadCart();
    } catch (err) {
      console.error("Clear cart error:", err);
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        reloadCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
