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

      const normalized = (res.data || [])
        .map((item) => {
          if (!item) return null;

          return {
            id: item.id,
            quantity: Number(item.quantity || 1),

            product: item.product
              ? {
                  id: item.product.id,
                  model_name: item.product.model_name,
                  price: Number(item.product.price || 0),
                  image: item.product.image,
                }
              : null,

            bundle: item.bundle
              ? {
                  id: item.bundle.id,
                  name: item.bundle.name,
                  price: Number(item.bundle.price || 0),
                  image: item.bundle.image,
                }
              : null,
          };
        })
        .filter(Boolean);

      setCart(normalized);
    } catch (err) {
      console.error("Cart load error:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADD TO CART ================= */
  const addToCart = async (payload, qty = 1) => {
    try {
      let body = {};

      // old usage: addToCart(productId)
      if (typeof payload === "number") {
        body = {
          product_id: payload,
          quantity: qty,
        };
      }

      // new usage: addToCart({ product_id, bundle_id })
      else if (typeof payload === "object") {
        body = {
          product_id: payload.product_id || null,
          bundle_id: payload.bundle_id || null,
          quantity: payload.quantity || 1,
        };
      }

      if (!body.product_id && !body.bundle_id) {
        throw new Error("Invalid cart payload");
      }

      await cartApi.addToCart(body);
      await loadCart();
    } catch (err) {
      console.error("Add to cart failed:", err);
      throw err;
    }
  };

  /* ================= UPDATE QUANTITY ================= */
  const updateQty = async (cartItemId, qty) => {
    if (qty < 1) return removeFromCart(cartItemId);

    await cartApi.updateQty(cartItemId, { quantity: qty });
    await loadCart();
  };

  /* ================= REMOVE ================= */
  const removeFromCart = async (id) => {
    await cartApi.removeItem(id);
    await loadCart();
  };

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
        reloadCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
