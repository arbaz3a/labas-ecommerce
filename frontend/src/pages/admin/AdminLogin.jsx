import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import adminApi from "../../utils/adminApi";
import "../../admin.css";

const AdminLogin = () => {
    const { login } = useContext(AdminContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSetupLink, setShowSetupLink] = useState(false);

    useEffect(() => {
        const checkSetup = async () => {
            try {
                const { data } = await adminApi.get("/setup-check");
                if (!data.exists) setShowSetupLink(true);
            } catch { }
        };
        checkSetup();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await adminApi.post("/login", form);
            login(data.user, data.token);
            navigate("/admin/dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <h1>Admin Login</h1>
                <p className="subtitle">Sign in to your LABAS admin panel</p>

                {showSetupLink && (
                    <div className="admin-login-error" style={{ background: "#EFF6FF", borderColor: "#DBEAFE", color: "#2563EB", textAlign: "center" }}>
                        First time? <Link to="/admin/setup" style={{ fontWeight: 700, textDecoration: "underline" }}>Setup Admin Account</Link>
                    </div>
                )}

                {error && <div className="admin-login-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Email</label>
                        <input
                            type="email"
                            className="admin-form-input"
                            placeholder="admin@labas.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Password</label>
                        <input
                            type="password"
                            className="admin-form-input"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="admin-form-submit" disabled={loading}>
                        {loading ? "SIGNING IN..." : "SIGN IN"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
