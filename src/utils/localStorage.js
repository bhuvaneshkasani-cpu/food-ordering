/**
 * LocalStorage Utility & Demo Cryptographic Helpers
 *
 * NOTE ON SECURITY LIMITATIONS:
 * In this client-only demonstration architecture, authentication and data
 * persistence operate entirely within the browser's LocalStorage and Web Crypto API.
 * Password hashing uses SHA-256 with a client-side salt. In a real-world production
 * environment, user credentials must NEVER be validated solely on the client, and
 * passwords must be hashed on a secure backend server using salted algorithms like
 * bcrypt, argon2, or scrypt with secure HTTP-only cookies or JWT tokens.
 */

const STORAGE_KEYS = {
  USERS: "luxe_users_store",
  CURRENT_USER: "luxe_current_user",
  CART: "luxe_shopping_cart",
  WISHLIST: "luxe_wishlist_items",
  ORDERS: "luxe_order_history",
  COUPON: "luxe_active_coupon"
};

// Safe LocalStorage helpers
export const getStorageItem = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return fallback;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

/**
 * Browser-side SHA-256 Hashing with client salt
 */
export const hashPassword = async (password) => {
  const salt = "luxe_elixir_2026_client_salt";
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

// Initial mock user if none exists
export const initDemoUsers = async () => {
  const existingUsers = getStorageItem(STORAGE_KEYS.USERS, null);
  if (!existingUsers || existingUsers.length === 0) {
    const sampleHashedPassword = await hashPassword("Luxury123!");
    const defaultUsers = [
      {
        id: "usr_demo_1",
        fullName: "Alexander Sterling",
        email: "alexander@luxury.com",
        phone: "+1 (555) 389-2940",
        passwordHash: sampleHashedPassword,
        address: "Penthouse 42B, 740 Park Avenue",
        city: "New York",
        pincode: "10021",
        memberTier: "Royal Gold Connoisseur",
        createdAt: new Date().toISOString()
      }
    ];
    setStorageItem(STORAGE_KEYS.USERS, defaultUsers);
  }
};

// Cart persistence
export const getStoredCart = () => getStorageItem(STORAGE_KEYS.CART, []);
export const saveStoredCart = (cart) => setStorageItem(STORAGE_KEYS.CART, cart);

// Wishlist persistence
export const getStoredWishlist = () => getStorageItem(STORAGE_KEYS.WISHLIST, []);
export const saveStoredWishlist = (wishlist) => setStorageItem(STORAGE_KEYS.WISHLIST, wishlist);

// Orders persistence
export const getStoredOrders = () => getStorageItem(STORAGE_KEYS.ORDERS, []);
export const saveStoredOrders = (orders) => setStorageItem(STORAGE_KEYS.ORDERS, orders);

// User persistence
export const getStoredUsers = () => getStorageItem(STORAGE_KEYS.USERS, []);
export const saveStoredUsers = (users) => setStorageItem(STORAGE_KEYS.USERS, users);

export const getStoredCurrentUser = () => getStorageItem(STORAGE_KEYS.CURRENT_USER, null);
export const saveStoredCurrentUser = (user) => setStorageItem(STORAGE_KEYS.CURRENT_USER, user);
export const clearStoredCurrentUser = () => removeStorageItem(STORAGE_KEYS.CURRENT_USER);

// Coupons definition
export const AVAILABLE_COUPONS = [
  {
    code: "LUXE20",
    discountPercent: 20,
    minOrder: 80,
    description: "20% off on orders above $80"
  },
  {
    code: "GOLDEN10",
    discountPercent: 10,
    minOrder: 40,
    description: "10% off on orders above $40"
  },
  {
    code: "FIRSTBITE",
    fixedDiscount: 15,
    minOrder: 60,
    description: "$15 off on orders above $60"
  }
];

export { STORAGE_KEYS };
