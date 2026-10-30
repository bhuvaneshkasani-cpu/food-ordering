# L'ÉLIXIR | Haute Cuisine & Luxury Food Ordering

An ultra-premium, modern, responsive luxury food ordering web application inspired by three-star Michelin establishments and world-class culinary salons. Built using React, React Router DOM, LocalStorage, and handcrafted CSS.

---

## 🎨 Luxury Palette & Design Language

- **Midnight Black (`#151515`)**: Used for the grand navigation bar, primary buttons, and luxury section backgrounds.
- **Charcoal (`#242424`)**: Primary heading colors and high-contrast surfaces.
- **Champagne Gold (`#C6A66B`)**: Sophisticated accents, price tags, star ratings, and button hover highlights.
- **Warm Ivory (`#F5EFE5`)**: Warm, inviting page background giving a high-end editorial feel.
- **Crisp White (`#FFFFFF`)**: Culinary card containers, modals, and input fields.
- **Dark Text (`#292929`)**: Highly readable body text with optical kerning.
- **Muted Grey (`#888888`)**: Secondary captions and dietary metadata.
- **Typography**: Combination of luxury serif (*Playfair Display* & *Cormorant Garamond*) with clean geometric sans-serif (*Montserrat*).

---

## 🚀 Key Features

1. **Haute Cuisine Catalog**: 27 high-resolution dishes across 7 curated categories:
   - *Starters*, *Main Course*, *Pizza*, *Burgers*, *Pasta*, *Desserts*, and *Beverages*.
2. **Dynamic Filtering & Live Search**:
   - Filter by categories, Pure Vegetarian, or Non-Vegetarian.
   - Chef's Reserve filter.
   - Price sorting (Low to High, High to Low) and Rating sorting.
   - Real-time search query matching dish names and ingredients.
3. **Cart & Connoisseur Checkout**:
   - Dynamic quantity adjustment and line subtotals.
   - Privilege voucher system (`LUXE20`, `GOLDEN10`, `FIRSTBITE`).
   - Free white-glove concierge delivery on orders over $100.
   - Form validation for delivery coordinates.
   - Simulated demonstration payment options (Cash on Delivery & Instant UPI).
   - Unique Order ID generation (`LX-XXXXXX`).
4. **Live Order Tracking**:
   - Multi-step timeline progress (Order Placed &rarr; Preparing &rarr; Out for Delivery &rarr; Delivered).
   - Interactive "Advance Status" simulation button.
5. **Private Wishlist**:
   - Bookmark favorite creations with LocalStorage persistence.
   - "Add All to Cart" batch action.
6. **Authentication & User Profile**:
   - Demo account pre-configured: `alexander@luxury.com` / `Luxury123!`.
   - Browser-side SHA-256 password hashing.
   - Edit personal coordinates (address, phone, name).
7. **Luxury Toast Notifications**:
   - Animated visual feedback on adding/removing items, authentication, applying vouchers, and ordering.

---

## 💻 Running the Application

In your terminal, navigate to the project directory:

```bash
cd "C:\Users\bhuva\.gemini\antigravity\scratch\luxury-food-ordering"
npm run dev
```

Open your browser to:
`http://localhost:3000` or the port displayed in your terminal.
