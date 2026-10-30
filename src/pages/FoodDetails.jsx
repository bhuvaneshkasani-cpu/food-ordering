import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Plus,
  Minus,
  ArrowLeft,
  Clock,
  Flame,
  Users,
  ShieldCheck,
  Sparkles,
  ShoppingBag
} from "lucide-react";
import { foods } from "../data/foods";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import FoodCard from "../components/FoodCard";

export default function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Scroll to top when dish changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [id]);

  const dish = foods.find((f) => f.id === id);

  if (!dish) {
    return (
      <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Dish Not Found</h2>
        <p style={{ color: "#888", margin: "16px 0 24px" }}>
          The requested culinary creation may have been archived from our current seasonal menu.
        </p>
        <Link to="/menu" className="btn btn-primary">
          Return to Menu
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(dish.id);

  // Recommendations: Other dishes in same category or chef specials
  const relatedDishes = foods
    .filter((f) => f.id !== dish.id && (f.category === dish.category || f.isSpecial))
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(dish, quantity);
  };

  return (
    <div className="food-details-page" style={{ padding: "40px 0 80px" }}>
      <div className="container">
        {/* Back navigation */}
        <div style={{ marginBottom: "24px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--color-charcoal)",
              fontSize: "0.85rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        {/* Main Details Grid */}
        <div className="food-details-grid">
          {/* Left: Large Image */}
          <div className="food-details-image">
            <img src={dish.image} alt={dish.name} />
          </div>

          {/* Right: Info & Actions */}
          <div className="food-details-info">
            <div className="food-details-header">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", fontWeight: 700 }}>
                    {dish.category}
                  </span>
                  <div
                    className={`diet-indicator ${dish.isVeg ? "veg" : "non-veg"}`}
                    title={dish.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                  >
                    <span className="dot"></span>
                  </div>
                </div>

                {dish.isSpecial && (
                  <span className="badge-gold">
                    <Sparkles size={11} /> Chef's Reserve
                  </span>
                )}
              </div>

              <h1 className="food-details-title">{dish.name}</h1>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div className="food-rating-pill" style={{ fontSize: "0.95rem" }}>
                  <Star size={16} fill="#C6A66B" />
                  <strong>{dish.rating.toFixed(1)}</strong>
                  <span style={{ color: "#888" }}>({dish.reviewsCount} reviews)</span>
                </div>
                <span style={{ color: "#ccc" }}>•</span>
                <span style={{ color: "#27ae60", fontSize: "0.85rem", fontWeight: 600 }}>
                  ● In Stock (Prepared to Order)
                </span>
              </div>
            </div>

            <div className="food-details-price">
              ${dish.price.toFixed(2)}
            </div>

            {/* Nutrition & Specs Chips */}
            <div className="food-details-chips">
              {dish.prepTime && (
                <div className="chip-item">
                  <Clock size={15} color="#C6A66B" />
                  <span>{dish.prepTime}</span>
                </div>
              )}
              {dish.calories && (
                <div className="chip-item">
                  <Flame size={15} color="#C6A66B" />
                  <span>{dish.calories}</span>
                </div>
              )}
              {dish.serves && (
                <div className="chip-item">
                  <Users size={15} color="#C6A66B" />
                  <span>{dish.serves}</span>
                </div>
              )}
            </div>

            <p className="food-details-desc">
              {dish.longDescription || dish.description}
            </p>

            {/* Ingredients */}
            {dish.ingredients && dish.ingredients.length > 0 && (
              <div className="food-ingredients-box">
                <div className="food-ingredients-title">Artisanal Ingredients & Elements</div>
                <div className="ingredient-tags">
                  {dish.ingredients.map((ing, i) => (
                    <span key={i} className="ingredient-tag">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Action Buttons */}
            <div className="food-details-actions">
              <div className="quantity-control">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="qty-val">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                style={{ flex: 1, padding: "14px 24px" }}
              >
                <ShoppingBag size={17} /> Add to Cart — ${(dish.price * quantity).toFixed(2)}
              </button>

              <button
                className={`food-card-wishlist ${isFavorited ? "active" : ""}`}
                onClick={() => toggleWishlist(dish)}
                style={{
                  position: "static",
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  border: "1px solid #E6DED2"
                }}
                aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                title={isFavorited ? "Remove from wishlist" : "Save to wishlist"}
              >
                <Heart size={20} fill={isFavorited ? "#c0392b" : "none"} />
              </button>
            </div>
          </div>
        </div>

        {/* Related Dishes Recommendations */}
        {relatedDishes.length > 0 && (
          <div style={{ marginTop: "70px" }}>
            <div className="section-header" style={{ textAlign: "left", marginBottom: "28px" }}>
              <span className="section-badge">Harmonious Pairings</span>
              <h2 style={{ fontSize: "1.8rem" }}>Complementary Culinary Creations</h2>
            </div>
            <div className="food-grid">
              {relatedDishes.map((item) => (
                <FoodCard key={item.id} food={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
