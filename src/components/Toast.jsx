import React from "react";
import { useToast } from "../context/ToastContext";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export default function Toast() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={18} color="#C6A66B" />;
      case "warning":
        return <AlertTriangle size={18} color="#f39c12" />;
      case "error":
        return <AlertCircle size={18} color="#e74c3c" />;
      default:
        return <Info size={18} color="#3498db" />;
    }
  };

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {getIcon(toast.type)}
            <span style={{ fontSize: "0.88rem", fontWeight: "500" }}>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ color: "#888", display: "flex", padding: "4px" }}
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
