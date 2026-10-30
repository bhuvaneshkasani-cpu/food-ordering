import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Send, Phone, MapPin, Clock, Award, ShieldCheck } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("Please provide a valid email address.", "warning");
      return;
    }
    addToast("Welcome to the Connoisseurs Guild. Invitations sent to your inbox.", "success");
    setEmail("");
  };

  return (
    <footer className="luxury-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid #C6A66B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#C6A66B",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 700
                }}
              >
                É
              </div>
              <span style={{ fontFamily: "var(--font-serif-display)", fontSize: "1.3rem", letterSpacing: "0.15em", color: "#FFF" }}>
                L'ÉLIXIR
              </span>
            </div>
            <p style={{ marginBottom: "20px" }}>
              An unrivaled culinary sanctuary crafting transcendent epicurean masterworks. Freshly prepared by world-renowned chefs and delivered under pristine temperature control.
            </p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#C6A66B", fontSize: "0.8rem", fontWeight: 600 }}>
                <Award size={16} /> Michelin Inspired
              </div>
              <span style={{ color: "#444" }}>•</span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#C6A66B", fontSize: "0.8rem", fontWeight: 600 }}>
                <ShieldCheck size={16} /> White-Glove Delivery
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Epicurean Menu</h4>
            <ul className="footer-links">
              <li><Link to="/menu?category=starters">Artisanal Starters</Link></li>
              <li><Link to="/menu?category=main-course">Prime Entrees & Wagyu</Link></li>
              <li><Link to="/menu?category=pizza">Black Truffle Pizzas</Link></li>
              <li><Link to="/menu?category=pasta">Handcrafted Pastas</Link></li>
              <li><Link to="/menu?category=desserts">Gold Leaf Desserts</Link></li>
              <li><Link to="/menu?category=beverages">Cellar Reserves & Elixirs</Link></li>
            </ul>
          </div>

          {/* Concierge & Hours */}
          <div className="footer-col">
            <h4>Private Dining</h4>
            <ul className="footer-links" style={{ gap: "14px" }}>
              <li style={{ display: "flex", gap: "10px", alignItems: "flex-start", color: "#a0a0a0", fontSize: "0.88rem" }}>
                <MapPin size={16} color="#C6A66B" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span>450 Park Avenue, Upper East Side, New York, NY 10022</span>
              </li>
              <li style={{ display: "flex", gap: "10px", alignItems: "center", color: "#a0a0a0", fontSize: "0.88rem" }}>
                <Phone size={16} color="#C6A66B" style={{ flexShrink: 0 }} />
                <span>+1 (212) 555-LUXE (5893)</span>
              </li>
              <li style={{ display: "flex", gap: "10px", alignItems: "flex-start", color: "#a0a0a0", fontSize: "0.88rem" }}>
                <Clock size={16} color="#C6A66B" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span>Service Hours:<br />Daily: 11:30 AM – 11:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Connoisseur Guild / Newsletter */}
          <div className="footer-col">
            <h4>Connoisseurs Guild</h4>
            <p style={{ marginBottom: "16px" }}>
              Subscribe to receive private invitations to seasonal tasting menus, sommelier pairings, and privileged culinary events.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your private email..."
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "4px",
                  border: "1px solid rgba(198, 166, 107, 0.3)",
                  backgroundColor: "#242424",
                  color: "#FFF",
                  fontSize: "0.85rem"
                }}
              />
              <button
                type="submit"
                className="btn btn-gold btn-sm"
                aria-label="Subscribe"
                title="Subscribe"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} L'ÉLIXIR Haute Gastronomie. All rights reserved.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/about" style={{ color: "#777" }}>Artisan Philosophy</Link>
            <Link to="/contact" style={{ color: "#777" }}>Concierge Desk</Link>
            <span style={{ color: "#C6A66B" }}>Client-Side Simulation Demo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
