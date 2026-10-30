import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UtensilsCrossed,
  Truck,
  Leaf,
  Star,
  Clock,
  Award,
  ChevronRight,
  Quote
} from "lucide-react";
import { categories } from "../data/categories";
import { foods } from "../data/foods";
import FoodCard from "../components/FoodCard";
import CategoryCard from "../components/CategoryCard";

export default function Home() {
  const navigate = useNavigate();

  // Curated popular dishes (highest rating and chef specials)
  const popularDishes = foods
    .filter((f) => f.rating >= 4.8 || f.isSpecial)
    .slice(0, 6);

  const reviews = [
    {
      id: 1,
      name: "Lady Eleanor Vance",
      role: "Michelin Guide Contributor",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment:
        "L'ÉLIXIR has redefined luxury home dining. The A5 Miyazaki Wagyu arrived at the exact optimal temperature, succulent and bursting with umami. An impeccable standard of culinary perfection."
    },
    {
      id: 2,
      name: "Marcus Sterling",
      role: "Private Equity Partner & Gourmand",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment:
        "The white alba truffle tagliolini and the royal caviar tartlets are sublime. Flawless white-glove delivery right to our penthouse. Our go-to for hosting discerning guests."
    },
    {
      id: 3,
      name: "Chef Julian Moreau",
      role: "Culinary Arts Critic",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment:
        "In thirty years of gastronomy, I have rarely seen takeaway execute at three-star restaurant precision. Every sauce emulsified, every crust crisped to perfection."
    }
  ];

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-overlay"></div>
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <Sparkles size={14} /> Haute Cuisine At Your Residence
            </div>

            <h1 className="hero-headline">
              Exceptional Taste, <span>Delivered.</span>
            </h1>

            <p className="hero-desc">
              Immerse yourself in an unrivaled gastronomic journey. Michelin-grade recipes,
              A5 Wagyu cuts, rare truffles, and artisanal patisserie prepared by master chefs
              and delivered with white-glove precision.
            </p>

            <div className="hero-actions">
              <Link to="/menu" className="btn btn-gold btn-lg">
                Explore Menu <ArrowRight size={16} />
              </Link>
              <Link to="/menu?filter=special" className="btn btn-secondary btn-lg" style={{ color: "#FFF", borderColor: "rgba(255,255,255,0.3)" }}>
                Chef's Reserve
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">3★</span>
                <span className="stat-label">Michelin Pedigree</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">25 min</span>
                <span className="stat-label">Thermal Controlled</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">100%</span>
                <span className="stat-label">Organic & Artisanal</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                alt="Haute Cuisine Masterpiece"
              />
            </div>

            <div className="hero-floating-card">
              <div className="floating-icon">
                <Award size={22} />
              </div>
              <div>
                <div className="floating-title">Chef's Grand Tasting</div>
                <div className="floating-sub">Awarded Best Luxury Delivery 2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Food Categories Section */}
      <section className="section" style={{ backgroundColor: "var(--color-warm-ivory)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Culinary Categories</span>
            <h2 className="section-title">The Grand Repertory</h2>
            <p className="section-subtitle">
              From delicate Caspian caviar appetizers to 48-hour fermented black truffle pizzas and gold-dusted patisserie.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                isActive={false}
                onClick={() =>
                  navigate(cat.id === "all" ? "/menu" : `/menu?category=${cat.id}`)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular Dishes Section */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Signature Selections</span>
            <h2 className="section-title">Most Revered Dishes</h2>
            <p className="section-subtitle">
              Curated by our Executive Chef. Handcrafted with the rarest seasonal ingredients and plated to perfection.
            </p>
          </div>

          <div className="food-grid">
            {popularDishes.map((dish) => (
              <FoodCard key={dish.id} food={dish} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link to="/menu" className="btn btn-primary btn-lg">
              View Complete Menu <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Special Offers Section */}
      <section className="section section-dark">
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #1c1c1c 0%, #29241b 100%)",
              borderRadius: "16px",
              border: "1px solid rgba(198, 166, 107, 0.4)",
              padding: "50px 40px",
              display: "grid",
              gridTemplateColumns: "1.3fr 0.7fr",
              alignItems: "center",
              gap: "36px"
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(198, 166, 107, 0.15)",
                  color: "var(--color-champagne-gold)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "16px"
                }}
              >
                Privileged Connoisseur Offer
              </span>
              <h2 style={{ color: "#FFF", fontSize: "2.3rem", marginBottom: "14px" }}>
                Curated Chef's Tasting Flight
              </h2>
              <p style={{ color: "#c0c0c0", lineHeight: "1.7", marginBottom: "24px", maxWidth: "560px" }}>
                Apply privilege voucher code <strong style={{ color: "var(--color-champagne-gold)" }}>LUXE20</strong> at checkout to receive 20% privilege deduction on any multi-course tasting order above $80.
              </p>
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <Link to="/menu" className="btn btn-gold">
                  Claim Tasting Privileges
                </Link>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "4px",
                    border: "1px dashed var(--color-champagne-gold)",
                    color: "var(--color-champagne-gold)",
                    fontFamily: "var(--font-serif)",
                    fontWeight: 700,
                    letterSpacing: "0.08em"
                  }}
                >
                  PROMO: LUXE20
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  maxHeight: "260px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(198, 166, 107, 0.3)",
                  margin: "0 auto"
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                  alt="Fine Dining Tasting Flight"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section className="section" style={{ backgroundColor: "var(--color-warm-ivory)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">The L'Élixir Standard</span>
            <h2 className="section-title">The Art of Supreme Dining</h2>
            <p className="section-subtitle">
              Every detail is calibrated to mirror the ambiance and caliber of the world's most distinguished three-star establishments.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "28px"
            }}
          >
            {/* Pillar 1 */}
            <div className="luxe-card" style={{ padding: "36px 28px", textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(198, 166, 107, 0.12)",
                  color: "var(--color-champagne-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px"
                }}
              >
                <Leaf size={28} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>Prime Sourced Ingredients</h3>
              <p style={{ color: "var(--color-muted-grey)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Directly flown A5 Miyazaki Wagyu, Alba truffles, Caspian caviar, and daily organic harvests from local regenerative estates.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="luxe-card" style={{ padding: "36px 28px", textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(198, 166, 107, 0.12)",
                  color: "var(--color-champagne-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px"
                }}
              >
                <UtensilsCrossed size={28} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>Freshly Prepared to Order</h3>
              <p style={{ color: "var(--color-muted-grey)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Nothing is pre-cooked. Each dish is individually executed by brigade de cuisine master chefs immediately upon your order placement.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="luxe-card" style={{ padding: "36px 28px", textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(198, 166, 107, 0.12)",
                  color: "var(--color-champagne-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px"
                }}
              >
                <Truck size={28} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>Precision Thermal Transit</h3>
              <p style={{ color: "var(--color-muted-grey)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Dispatched in pressurized temperature-calibrated luxury cases ensuring hot dishes arrive at 65°C and chilled items at 4°C.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="luxe-card" style={{ padding: "36px 28px", textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(198, 166, 107, 0.12)",
                  color: "var(--color-champagne-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px"
                }}
              >
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>White-Glove Concierge</h3>
              <p style={{ color: "var(--color-muted-grey)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Personal culinary concierge desk standing by for bespoke dietary requests, private sommelier pairings, and personalized notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Gourmand Acclaim</span>
            <h2 className="section-title">Words From Connoisseurs</h2>
            <p className="section-subtitle">
              Read how prominent epicureans and culinary critics describe their L'ÉLIXIR experiences.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "30px"
            }}
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="luxe-card"
                style={{ padding: "36px 30px", display: "flex", flexDirection: "column" }}
              >
                <Quote size={32} color="#C6A66B" style={{ opacity: 0.5, marginBottom: "14px" }} />
                <p style={{ fontStyle: "italic", color: "#333", fontSize: "0.95rem", lineHeight: "1.7", flex: 1, marginBottom: "24px" }}>
                  "{rev.comment}"
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "14px", borderTop: "1px solid #f0ebe1", paddingTop: "18px" }}>
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <h4 style={{ fontSize: "1rem", margin: 0 }}>{rev.name}</h4>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-muted-grey)" }}>{rev.role}</span>
                    <div style={{ display: "flex", gap: "2px", marginTop: "4px" }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="#C6A66B" color="#C6A66B" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
