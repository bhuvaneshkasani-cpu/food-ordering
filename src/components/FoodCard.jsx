import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, Heart, Plus, Sparkles, Clock } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function FoodCard({ food }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const isFavorited = isInWishlist(food.id);

  const handleCardClick = () => {
    navigate(`/dish/${food.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(food, 1);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(food);
  };

  return (
    <div className="food-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      {/* Media & Badges */}
      <div className="food-card-media">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
        />

        {/* Badges Container */}
        <div className="food-card-badges">
          {food.isSpecial && (
            <span className="badge-gold">
              <Sparkles size={11} /> Chef's Reserve
            </span>
          )}
          <div
            className={`diet-indicator ${food.isVeg ? "veg" : "non-veg"}`}
            title={food.isVeg ? "Vegetarian" : "Non-Vegetarian"}
          >
            <span className="dot"></span>
          </div>
        </div>

        {/* Wishlist Button */}
        <button
          className={`food-card-wishlist ${isFavorited ? "active" : ""}`}
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          title={isFavorited ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart size={16} fill={isFavorited ? "#c0392b" : "none"} />
        </button>
      </div>

      {/* Content Body */}
      <div className="food-card-body">
        <div className="food-card-meta">
          <span className="food-card-category">{food.category}</span>
          <div className="food-rating-pill">
            <Star size={13} fill="#C6A66B" />
            <span>{food.rating.toFixed(1)}</span>
            <span style={{ color: "#888", fontSize: "0.72rem" }}>({food.reviewsCount})</span>
          </div>
        </div>

        <h3 className="food-card-title">
          <Link to={`/dish/${food.id}`} onClick={(e) => e.stopPropagation()}>
            {food.name}
          </Link>
        </h3>

        <p className="food-card-desc">{food.description}</p>

        {/* Footer: Price + Add Button */}
        <div className="food-card-footer">
          <div>
            <div className="price-tag">${food.price.toFixed(2)}</div>
            {food.prepTime && (
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.72rem", color: "#888", marginTop: "2px" }}>
                <Clock size={11} /> {food.prepTime}
              </div>
            )}
          </div>

          <button
            className="btn btn-primary food-card-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${food.name} to cart`}
          >
            <Plus size={15} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
