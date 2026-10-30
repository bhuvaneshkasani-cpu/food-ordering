import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validatePassword
} from "../utils/validation";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [regError, setRegError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegError("");

    const errs = {};
    const nameErr = validateFullName(formData.fullName);
    if (nameErr) errs.fullName = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) errs.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) errs.phone = phoneErr;

    const passErr = validatePassword(formData.password);
    if (passErr) errs.password = passErr;

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });
    setIsSubmitting(false);

    if (result.success) {
      navigate("/profile");
    } else {
      setRegError(result.error);
    }
  };

  return (
    <div style={{ padding: "60px 20px 90px", backgroundColor: "var(--color-warm-ivory)", minHeight: "80vh" }}>
      <div className="auth-container" style={{ maxWidth: "520px" }}>
        <div className="auth-header">
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "1px solid var(--color-champagne-gold)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              color: "var(--color-champagne-gold)",
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "1.3rem"
            }}
          >
            É
          </div>
          <h2>Join the Guild</h2>
          <p style={{ color: "var(--color-muted-grey)", fontSize: "0.9rem" }}>
            Register to unlock bespoke dining tasting flights, chef's reserves, and priority dispatch.
          </p>
        </div>

        {regError && (
          <div
            style={{
              backgroundColor: "var(--color-danger-light)",
              border: "1px solid var(--color-danger)",
              color: "var(--color-danger)",
              padding: "12px 16px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              marginBottom: "20px"
            }}
          >
            {regError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Genevieve Laurent"
              className={`form-input ${errors.fullName ? "has-error" : ""}`}
            />
            {errors.fullName && <span className="form-error">{errors.fullName}</span>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@domain.com"
                className={`form-input ${errors.email ? "has-error" : ""}`}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className={`form-input ${errors.phone ? "has-error" : ""}`}
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                className={`form-input ${errors.password ? "has-error" : ""}`}
              />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                className={`form-input ${errors.confirmPassword ? "has-error" : ""}`}
              />
              {errors.confirmPassword && (
                <span className="form-error">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-lg"
            style={{ width: "100%", marginTop: "16px" }}
          >
            {isSubmitting ? "Creating Account..." : "Complete Registration"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "18px", borderTop: "1px solid #eee", fontSize: "0.88rem" }}>
          <span style={{ color: "var(--color-muted-grey)" }}>Already registered? </span>
          <Link to="/login" style={{ color: "var(--color-champagne-gold)", fontWeight: 600 }}>
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
