import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../../utils/adminApi";
import "../../admin.css";

const AdminSetup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [alreadySetup, setAlreadySetup] = useState(false);
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const check = async () => {
            try {
                const { data } = await adminApi.get("/setup-check");
                if (data.exists) setAlreadySetup(true);
            } catch (err) {
                console.error("Setup check failed", err);
            } finally {
                setChecking(false);
            }
        };
        check();
    }, []);

    const handleSetup = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }
        setLoading(true);

        try {
            const { data } = await adminApi.post("/setup", { name, email, password });
            if (data.success) {
                alert("Admin account created! You can now log in.");
                navigate("/admin/login");
            }
        } catch (err) {
            alert(err.response?.data?.error || "Setup failed.");
        } finally {
            setLoading(false);
        }
    };

    if (checking) {
        return (
            <div className="admin-loading">
                <div className="admin-spinner" />
                <p style={{ marginLeft: 10, fontSize: 14, color: "#888" }}>Checking setup status...</p>
            </div>
        );
    }

    if (alreadySetup) {
        return (
            <div className="admin-login-page">
                <div className="admin-login-card" style={{ textAlign: "center" }}>
                    <h1 style={{ marginBottom: 16 }}>Setup Complete</h1>
                    <p className="subtitle" style={{ marginBottom: 24 }}>An admin account already exists.</p>
                    <button onClick={() => navigate("/admin/login")} className="admin-form-submit">
                        GO TO ADMIN LOGIN
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <h1 style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 24 }}>LABAS</h1>
                    <p className="subtitle">First-Time Admin Setup</p>
                </div>

                <form onSubmit={handleSetup}>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Full Name</label>
                        <input
                            type="text"
                            className="admin-form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Admin Name"
                            required
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Email</label>
                        <input
                            type="email"
                            className="admin-form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@labas.com"
                            required
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Password</label>
                        <input
                            type="password"
                            className="admin-form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="admin-form-submit">
                        {loading ? "CREATING..." : "CREATE ADMIN ACCOUNT"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminSetup;
