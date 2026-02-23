import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <Link
          to="/signin"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#737373",
            textDecoration: "none",
            marginBottom: "48px",
          }}
        >
          ← Back to sign in
        </Link>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "32px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Forgot Password
        </h1>
        <p
          style={{
            color: "#737373",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "48px",
          }}
        >
          We'll send you a reset link
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid #e0e0e0",
                background: "transparent",
                padding: "12px 0",
                fontSize: "13px",
                letterSpacing: "0.1em",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#000",
                color: "#fff",
                padding: "16px",
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div>
            <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
              If an account exists for <strong>{email}</strong>, you'll receive
              a password reset link shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                width: "100%",
                border: "1px solid #000",
                background: "transparent",
                color: "#000",
                padding: "16px",
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                cursor: "pointer",
                marginTop: "24px",
              }}
            >
              Try another email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
