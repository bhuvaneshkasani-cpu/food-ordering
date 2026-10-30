import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Star, ArrowRight } from "lucide-react";
import { foods } from "../data/foods";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredFoods = query.trim()
    ? foods.filter(
        (f) =>
          f.name.toLowerCase().includes(query.toLowerCase()) ||
          f.category.toLowerCase().includes(query.toLowerCase()) ||
          f.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectDish = (id) => {
    onClose();
    navigate(`/dish/${id}`);
  };

  const handleViewAll = () => {
    onClose();
    navigate(`/menu?search=${encodeURIComponent(query)}`);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(21, 21, 21, 0.8)",
        backdropFilter: "blur(8px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "100px",
        paddingLeft: "20px",
        paddingRight: "20px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          border: "1px solid rgba(198, 166, 107, 0.4)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          overflow: "hidden"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: "1px solid #E6DED2",
            gap: "12px"
          }}
        >
          <Search size={20} color="#C6A66B" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleViewAll()}
            placeholder="Search Wagyu, Caviar, Truffle, Champagne..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "1.05rem",
              fontFamily: "var(--font-sans)",
              color: "#242424"
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ color: "#888", padding: "4px" }}
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              color: "#888",
              padding: "4px",
              marginLeft: "6px"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {query.trim() && (
          <div style={{ padding: "16px 20px", maxHeight: "360px", overflowY: "auto" }}>
            {filteredFoods.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {filteredFoods.map((dish) => (
                  <div
                    key={dish.id}
                    onClick={() => handleSelectDish(dish.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "8px 10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5EFE5")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "6px",
                        objectFit: "cover"
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: "0.95rem", margin: 0, color: "#242424" }}>
                        {dish.name}
                      </h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "2px" }}>
                        <span style={{ color: "#C6A66B", fontWeight: 700, fontSize: "0.85rem" }}>
                          ${dish.price.toFixed(2)}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "#888" }}>• {dish.category}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#C6A66B", fontSize: "0.8rem", fontWeight: 600 }}>
                      <Star size={13} fill="#C6A66B" />
                      {dish.rating.toFixed(1)}
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleViewAll}
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: "8px", padding: "10px" }}
                >
                  View All Results for "{query}" <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0", color: "#888" }}>
                <p>No culinary creations matching "{query}".</p>
                <button
                  onClick={() => navigate("/menu")}
                  className="btn btn-outline-gold btn-sm"
                  style={{ marginTop: "12px" }}
                >
                  Browse Full Menu
                </button>
              </div>
            )}
          </div>
        )}

        {!query.trim() && (
          <div style={{ padding: "20px", backgroundColor: "#faf7f2", borderTop: "1px solid #eee" }}>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "10px" }}>
              Trending Searches
            </span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Wagyu Tenderloin", "Black Truffle", "Ossetra Caviar", "Lobster Risotto", "Valrhona Dome"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "999px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E6DED2",
                    fontSize: "0.8rem",
                    color: "#242424"
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
