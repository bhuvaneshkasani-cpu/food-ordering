import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getStoredCurrentUser,
  saveStoredCurrentUser,
  clearStoredCurrentUser,
  getStoredUsers,
  saveStoredUsers,
  hashPassword,
  initDemoUsers
} from "../utils/localStorage";
import { useToast } from "./ToastContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await initDemoUsers();
        const storedUser = getStoredCurrentUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const users = getStoredUsers();
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === normalizedEmail
      );

      if (!existingUser) {
        return {
          success: false,
          error: "No account found with this email address."
        };
      }

      const inputHash = await hashPassword(password);
      if (existingUser.passwordHash !== inputHash) {
        return {
          success: false,
          error: "Invalid password. Please check your credentials."
        };
      }

      const sessionUser = {
        id: existingUser.id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        phone: existingUser.phone || "",
        address: existingUser.address || "",
        city: existingUser.city || "",
        pincode: existingUser.pincode || "",
        memberTier: existingUser.memberTier || "Royal Member",
        createdAt: existingUser.createdAt
      };

      saveStoredCurrentUser(sessionUser);
      setUser(sessionUser);
      addToast(`Welcome back, ${sessionUser.fullName}`, "success");
      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, error: "An unexpected error occurred during login." };
    }
  };

  const register = async ({ fullName, email, phone, password }) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const users = getStoredUsers();

      // Duplicate email check
      const duplicate = users.some(
        (u) => u.email.toLowerCase() === normalizedEmail
      );
      if (duplicate) {
        return {
          success: false,
          error: "An account with this email address already exists."
        };
      }

      const passwordHash = await hashPassword(password);
      const newUser = {
        id: "usr_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        passwordHash,
        address: "",
        city: "",
        pincode: "",
        memberTier: "Gold Member",
        createdAt: new Date().toISOString()
      };

      const updatedUsers = [...users, newUser];
      saveStoredUsers(updatedUsers);

      const sessionUser = {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        city: newUser.city,
        pincode: newUser.pincode,
        memberTier: newUser.memberTier,
        createdAt: newUser.createdAt
      };

      saveStoredCurrentUser(sessionUser);
      setUser(sessionUser);
      addToast(`Account created successfully! Welcome, ${sessionUser.fullName}`, "success");
      return { success: true };
    } catch (err) {
      console.error("Register error:", err);
      return { success: false, error: "An unexpected error occurred during registration." };
    }
  };

  const logout = () => {
    clearStoredCurrentUser();
    setUser(null);
    addToast("You have been signed out.", "info");
  };

  const updateProfile = (updatedFields) => {
    if (!user) return { success: false, error: "Not authenticated" };

    try {
      const users = getStoredUsers();
      const userIndex = users.findIndex((u) => u.id === user.id);

      const updatedUser = {
        ...user,
        ...updatedFields
      };

      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          ...updatedFields
        };
        saveStoredUsers(users);
      }

      saveStoredCurrentUser(updatedUser);
      setUser(updatedUser);
      addToast("Profile updated successfully", "success");
      return { success: true };
    } catch (err) {
      console.error("Update profile error:", err);
      return { success: false, error: "Failed to update profile." };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
