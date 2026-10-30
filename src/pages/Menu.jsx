import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Search,
  Utensils
} from "lucide-react";
import { foods } from "../data/foods";
import { categories } from "../data/categories";
import FoodCard from "../components/FoodCard";
import SearchBar from "../components/SearchBar";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial query params
  const categoryParam = searchParams.get("category") || "all";
  const searchParam = searchParams.get("search") || "";
  const filterParam = searchParams.get("filter") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [dietFilter, setDietFilter] = useState("all"); // 'all' | 'veg' | 'non-veg'
  const [sortBy, setSortBy] = useState("featured"); // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  const [onlySpecials, setOnlySpecials] = useState(filterParam === "special");

  // Keep state synced with URL changes
  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category"));
    }
    if (searchParams.get("search")) {
      setSearchQuery(searchParams.get("search"));
    }
  }, [searchParams]);

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    const newParams = new URLSearchParams(searchParams);
    if (slug === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", slug);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setDietFilter("all");
    setSortBy("featured");
    setOnlySpecials(false);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredDishes = useMemo(() => {
    return foods.filter((dish) => {
      // Category filter
      if (selectedCategory !== "all" && dish.category !== selectedCategory) {
        return false;
      }

      // Veg / Non-Veg filter
      if (dietFilter === "veg" && !dish.isVeg) return false;
      if (dietFilter === "non-veg" && dish.isVeg) return false;

      // Chef's Reserve filter
      if (onlySpecials && !dish.isSpecial) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        const matchesIngredients = dish.ingredients?.some((ing) =>
          ing.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      // Default: featured (specials first, then high rating)
      if (a.isSpecial !== b.isSpecial) return b.isSpecial ? 1 : -1;
      return b.rating - a.rating;
    });
  }, [selectedCategory, dietFilter, onlySpecials, searchQuery, sortBy]);

  return (
    <div className="menu-page" style={{ padding: "50px 0 90px" }}>
      <div className="container">
        {/* Page Title Header */}
        <div className="section-header" style={{ marginBottom: "36px" }}>
          <span className="section-badge">Artisanal Catalog</span>
          <h1 className="section-title">The Epicurean Menu</h1>
          <p className="section-subtitle">
            Explore our curated culinary masterworks. Every dish is composed with the
            world's rarest gourmet ingredients and executed to exacting Michelin standards.
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "16px",
            marginBottom: "24px"
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`filter-pill ${selectedCategory === cat.slug ? "active" : ""}`}
              style={{
                whiteSpace: "nowrap",
                padding: "10px 20px",
                fontSize: "0.85rem",
                borderRadius: "30px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter & Controls Panel */}
        <div className="menu-controls">
          <div className="menu-search-row">
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                const newParams = new URLSearchParams(searchParams);
                if (!val) newParams.delete("search");
                else newParams.set("search", val);
                setSearchParams(newParams);
              }}
              onClear={() => {
                setSearchQuery("");
                const newParams = new URLSearchParams(searchParams);
                newParams.delete("search");
                setSearchParams(newParams);
              }}
            />

            <div className="sort-select-wrapper">
              <label htmlFor="sort-select">Sort By:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Chef's Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="menu-filter-row">
            {/* Dietary Radio / Buttons */}
            <div className="diet-filter-buttons">
              <span style={{ fontSize: "0.8rem", color: "#888", fontWeight: 600, marginRight: "4px" }}>
                Dietary:
              </span>
              <button
                type="button"
                className={`filter-pill ${dietFilter === "all" ? "active" : ""}`}
                onClick={() => setDietFilter("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`filter-pill ${dietFilter === "veg" ? "active" : ""}`}
                onClick={() => setDietFilter("veg")}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#27ae60" }}></span>
                Vegetarian
              </button>
              <button
                type="button"
                className={`filter-pill ${dietFilter === "non-veg" ? "active" : ""}`}
                onClick={() => setDietFilter("non-veg")}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#c0392b" }}></span>
                Non-Veg
              </button>
            </div>

            {/* Chef's Reserve Toggle & Reset */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  userSelect: "none"
                }}
              >
                <input
                  type="checkbox"
                  checked={onlySpecials}
                  onChange={(e) => setOnlySpecials(e.target.checked)}
                  style={{ accentColor: "#C6A66B" }}
                />
                <Sparkles size={14} color="#C6A66B" /> Chef's Reserve Only
              </label>

              {(selectedCategory !== "all" ||
                searchQuery ||
                dietFilter !== "all" ||
                onlySpecials ||
                sortBy !== "featured") && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--color-muted-grey)",
                    fontSize: "0.8rem",
                    padding: "4px 8px"
                  }}
                  title="Reset all filters"
                >
                  <RotateCcw size={13} /> Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.88rem", color: "var(--color-muted-grey)" }}>
            Showing <strong>{filteredDishes.length}</strong> {filteredDishes.length === 1 ? "dish" : "dishes"}
            {selectedCategory !== "all" && ` in ${selectedCategory.replace("-", " ")}`}
          </span>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="food-grid">
            {filteredDishes.map((dish) => (
              <FoodCard key={dish.id} food={dish} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Utensils size={32} />
            </div>
            <h3 className="empty-state-title">No Dishes Found</h3>
            <p className="empty-state-desc">
              We couldn't find any dishes matching your current search criteria. Try adjusting your dietary preferences or search keywords.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
