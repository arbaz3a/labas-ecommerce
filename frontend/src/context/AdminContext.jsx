import React, { createContext, useState, useEffect } from "react";
import adminApi from "../utils/adminApi";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [adminToken, setAdminToken] = useState(
        localStorage.getItem("labas_admin_token") || null
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verify = async () => {
            const stored = localStorage.getItem("labas_admin_token");
            if (!stored) {
                setLoading(false);
                return;
            }
            try {
                const { data } = await adminApi.get("/profile");
                if (data.user.role !== "admin") throw new Error("Not admin");
                setAdmin(data.user);
                setAdminToken(stored);
            } catch {
                localStorage.removeItem("labas_admin_token");
                localStorage.removeItem("labas_admin_user");
                setAdmin(null);
                setAdminToken(null);
            } finally {
                setLoading(false);
            }
        };
        verify();
    }, []);

    const login = (user, token) => {
        setAdmin(user);
        setAdminToken(token);
        localStorage.setItem("labas_admin_token", token);
        localStorage.setItem("labas_admin_user", JSON.stringify(user));
    };

    const logout = () => {
        setAdmin(null);
        setAdminToken(null);
        localStorage.removeItem("labas_admin_token");
        localStorage.removeItem("labas_admin_user");
    };

    return (
        <AdminContext.Provider value={{ admin, adminToken, loading, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};
