import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle,
  CreditCard,
  QrCode,
  Banknote,
  Truck,
  ArrowRight,
  Info
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { validateCheckoutForm } from "../utils/validation";
import { getStoredOrders, saveStoredOrders } from "../utils/localStorage";

export default function Checkout() {
  const { items, subtotal, deliveryCharge, discount, totalAmount, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Prefill with logged in user data if available
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    pincode: user?.pincode || "",
    instructions: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' | 'upi'
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>No Items to Checkout</h2>
        <p style={{ color: "#888", margin: "16px 0 24px" }}>
          Your shopping bag is empty. Please select your desired dishes before checking out.
        </p>
        <Link to="/menu" className="btn btn-primary">
          Explore Menu
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateCheckoutForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      addToast("Please fill in all required delivery details.", "error");
      return;
    }

    if (paymentMethod === "upi" && !upiId.trim()) {
      setErrors((prev) => ({ ...prev, upi: "Please enter a demonstration UPI ID" }));
      return;
    }

    setIsSubmitting(true);

    // Simulate order creation
    setTimeout(() => {
      const orderId = "LX-" + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        items: [...items],
        subtotal,
        deliveryCharge,
        discount,
        totalAmount,
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          instructions: formData.instructions
        },
        paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : `UPI (${upiId || "demo@upi"})`,
        status: "Order Placed", // 'Order Placed' | 'Preparing' | 'Out for Delivery' | 'Delivered'
        estimatedDelivery: "35-45 minutes"
      };

      const existingOrders = getStoredOrders();
      saveStoredOrders([newOrder, ...existingOrders]);

      clearCart();
      setIsSubmitting(false);
      addToast(`Order ${orderId} placed successfully!`, "success");
      navigate("/orders", { state: { newOrderId: orderId } });
    }, 800);
  };

  return (
    <div className="checkout-page" style={{ padding: "50px 0 90px" }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: "left", marginBottom: "32px" }}>
          <span className="section-badge">White-Glove Dispatch</span>
          <h1 className="section-title">Finalize Your Order</h1>
          <p className="section-subtitle" style={{ margin: 0 }}>
            Enter your destination coordinates and select your preferred payment mode.
          </p>
        </div>

        {/* Demonstration Notice Alert */}
        <div
          style={{
            backgroundColor: "#fff9e6",
            border: "1px solid #f0d58c",
            borderRadius: "8px",
            padding: "16px 20px",
            marginBottom: "32px",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            color: "#7d5a00",
            fontSize: "0.88rem"
          }}
        >
          <Info size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <strong>Demonstration Checkout Notice:</strong> This is an interactive frontend demonstration. No live financial transaction will be processed, and no real credit card or bank credentials are required. Your order will be safely simulated and recorded to local browser storage.
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="cart-layout">
            {/* Left: Delivery Details & Payment */}
            <div>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  border: "1px solid #E6DED2",
                  padding: "30px",
                  boxShadow: "var(--shadow-subtle)",
                  marginBottom: "28px"
                }}
              >
                <h3 style={{ fontSize: "1.3rem", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid #E6DED2" }}>
                  1. Delivery Coordinates
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Lord Alexander Sterling"
                      className={`form-input ${errors.name ? "has-error" : ""}`}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 (555) 019-2834"
                      className={`form-input ${errors.phone ? "has-error" : ""}`}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address / Penthouse / Suite *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. Penthouse 42B, 740 Park Avenue"
                    className={`form-input ${errors.address ? "has-error" : ""}`}
                  />
                  {errors.address && <span className="form-error">{errors.address}</span>}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. New York"
                      className={`form-input ${errors.city ? "has-error" : ""}`}
                    />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Postal / Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g. 10021"
                      className={`form-input ${errors.pincode ? "has-error" : ""}`}
                    />
                    {errors.pincode && <span className="form-error">{errors.pincode}</span>}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Special Delivery / Sommelier Notes (Optional)</label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    rows="2"
                    placeholder="E.g. Please ring private residence chime, leave with doorman..."
                    className="form-input"
                    style={{ resize: "vertical" }}
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  border: "1px solid #E6DED2",
                  padding: "30px",
                  boxShadow: "var(--shadow-subtle)"
                }}
              >
                <h3 style={{ fontSize: "1.3rem", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid #E6DED2" }}>
                  2. Demonstration Payment Method
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {/* COD Option */}
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "16px 20px",
                      borderRadius: "8px",
                      border: `2px solid ${paymentMethod === "cod" ? "var(--color-champagne-gold)" : "#E6DED2"}`,
                      backgroundColor: paymentMethod === "cod" ? "rgba(198, 166, 107, 0.08)" : "#FFF",
                      cursor: "pointer"
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      style={{ accentColor: "var(--color-champagne-gold)" }}
                    />
                    <Banknote size={22} color={paymentMethod === "cod" ? "#C6A66B" : "#888"} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: "#242424", fontSize: "0.95rem" }}>
                        Cash / Card on White-Glove Delivery
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#888" }}>
                        Settle seamlessly upon delivery with our dedicated concierge.
                      </div>
                    </div>
                  </label>

                  {/* UPI Option */}
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "16px 20px",
                      borderRadius: "8px",
                      border: `2px solid ${paymentMethod === "upi" ? "var(--color-champagne-gold)" : "#E6DED2"}`,
                      backgroundColor: paymentMethod === "upi" ? "rgba(198, 166, 107, 0.08)" : "#FFF",
                      cursor: "pointer"
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      style={{ accentColor: "var(--color-champagne-gold)" }}
                    />
                    <QrCode size={22} color={paymentMethod === "upi" ? "#C6A66B" : "#888"} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: "#242424", fontSize: "0.95rem" }}>
                        Instant UPI Transfer (Demonstration)
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#888" }}>
                        Simulate quick settlement via Google Pay, PhonePe, or BHIM.
                      </div>
                    </div>
                  </label>
                </div>

                {paymentMethod === "upi" && (
                  <div
                    style={{
                      marginTop: "18px",
                      padding: "20px",
                      backgroundColor: "var(--color-warm-ivory)",
                      borderRadius: "8px",
                      border: "1px solid #E6DED2"
                    }}
                  >
                    <div className="form-group" style={{ marginBottom: "14px" }}>
                      <label className="form-label">Demonstration UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. connoisseur@okhdfcbank"
                        className={`form-input ${errors.upi ? "has-error" : ""}`}
                      />
                      {errors.upi && <span className="form-error">{errors.upi}</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: "#FFF",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <QrCode size={50} color="#242424" />
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#666" }}>
                        Scan demonstration QR code with any UPI banking application or enter your simulated handle above.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="order-summary-box">
              <h3 className="summary-title">Summary Review</h3>

              <div style={{ maxHeight: "240px", overflowY: "auto", marginBottom: "16px", paddingRight: "4px" }}>
                {items.map((it) => (
                  <div
                    key={it.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      fontSize: "0.85rem",
                      borderBottom: "1px solid #f5ede0"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontWeight: 700, color: "var(--color-champagne-gold)" }}>{it.quantity}x</span>
                      <span style={{ color: "#242424" }}>{it.name}</span>
                    </div>
                    <span style={{ fontWeight: 600 }}>${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-line">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-line">
                <span>White-Glove Delivery</span>
                <span>{deliveryCharge === 0 ? "FREE" : `$${deliveryCharge.toFixed(2)}`}</span>
              </div>

              {discount > 0 && (
                <div className="summary-line highlight">
                  <span>Privilege Voucher</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-total">
                <span>Payable Amount</span>
                <span style={{ color: "var(--color-champagne-gold)", fontFamily: "var(--font-serif)" }}>
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg"
                style={{ width: "100%", marginTop: "24px" }}
              >
                {isSubmitting ? (
                  "Transmitting Order..."
                ) : (
                  <>
                    Confirm & Place Order <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div style={{ textAlign: "center", marginTop: "14px", fontSize: "0.75rem", color: "#888" }}>
                🔒 Simulated End-to-End Encryption
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
