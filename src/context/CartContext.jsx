import { createContext, useContext, useEffect, useState } from "react";
import cartApi from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend
  const loadCart = async () => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const res = await cartApi.getCart();
      setCart(res.data);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  // Add to cart
  const addToCart = async (productId, qty = 1) => {
    try {
      await cartApi.addToCart({
        product_id: productId,
        quantity: qty,
      });

      await loadCart(); // refresh cart
    } catch (err) {
      console.error("Add to cart error:", err);
      throw err;
    }
  };

  // Update Quantity
  const updateQty = async (id, qty) => {
    try {
      await cartApi.updateCart(id, { quantity: qty });
      await loadCart();
    } catch (err) {
      console.error("Update qty error:", err);
    }
  };

  // Remove Item
  const removeFromCart = async (id) => {
    try {
      await cartApi.deleteItem(id);
      await loadCart();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Load cart when user logs in
  useEffect(() => {
    loadCart().finally(() => setLoading(false));
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