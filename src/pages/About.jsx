import React from "react";
import { Link } from "react-router-dom";
import { Award, Sparkles, Utensils, Heart, ShieldCheck, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="about-page" style={{ padding: "50px 0 90px" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">The L'Élixir Heritage</span>
          <h1 className="section-title">An Odyssey of Transcendent Taste</h1>
          <p className="section-subtitle">
            Founded on the principle that haute cuisine should transcend restaurant walls,
            L'ÉLIXIR curates unparalleled dining experiences delivered directly to private residences.
          </p>
        </div>

        {/* Narrative Split */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "50px",
            alignItems: "center",
            marginBottom: "80px"
          }}
        >
          <div>
            <span style={{ fontSize: "0.8rem", color: "#C6A66B", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700 }}>
              The Culinary Philosophy
            </span>
            <h2 style={{ fontSize: "2.1rem", marginTop: "10px", marginBottom: "18px" }}>
              Where Artistry Meets Pure Gastronomy
            </h2>
            <p style={{ color: "#4a4a4a", lineHeight: "1.8", marginBottom: "16px" }}>
              At L'ÉLIXIR, we view every course not merely as nourishment, but as an evocative artistic expression. Our Brigade de Cuisine is comprised of veteran masters formerly helming three-star Michelin kitchens across Paris, Tokyo, and Rome.
            </p>
            <p style={{ color: "#4a4a4a", lineHeight: "1.8", marginBottom: "24px" }}>
              We reject frozen shortcuts and industrial compromises. Every single ingredient is sourced from dedicated artisanal estates: organic heirloom seeds grown in biodynamic soil, whole Wagyu beef graded A5 with certified lineage, and Caspian Sea caviar harvested sustainably with royal pedigree.
            </p>
            <div style={{ display: "flex", gap: "24px" }}>
              <div>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "#C6A66B", fontWeight: 700 }}>3★</span>
                <p style={{ fontSize: "0.8rem", color: "#888", textTransform: "uppercase" }}>Michelin Pedigree</p>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "#C6A66B", fontWeight: 700 }}>48h</span>
                <p style={{ fontSize: "0.8rem", color: "#888", textTransform: "uppercase" }}>Sourdough Ferment</p>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "#C6A66B", fontWeight: 700 }}>100%</span>
                <p style={{ fontSize: "0.8rem", color: "#888", textTransform: "uppercase" }}>Artisanal Provenance</p>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(198, 166, 107, 0.3)", boxShadow: "var(--shadow-card)" }}>
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80"
              alt="Executive Chef Plating Masterpiece"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Pillars */}
        <div style={{ marginBottom: "80px" }}>
          <div className="section-header">
            <span className="section-badge">Our Pillars</span>
            <h2 className="section-title">The Three Sacred Disciplines</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
            <div className="luxe-card" style={{ padding: "36px 30px" }}>
              <div style={{ color: "#C6A66B", marginBottom: "16px" }}>
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "12px" }}>Rare Seasonal Foraging</h3>
              <p style={{ color: "var(--color-muted-grey)", fontSize: "0.9rem", lineHeight: "1.7" }}>
                White Alba truffles personally authenticated, Hokkaido jumbo sea scallops harvested from sub-zero waters, and hand-plucked saffron threads.
              </p>
            </div>

            <div className="luxe-card" style={{ padding: "36px 30px" }}>
              <div style={{ color: "#C6A66B", marginBottom: "16px" }}>
                <Utensils size={28} />
              </div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "12px" }}>Time-Honored Technique</h3>
              <p style={{ color: "var(--color-muted-grey)", fontSize: "0.9rem", lineHeight: "1.7" }}>
                Every pasta extruded fresh through bronze dies with 40 farm-fresh golden egg yolks. 48-hour sourdough fermentations baked in imported Italian stone hearths.
              </p>
            </div>

            <div className="luxe-card" style={{ padding: "36px 30px" }}>
              <div style={{ color: "#C6A66B", marginBottom: "16px" }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "12px" }}>White-Glove Thermal Transit</h3>
              <p style={{ color: "var(--color-muted-grey)", fontSize: "0.9rem", lineHeight: "1.7" }}>
                Our proprietary heated induction cases guarantee that hot entrees arrive at precisely 65°C, ensuring the same texture and fragrance as dining in our private salon.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            backgroundColor: "var(--color-midnight)",
            borderRadius: "16px",
            border: "1px solid rgba(198, 166, 107, 0.4)",
            padding: "60px 40px",
            textAlign: "center",
            color: "#FFF"
          }}
        >
          <span className="section-badge">Begin The Journey</span>
          <h2 style={{ color: "#FFF", fontSize: "2.4rem", marginBottom: "16px" }}>
            Experience Haute Cuisine at Your Table
          </h2>
          <p style={{ color: "#c0c0c0", maxWidth: "600px", margin: "0 auto 30px", fontSize: "1rem" }}>
            Place your order today or speak with our culinary concierge to design a custom celebratory menu.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/menu" className="btn btn-gold btn-lg">
              Explore The Catalog <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg" style={{ color: "#FFF", borderColor: "#FFF" }}>
              Contact Concierge Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
