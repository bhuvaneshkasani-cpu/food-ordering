import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, onClear, placeholder = "Search gourmet dishes, ingredients, courses..." }) {
  return (
    <div className="search-input-wrapper">
      <Search size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="search-clear-btn"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
