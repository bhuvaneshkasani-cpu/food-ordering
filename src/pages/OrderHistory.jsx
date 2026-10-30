import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Clock,
  Package,
  CheckCircle2,
  ChefHat,
  Truck,
  MapPin,
  Calendar,
  CreditCard,
  RefreshCw,
  ShoppingBag
} from "lucide-react";
import { getStoredOrders, saveStoredOrders } from "../utils/localStorage";
import { useToast } from "../context/ToastContext";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { addToast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const loaded = getStoredOrders();
    setOrders(loaded);
  }, []);

  const advanceOrderStatus = (orderId) => {
    const statuses = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];
    const updated = orders.map((order) => {
      if (order.id === orderId) {
        const currentIndex = statuses.indexOf(order.status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        const nextStatus = statuses[nextIndex];
        return { ...order, status: nextStatus };
      }
      return order;
    });

    setOrders(updated);
    saveStoredOrders(updated);
    addToast(`Status updated for ${orderId}`, "info");
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Order Placed":
        return "placed";
      case "Preparing":
        return "preparing";
      case "Out for Delivery":
        return "out-for-delivery";
      case "Delivered":
        return "delivered";
      default:
        return "placed";
    }
  };

  const getStepProgress = (status) => {
    switch (status) {
      case "Order Placed":
        return 1;
      case "Preparing":
        return 2;
      case "Out for Delivery":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 1;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="orders-page" style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="empty-state" style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 40px" }}>
            <div className="empty-state-icon">
              <Clock size={34} />
            </div>
            <h2 className="empty-state-title">No Orders on Record</h2>
            <p className="empty-state-desc">
              You haven't dispatched any orders yet. Discover our signature tasting dishes, wood-fired pizzas, and prime Wagyu steaks.
            </p>
            <Link to="/menu" className="btn btn-primary btn-lg">
              Explore Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page" style={{ padding: "50px 0 90px" }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: "left", marginBottom: "36px" }}>
          <span className="section-badge">Culinary Records</span>
          <h1 className="section-title">Order History & Tracking</h1>
          <p className="section-subtitle" style={{ margin: 0 }}>
            Live tracking and archives for all your gourmet white-glove dispatches.
          </p>
        </div>

        <div>
          {orders.map((order) => {
            const step = getStepProgress(order.status);

            return (
              <div key={order.id} className="order-card">
                {/* Header */}
                <div className="order-card-header">
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span className="order-id-tag">Order #{order.id}</span>
                    <span className={`order-status-badge ${getStatusBadgeClass(order.status)}`}>
                      ● {order.status}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--color-muted-grey)", fontSize: "0.85rem" }}>
                      <Calendar size={14} />
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>

                    <button
                      onClick={() => advanceOrderStatus(order.id)}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: "0.72rem", padding: "4px 10px" }}
                      title="Click to simulate progressing the order status"
                    >
                      <RefreshCw size={12} /> Advance Status
                    </button>
                  </div>
                </div>

                {/* Tracking Visualizer */}
                <div style={{ padding: "18px 24px", borderBottom: "1px solid #f0ebe1", backgroundColor: "#faf7f2" }}>
                  <div className="order-tracker">
                    <div className={`tracker-step ${step >= 1 ? "completed" : ""}`}>
                      <div className="tracker-node">1</div>
                      <span className="tracker-label">Placed</span>
                    </div>

                    <div className={`tracker-step ${step >= 2 ? "completed" : ""}`}>
                      <div className="tracker-node">2</div>
                      <span className="tracker-label">Preparing</span>
                    </div>

                    <div className={`tracker-step ${step >= 3 ? "completed" : ""}`}>
                      <div className="tracker-node">3</div>
                      <span className="tracker-label">In Transit</span>
                    </div>

                    <div className={`tracker-step ${step >= 4 ? "completed" : ""}`}>
                      <div className="tracker-node">4</div>
                      <span className="tracker-label">Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="order-card-body">
                  <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr", gap: "28px" }}>
                    {/* Items List */}
                    <div>
                      <h4 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#888", marginBottom: "14px" }}>
                        Dishes Prepared ({order.items.length})
                      </h4>

                      <div className="order-items-summary">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-item-mini">
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "42px", height: "42px", borderRadius: "4px", objectFit: "cover" }}
                              />
                              <div>
                                <span style={{ fontWeight: 600, color: "#242424" }}>{item.name}</span>
                                <div style={{ fontSize: "0.75rem", color: "#888" }}>
                                  Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <span style={{ fontWeight: 700, fontFamily: "var(--font-serif)" }}>
                              ${(Number(item.price) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Meta Coordinates & Payment */}
                    <div style={{ borderLeft: "1px solid #f0ebe1", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div>
                        <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "#888", display: "block" }}>
                          Recipient & Destination
                        </span>
                        <div style={{ fontWeight: 600, color: "#242424", fontSize: "0.9rem" }}>
                          {order.customer?.name}
                        </div>
                        <div style={{ fontSize: "0.82rem", color: "#666" }}>
                          {order.customer?.address}, {order.customer?.city} {order.customer?.pincode}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#888" }}>
                          Phone: {order.customer?.phone}
                        </div>
                      </div>

                      <div>
                        <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "#888", display: "block" }}>
                          Payment Method
                        </span>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#242424", display: "flex", alignItems: "center", gap: "6px" }}>
                          <CreditCard size={14} color="#C6A66B" /> {order.paymentMethod}
                        </div>
                      </div>

                      <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f0ebe1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.9rem", color: "#666" }}>Grand Total:</span>
                        <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 700, color: "var(--color-champagne-gold)" }}>
                          ${Number(order.totalAmount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
