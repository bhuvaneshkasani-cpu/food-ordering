import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ShoppingBag,
  Heart,
  Clock,
  LogOut,
  Edit2,
  Check,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { getStoredOrders } from "../utils/localStorage";

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    pincode: user?.pincode || ""
  });

  const orders = getStoredOrders();

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="profile-page" style={{ padding: "50px 0 90px" }}>
      <div className="container">
        {/* Profile Header Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            border: "1px solid #E6DED2",
            padding: "36px",
            boxShadow: "var(--shadow-card)",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "var(--color-midnight)",
                border: "2px solid var(--color-champagne-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-champagne-gold)",
                fontFamily: "var(--font-serif)",
                fontSize: "2rem",
                fontWeight: 700
              }}
            >
              {user.fullName ? user.fullName[0].toUpperCase() : "C"}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <h1 style={{ fontSize: "1.8rem", margin: 0 }}>{user.fullName}</h1>
                <span className="badge-gold">
                  <Sparkles size={11} /> {user.memberTier || "Gold Member"}
                </span>
              </div>
              <p style={{ color: "var(--color-muted-grey)", margin: 0, fontSize: "0.9rem" }}>
                Member since {new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-secondary btn-sm"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <Edit2 size={14} /> {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-primary btn-sm"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "36px"
          }}
        >
          <div className="luxe-card" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "rgba(198, 166, 107, 0.12)",
                color: "#C6A66B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Clock size={22} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 700, color: "#242424" }}>
                {orders.length}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Orders Placed
              </div>
            </div>
          </div>

          <div className="luxe-card" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "rgba(198, 166, 107, 0.12)",
                color: "#C6A66B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Heart size={22} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 700, color: "#242424" }}>
                {wishlistCount}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Wishlisted Dishes
              </div>
            </div>
          </div>

          <div className="luxe-card" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "rgba(198, 166, 107, 0.12)",
                color: "#C6A66B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 700, color: "#242424" }}>
                Verified
              </div>
              <div style={{ fontSize: "0.8rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Guild Connoisseur
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content / Edit Form */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "32px" }}>
          {/* Left: Info or Edit Form */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              border: "1px solid #E6DED2",
              padding: "32px",
              boxShadow: "var(--shadow-subtle)"
            }}
          >
            <h3 style={{ fontSize: "1.3rem", marginBottom: "24px", paddingBottom: "12px", borderBottom: "1px solid #E6DED2" }}>
              {isEditing ? "Edit Personal Coordinates" : "Personal Dossier"}
            </h3>

            {isEditing ? (
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Default Street Address / Suite</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="E.g. Penthouse 42B, 740 Park Avenue"
                    className="form-input"
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="New York"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Postal / Pincode</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="10021"
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                  <button type="submit" className="btn btn-primary">
                    <Check size={16} /> Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <Mail size={18} color="#C6A66B" />
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#888", display: "block", textTransform: "uppercase" }}>Email Address</span>
                    <strong style={{ color: "#242424" }}>{user.email}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <Phone size={18} color="#C6A66B" />
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#888", display: "block", textTransform: "uppercase" }}>Phone Number</span>
                    <strong style={{ color: "#242424" }}>{user.phone || "Not configured yet"}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <MapPin size={18} color="#C6A66B" />
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#888", display: "block", textTransform: "uppercase" }}>Delivery Residence</span>
                    <strong style={{ color: "#242424" }}>
                      {user.address ? `${user.address}, ${user.city || ""} ${user.pincode || ""}` : "No default address saved"}
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Quick Navigation Hub */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              border: "1px solid #E6DED2",
              padding: "32px",
              boxShadow: "var(--shadow-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}
          >
            <h3 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>Quick Access</h3>

            <Link
              to="/orders"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "var(--color-warm-ivory)",
                border: "1px solid #E6DED2",
                fontWeight: 600,
                color: "#242424"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Clock size={18} color="#C6A66B" />
                <span>Order History & Tracking</span>
              </div>
              <span style={{ color: "#888", fontSize: "0.85rem" }}>({orders.length}) &rarr;</span>
            </Link>

            <Link
              to="/wishlist"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "var(--color-warm-ivory)",
                border: "1px solid #E6DED2",
                fontWeight: 600,
                color: "#242424"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Heart size={18} color="#C6A66B" />
                <span>Saved Wishlist Dishes</span>
              </div>
              <span style={{ color: "#888", fontSize: "0.85rem" }}>({wishlistCount}) &rarr;</span>
            </Link>

            <Link
              to="/cart"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "var(--color-warm-ivory)",
                border: "1px solid #E6DED2",
                fontWeight: 600,
                color: "#242424"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShoppingBag size={18} color="#C6A66B" />
                <span>Active Bag</span>
              </div>
              <span style={{ color: "#888", fontSize: "0.85rem" }}>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
