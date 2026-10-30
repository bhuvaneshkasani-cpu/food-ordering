import React from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const lineTotal = (Number(item.price) * item.quantity).toFixed(2);

  return (
    <div className="cart-item-row">
      {/* Thumbnail */}
      <div className="cart-item-thumb">
        <img src={item.image} alt={item.name} />
      </div>

      {/* Title & Unit Price */}
      <div className="cart-item-info">
        <h4>
          <Link to={`/dish/${item.id}`} style={{ color: "#242424" }}>
            {item.name}
          </Link>
        </h4>
        <div className="cart-item-price">
          ${Number(item.price).toFixed(2)} each
          {item.isVeg !== undefined && (
            <span style={{ marginLeft: "8px", fontSize: "0.75rem", color: item.isVeg ? "#27ae60" : "#c0392b" }}>
              • {item.isVeg ? "Vegetarian" : "Non-Veg"}
            </span>
          )}
        </div>
      </div>

      {/* Quantity Stepper */}
      <div className="quantity-control">
        <button
          className="qty-btn"
          onClick={handleDecrement}
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <span className="qty-val">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={handleIncrement}
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Subtotal & Delete */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div className="cart-item-subtotal">${lineTotal}</div>
        <button
          className="cart-item-remove"
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.name}`}
          title="Remove item"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}
