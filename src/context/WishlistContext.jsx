import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredWishlist, saveStoredWishlist } from "../utils/localStorage";
import { foods } from "../data/foods";
import { useToast } from "./ToastContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(() => getStoredWishlist());
  const { addToast } = useToast();

  useEffect(() => {
    saveStoredWishlist(wishlistIds);
  }, [wishlistIds]);

  const toggleWishlist = (foodItem) => {
    const isPresent = wishlistIds.includes(foodItem.id);
    if (isPresent) {
      setWishlistIds((prev) => prev.filter((id) => id !== foodItem.id));
      addToast(`Removed "${foodItem.name}" from wishlist`, "info");
    } else {
      setWishlistIds((prev) => [...prev, foodItem.id]);
      addToast(`Saved "${foodItem.name}" to your wishlist`, "success");
    }
  };

  const isInWishlist = (foodId) => {
    return wishlistIds.includes(foodId);
  };

  const removeFromWishlist = (foodId) => {
    setWishlistIds((prev) => prev.filter((id) => id !== foodId));
  };

  const clearWishlist = () => {
    setWishlistIds([]);
  };

  // Resolve full dish objects
  const wishlistItems = wishlistIds
    .map((id) => foods.find((f) => f.id === id))
    .filter(Boolean);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        wishlistCount: wishlistIds.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
