import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ArrowRight,
  Trash2,
  Tag,
  ShieldCheck,
  CheckCircle2,
  X
} from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const {
    items,
    subtotal,
    deliveryCharge,
    discount,
    coupon,
    totalAmount,
    totalCount,
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput("");
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page" style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="empty-state" style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 40px" }}>
            <div className="empty-state-icon">
              <ShoppingBag size={34} />
            </div>
            <h2 className="empty-state-title">Your Order Bag is Empty</h2>
            <p className="empty-state-desc">
              Indulge your palate with our Michelin-inspired creations, hand-cut pastas, and wood-fired artisanal pizzas.
            </p>
            <Link to="/menu" className="btn btn-primary btn-lg">
              Explore Haute Cuisine <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const freeDeliveryThreshold = 100;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="cart-page" style={{ padding: "50px 0 90px" }}>
      <div className="container">
        {/* Page Title */}
        <div className="section-header" style={{ textAlign: "left", marginBottom: "32px" }}>
          <span className="section-badge">Your Selection</span>
          <h1 className="section-title">The Epicurean Bag</h1>
          <p className="section-subtitle" style={{ margin: 0 }}>
            Review your gourmet courses before proceeding to white-glove dispatch.
          </p>
        </div>

        {/* Free Delivery Bar */}
        {amountNeededForFreeDelivery > 0 ? (
          <div
            style={{
              backgroundColor: "rgba(198, 166, 107, 0.12)",
              border: "1px solid rgba(198, 166, 107, 0.3)",
              borderRadius: "8px",
              padding: "12px 20px",
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.88rem"
            }}
          >
            <span>
              Add <strong style={{ color: "#C6A66B" }}>${amountNeededForFreeDelivery.toFixed(2)}</strong> more to receive <strong>Complimentary White-Glove Delivery</strong>
            </span>
            <Link to="/menu" style={{ color: "#C6A66B", fontWeight: 600, textTransform: "uppercase", fontSize: "0.78rem" }}>
              Add Courses &rarr;
            </Link>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#edf7ed",
              border: "1px solid rgba(46, 125, 50, 0.25)",
              borderRadius: "8px",
              padding: "12px 20px",
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#2e7d32",
              fontSize: "0.88rem",
              fontWeight: 600
            }}
          >
            <CheckCircle2 size={18} /> You have unlocked Complimentary White-Glove Concierge Delivery!
          </div>
        )}

        {/* Cart Main Split Layout */}
        <div className="cart-layout">
          {/* Left: Items List */}
          <div>
            <div className="cart-items-panel">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid #E6DED2" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#242424" }}>
                  Items Selected ({totalCount})
                </span>
                <button
                  onClick={clearCart}
                  style={{
                    color: "var(--color-muted-grey)",
                    fontSize: "0.8rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px"
                  }}
                >
                  <Trash2 size={13} /> Clear Bag
                </button>
              </div>

              <div>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Link to="/menu" className="btn btn-secondary btn-sm">
                ← Continue Browsing Menu
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="order-summary-box">
            <h3 className="summary-title">Order Overview</h3>

            <div className="summary-line">
              <span>Courses Subtotal</span>
              <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-line">
              <span>White-Glove Delivery</span>
              <span>
                {deliveryCharge === 0 ? (
                  <span style={{ color: "#27ae60", fontWeight: 600 }}>FREE</span>
                ) : (
                  `$${deliveryCharge.toFixed(2)}`
                )}
              </span>
            </div>

            {discount > 0 && (
              <div className="summary-line highlight">
                <span>Privilege Voucher Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            {/* Promo Code Input */}
            <div className="coupon-box">
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#242424", textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: "6px" }}>
                <Tag size={14} color="#C6A66B" /> Privilege Voucher
              </span>

              {coupon ? (
                <div className="active-coupon-badge">
                  <div>
                    <strong>{coupon.code}</strong> — {coupon.description}
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ color: "#888", display: "flex" }}
                    aria-label="Remove coupon"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="coupon-form">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="E.g. LUXE20 or GOLDEN10"
                    className="coupon-input"
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Total */}
            <div className="summary-total">
              <span>Total Payable</span>
              <span style={{ color: "var(--color-champagne-gold)", fontFamily: "var(--font-serif)" }}>
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="btn btn-primary btn-lg"
              style={{ width: "100%", marginTop: "24px" }}
            >
              Proceed to Checkout <ArrowRight size={16} />
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px", color: "var(--color-muted-grey)", fontSize: "0.78rem" }}>
              <ShieldCheck size={14} color="#C6A66B" /> 100% Thermal Freshness Guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
