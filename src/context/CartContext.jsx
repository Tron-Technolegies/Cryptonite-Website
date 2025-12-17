import { createContext, useContext, useEffect, useState } from "react";
import cartApi from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD CART (PRESERVE STRUCTURE) ================= */
  const loadCart = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      const res = await cartApi.getCart();

      // ✅ PRESERVE ORIGINAL STRUCTURE - Don't strip product object
      const normalizedCart = Array.isArray(res.data)
        ? res.data.map((item) => ({
            id: item.id,
            quantity: Number(item.quantity ?? 1),
            
            // ✅ KEEP ORIGINAL PRODUCT OBJECT
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
      
      // Reload cart after adding
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
      // If quantity is 0 or less, remove the item
      await removeFromCart(cartItemId);
      return;
    }

    try {
      await cartApi.updateCart(cartItemId, { quantity: newQty });
      await loadCart();
    } catch (err) {
      console.error("Update qty error:", err);
      throw err;
    }
  };

  /* ================= REMOVE ITEM ================= */
  const removeFromCart = async (cartItemId) => {
    try {
      await cartApi.deleteItem(cartItemId);
      await loadCart();
    } catch (err) {
      console.error("Remove item error:", err);
      throw err;
    }
  };

  /* ================= CLEAR CART (AFTER PURCHASE) ================= */
  const clearCart = async () => {
    try {
      // If you have a clear cart endpoint
      // await cartApi.clearCart();
      
      // Otherwise remove items one by one
      await Promise.all(cart.map(item => cartApi.deleteItem(item.id)));
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