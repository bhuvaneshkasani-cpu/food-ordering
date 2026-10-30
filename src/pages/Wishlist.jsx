import React from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import FoodCard from "../components/FoodCard";

export default function Wishlist() {
  const { wishlistItems, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart(item, 1);
    });
  };

  if (wishlistCount === 0) {
    return (
      <div className="wishlist-page" style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="empty-state" style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 40px" }}>
            <div className="empty-state-icon">
              <Heart size={34} />
            </div>
            <h2 className="empty-state-title">Your Wishlist is Empty</h2>
            <p className="empty-state-desc">
              Bookmark your favorite culinary masterpieces to revisit or curate for your next celebratory dinner.
            </p>
            <Link to="/menu" className="btn btn-primary btn-lg">
              Explore Our Creations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page" style={{ padding: "50px 0 90px" }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: "left", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span className="section-badge">Private Curation</span>
              <h1 className="section-title">Saved Epicurean Dishes</h1>
              <p className="section-subtitle" style={{ margin: 0 }}>
                You have {wishlistCount} {wishlistCount === 1 ? "course" : "courses"} saved to your private wishlist.
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleAddAllToCart}
                className="btn btn-primary btn-sm"
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <ShoppingBag size={14} /> Add All to Cart
              </button>
              <button
                onClick={clearWishlist}
                className="btn btn-secondary btn-sm"
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Trash2 size={14} /> Clear All
              </button>
            </div>
          </div>
        </div>

        <div className="food-grid">
          {wishlistItems.map((dish) => (
            <FoodCard key={dish.id} food={dish} />
          ))}
        </div>
      </div>
    </div>
  );
}
