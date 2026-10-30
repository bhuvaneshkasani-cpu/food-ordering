import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldAlert, Sparkles, KeyRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/validation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/profile";

  const handleFillDemo = () => {
    setEmail("alexander@luxury.com");
    setPassword("Luxury123!");
    setErrors({});
    setAuthError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    const errs = {};
    const emailErr = validateEmail(email);
    if (emailErr) errs.email = emailErr;

    const passErr = validatePassword(password);
    if (passErr) errs.password = passErr;

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setAuthError(result.error);
    }
  };

  return (
    <div style={{ padding: "60px 20px 90px", backgroundColor: "var(--color-warm-ivory)", minHeight: "80vh" }}>
      <div className="auth-container">
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
          <h2>Connoisseur Sign In</h2>
          <p style={{ color: "var(--color-muted-grey)", fontSize: "0.9rem" }}>
            Access your personalized tasting selections, cellar reserves, and order history.
          </p>
        </div>

        {authError && (
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
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                }}
                placeholder="name@domain.com"
                className={`form-input ${errors.email ? "has-error" : ""}`}
              />
            </div>
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
              }}
              placeholder="••••••••"
              className={`form-input ${errors.password ? "has-error" : ""}`}
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-lg"
            style={{ width: "100%", marginTop: "12px" }}
          >
            {isSubmitting ? "Authenticating..." : "Sign In to L'Élixir"}
          </button>
        </form>

        {/* Demo Credentials Helper Pill */}
        <div className="demo-credentials-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
              <KeyRound size={15} color="#C6A66B" /> Demonstration Account
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              style={{
                fontSize: "0.75rem",
                color: "#C6A66B",
                fontWeight: 700,
                textDecoration: "underline",
                cursor: "pointer"
              }}
            >
              Fill Credentials
            </button>
          </div>
          <div style={{ fontSize: "0.78rem", color: "#555", lineHeight: "1.5" }}>
            Email: <code>alexander@luxury.com</code><br />
            Password: <code>Luxury123!</code>
          </div>
        </div>

        {/* Security limitation notice */}
        <div style={{ marginTop: "20px", display: "flex", gap: "8px", fontSize: "0.75rem", color: "#888", lineHeight: "1.4" }}>
          <ShieldAlert size={14} color="#C6A66B" style={{ flexShrink: 0, marginTop: "2px" }} />
          <span>
            Demonstration Note: Passwords are encrypted locally via browser SHA-256 Web Crypto API. No external databases are contacted.
          </span>
        </div>

        <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "18px", borderTop: "1px solid #eee", fontSize: "0.88rem" }}>
          <span style={{ color: "var(--color-muted-grey)" }}>New to L'Élixir? </span>
          <Link to="/register" style={{ color: "var(--color-champagne-gold)", fontWeight: 600 }}>
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
