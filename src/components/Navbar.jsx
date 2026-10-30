import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu as MenuIcon,
  X,
  LogOut,
  Clock,
  Sparkles
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const { totalCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    navigate("/");
  };

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" onClick={() => setMobileOpen(false)}>
            <div className="brand-emblem">É</div>
            <div className="brand-text">
              <span className="brand-name">L'ÉLIXIR</span>
              <span className="brand-tagline">Haute Cuisine</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/menu"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  Explore Menu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Action Icons */}
          <div className="nav-actions">
            {/* Search Trigger */}
            <button
              className="nav-icon-btn"
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search Menu"
              title="Search Menu"
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="nav-icon-btn"
              aria-label="Wishlist"
              title="Saved Dishes"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="nav-badge-count">{wishlistCount}</span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="nav-icon-btn"
              aria-label="Shopping Cart"
              title="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {totalCount > 0 && (
                <span className="nav-badge-count">{totalCount}</span>
              )}
            </Link>

            {/* Auth Button or User Menu */}
            {isAuthenticated ? (
              <div style={{ position: "relative" }}>
                <button
                  className="nav-auth-btn"
                  onClick={() => setUserDropdown(!userDropdown)}
                  aria-label="User Account"
                >
                  <User size={15} />
                  <span>{user.fullName ? user.fullName.split(" ")[0] : "Account"}</span>
                </button>

                {userDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 12px)",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      border: "1px solid #E6DED2",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.18)",
                      width: "220px",
                      zIndex: 100,
                      overflow: "hidden"
                    }}
                  >
                    <div style={{ padding: "14px 16px", borderBottom: "1px solid #f0ebe1", backgroundColor: "#faf7f2" }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#242424" }}>
                        {user.fullName}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#C6A66B", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                        <Sparkles size={11} /> {user.memberTier || "Gold Member"}
                      </div>
                    </div>
                    <div style={{ padding: "8px" }}>
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdown(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "9px 12px",
                          fontSize: "0.85rem",
                          color: "#292929",
                          borderRadius: "4px"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5EFE5")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <User size={15} color="#888" /> Profile Details
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserDropdown(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "9px 12px",
                          fontSize: "0.85rem",
                          color: "#292929",
                          borderRadius: "4px"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5EFE5")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <Clock size={15} color="#888" /> Order History
                      </Link>
                      <button
                        onClick={handleLogout}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          width: "100%",
                          padding: "9px 12px",
                          fontSize: "0.85rem",
                          color: "#c0392b",
                          textAlign: "left",
                          borderRadius: "4px",
                          borderTop: "1px solid #f0ebe1",
                          marginTop: "4px"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fdedec")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="nav-auth-btn">
                <User size={15} />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              className="nav-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <Link
            to="/"
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
          >
            Explore Menu
          </Link>
          <Link
            to="/about"
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/wishlist"
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
          >
            Wishlist ({wishlistCount})
          </Link>
          <Link
            to="/cart"
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
          >
            Shopping Cart ({totalCount})
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="mobile-nav-link"
                onClick={() => setMobileOpen(false)}
              >
                My Profile ({user.fullName})
              </Link>
              <Link
                to="/orders"
                className="mobile-nav-link"
                onClick={() => setMobileOpen(false)}
              >
                Order History
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="btn btn-outline-gold"
                style={{ marginTop: "16px", width: "100%" }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-gold"
              style={{ marginTop: "20px", width: "100%" }}
              onClick={() => setMobileOpen(false)}
            >
              Sign In / Register
            </Link>
          )}
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
