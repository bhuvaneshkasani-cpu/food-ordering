import React from "react";
import {
  Utensils,
  Soup,
  Beef,
  Pizza,
  Sandwich,
  Wheat,
  Cake,
  GlassWater
} from "lucide-react";

export default function CategoryCard({ category, isActive, onClick }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Soup":
        return <Soup size={24} />;
      case "Beef":
        return <Beef size={24} />;
      case "Pizza":
        return <Pizza size={24} />;
      case "Sandwich":
        return <Sandwich size={24} />;
      case "Wheat":
        return <Wheat size={24} />;
      case "Cake":
        return <Cake size={24} />;
      case "GlassWater":
        return <GlassWater size={24} />;
      default:
        return <Utensils size={24} />;
    }
  };

  return (
    <div
      className={`category-card ${isActive ? "active" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="category-icon-wrap">
        {getIcon(category.icon)}
      </div>
      <span className="category-name">{category.name}</span>
    </div>
  );
}
