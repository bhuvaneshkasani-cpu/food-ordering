/**
 * Form Validation Utilities
 */

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return "Email address is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return "Phone number is required";
  }
  // Allow phone numbers with + () - and digits, minimum 8 digits
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  if (cleaned.length < 8 || !/^\d+$/.test(cleaned)) {
    return "Please enter a valid phone number (at least 8 digits)";
  }
  return null;
};

export const validateFullName = (name) => {
  if (!name || !name.trim()) {
    return "Full name is required";
  }
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }
  return null;
};

export const validateCheckoutForm = (formData) => {
  const errors = {};

  const nameErr = validateFullName(formData.name);
  if (nameErr) errors.name = nameErr;

  const phoneErr = validatePhone(formData.phone);
  if (phoneErr) errors.phone = phoneErr;

  if (!formData.address || !formData.address.trim()) {
    errors.address = "Delivery address is required";
  } else if (formData.address.trim().length < 6) {
    errors.address = "Please provide a complete delivery street address";
  }

  if (!formData.city || !formData.city.trim()) {
    errors.city = "City is required";
  }

  if (!formData.pincode || !formData.pincode.trim()) {
    errors.pincode = "Postal / Pincode is required";
  } else if (!/^[A-Za-z0-9\s\-]{3,10}$/.test(formData.pincode.trim())) {
    errors.pincode = "Please enter a valid postal code";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
