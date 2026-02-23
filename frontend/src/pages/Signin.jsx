import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fake login
    login({ email });
    navigate("/profile"); // redirect after login
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
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "32px",
            textAlign: "center",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Sign In
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#737373",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "48px",
          }}
        >
          Welcome back
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
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
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              to="/forgot-password"
              style={{
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#737373",
                textDecoration: "none",
              }}
            >
              Forgot your password?
            </Link>
          </div>

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
              marginTop: "8px",
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <p
            style={{
              fontSize: "11px",
              color: "#737373",
              letterSpacing: "0.1em",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#000",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              CREATE ONE
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
