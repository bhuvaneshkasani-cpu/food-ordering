import React from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{ padding: "100px 20px", textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          backgroundColor: "rgba(198, 166, 107, 0.12)",
          color: "var(--color-champagne-gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px"
        }}
      >
        <Compass size={36} />
      </div>
      <h1 style={{ fontSize: "3rem", marginBottom: "12px", fontFamily: "var(--font-serif)" }}>
        404 — Course Not Found
      </h1>
      <p style={{ color: "var(--color-muted-grey)", maxWidth: "460px", marginBottom: "30px", fontSize: "1rem" }}>
        The gastronomic page you seek does not exist or may have been retired from our culinary archives.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        Return to Grand Salon <ArrowRight size={16} />
      </Link>
    </div>
  );
}
