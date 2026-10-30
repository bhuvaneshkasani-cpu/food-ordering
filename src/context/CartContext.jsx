import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredCart, saveStoredCart, AVAILABLE_COUPONS } from "../utils/localStorage";
import { useToast } from "./ToastContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => getStoredCart());
  const [coupon, setCoupon] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    saveStoredCart(items);
  }, [items]);

  const addToCart = (foodItem, quantity = 1) => {
    if (quantity <= 0) return;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === foodItem.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prevItems, { ...foodItem, quantity }];
      }
    });

    addToast(`Added "${foodItem.name}" to your cart`, "success");
  };

  const removeFromCart = (foodId) => {
    const itemToRemove = items.find((item) => item.id === foodId);
    setItems((prevItems) => prevItems.filter((item) => item.id !== foodId));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.name}" from cart`, "info");
    }
  };

  const updateQuantity = (foodId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(foodId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === foodId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  // Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // Delivery: $8 flat rate, complimentary above $100
  const deliveryCharge = items.length === 0 ? 0 : subtotal >= 100 ? 0 : 8.00;

  // Calculate discount
  let discount = 0;
  if (coupon) {
    if (subtotal >= coupon.minOrder) {
      if (coupon.discountPercent) {
        discount = (subtotal * coupon.discountPercent) / 100;
      } else if (coupon.fixedDiscount) {
        discount = coupon.fixedDiscount;
      }
    } else {
      // Order fell below min order
      // we keep coupon but discount is 0 until reached
      discount = 0;
    }
  }

  const finalPayable = Math.max(0, subtotal - discount + deliveryCharge);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = (codeStr) => {
    if (!codeStr || !codeStr.trim()) {
      addToast("Please enter a coupon code", "warning");
      return { success: false, error: "Empty code" };
    }

    const cleanCode = codeStr.trim().toUpperCase();
    const foundCoupon = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);

    if (!foundCoupon) {
      addToast(`Invalid code "${cleanCode}". Try LUXE20 or GOLDEN10`, "error");
      return { success: false, error: "Invalid coupon" };
    }

    if (subtotal < foundCoupon.minOrder) {
      addToast(
        `Code "${cleanCode}" requires a minimum order of $${foundCoupon.minOrder.toFixed(2)}`,
        "warning"
      );
      return {
        success: false,
        error: `Minimum order of $${foundCoupon.minOrder} required`
      };
    }

    setCoupon(foundCoupon);
    addToast(`Coupon "${foundCoupon.code}" applied successfully!`, "success");
    return { success: true };
  };

  const removeCoupon = () => {
    setCoupon(null);
    addToast("Coupon removed", "info");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        deliveryCharge,
        discount,
        coupon,
        totalAmount: finalPayable,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
