import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { validateEmail, validateFullName } from "../utils/validation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Private Dining Inquiry",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const { addToast } = useToast();

  const faqs = [
    {
      q: "How does L'Élixir maintain optimal temperature during transit?",
      a: "Our dispatch fleet utilizes proprietary culinary thermal cases featuring precision induction plate heating for hot courses (retaining 65°C) and cryogenic passive chillers for caviar and chilled desserts (retaining 4°C). Plating integrity remains pristine from kitchen to residence."
    },
    {
      q: "Can I schedule a multi-course dinner in advance?",
      a: "Absolutely. During checkout or via our Concierge desk, you may request bespoke delivery windows up to 14 days in advance to align with private celebrations or intimate gatherings."
    },
    {
      q: "Are the dishes suitable for guests with allergies or specific dietary regimes?",
      a: "Every dish listing contains full ingredient profiles and dietary badges. Our master chefs welcome custom instructions and can substitute ingredients to accommodate gluten sensitivities, nut allergies, or strict vegan regimes upon note."
    },
    {
      q: "What is your satisfaction guarantee?",
      a: "If any dish fails to meet our three-star standard of culinary excellence or arrives compromised in presentation, our Concierge will immediately arrange a private culinary compensation or complimentary remake without question."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    const nameErr = validateFullName(formData.name);
    if (nameErr) errs.name = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) errs.email = emailErr;

    if (!formData.message.trim()) {
      errs.message = "Please include your inquiry details";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitted(true);
    addToast("Inquiry received. A senior concierge will contact you within 2 hours.", "success");
    setFormData({ name: "", email: "", subject: "Private Dining Inquiry", message: "" });
    setErrors({});
  };

  return (
    <div className="contact-page" style={{ padding: "50px 0 90px" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">Concierge Desk</span>
          <h1 className="section-title">Private Inquiries & Reservations</h1>
          <p className="section-subtitle">
            Our dedicated culinary concierge is at your service 7 days a week for custom menus,
            cellar pairings, and private dining arrangements.
          </p>
        </div>

        {/* Contact Split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "40px", marginBottom: "80px" }}>
          {/* Left: Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="luxe-card" style={{ padding: "30px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ color: "#C6A66B", marginTop: "4px" }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>Sanctuary Address</h4>
                  <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: "1.6" }}>
                    450 Park Avenue, Upper East Side<br />
                    New York, NY 10022
                  </p>
                </div>
              </div>
            </div>

            <div className="luxe-card" style={{ padding: "30px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ color: "#C6A66B", marginTop: "4px" }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>Private Line</h4>
                  <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: "1.6" }}>
                    +1 (212) 555-LUXE (5893)<br />
                    Toll-Free Connoisseurs: +1 (800) 492-3847
                  </p>
                </div>
              </div>
            </div>

            <div className="luxe-card" style={{ padding: "30px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ color: "#C6A66B", marginTop: "4px" }}>
                  <Mail size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>Direct Email</h4>
                  <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: "1.6" }}>
                    concierge@lelixir-dining.com<br />
                    sommelier@lelixir-dining.com
                  </p>
                </div>
              </div>
            </div>

            <div className="luxe-card" style={{ padding: "30px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ color: "#C6A66B", marginTop: "4px" }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>Dispatch & Service Hours</h4>
                  <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: "1.6" }}>
                    Monday – Sunday: 11:30 AM – 11:30 PM EST<br />
                    Sommelier Desk: 2:00 PM – 10:00 PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Form */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #E6DED2",
              padding: "40px",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <h3 style={{ fontSize: "1.4rem", marginBottom: "10px" }}>Send a Private Inquiry</h3>
            <p style={{ color: "var(--color-muted-grey)", fontSize: "0.9rem", marginBottom: "24px" }}>
              Leave your coordinates and our Head Concierge will attend to your request promptly.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lady Vivienne"
                    className={`form-input ${errors.name ? "has-error" : ""}`}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vivienne@estate.com"
                    className={`form-input ${errors.email ? "has-error" : ""}`}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nature of Inquiry</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                  style={{ cursor: "pointer" }}
                >
                  <option value="Private Dining Inquiry">Private Dining Delivery</option>
                  <option value="Chef Tasting Menu">Chef's Reserve Tasting Menu</option>
                  <option value="Sommelier Wine Pairing">Sommelier & Cellar Pairing</option>
                  <option value="Corporate Banquet">Corporate & Diplomatic Banquet</option>
                  <option value="Dietary Consultation">Custom Dietary Consultation</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Your Message or Event Details *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="5"
                  placeholder="Tell us about your culinary preferences, guest count, or bespoke requirements..."
                  className={`form-input ${errors.message ? "has-error" : ""}`}
                  style={{ resize: "vertical" }}
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: "100%", marginTop: "12px" }}
              >
                Dispatch Inquiry to Concierge <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="section-header" style={{ marginBottom: "36px" }}>
            <span className="section-badge">Frequent Queries</span>
            <h2 style={{ fontSize: "2rem" }}>Connoisseur Inquiries</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    border: "1px solid #E6DED2",
                    overflow: "hidden"
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#242424",
                      fontSize: "1rem"
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="#C6A66B" /> : <ChevronDown size={18} color="#888" />}
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 24px 20px", color: "#555", fontSize: "0.92rem", lineHeight: "1.7" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
