import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("labas_token") || null);
  const [loading, setLoading] = useState(true);

  // on mount validate stored token by calling auth me
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("labas_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
        setToken(storedToken);
      } catch {
        // token invalid or expired clear
        localStorage.removeItem("labas_token");
        localStorage.removeItem("labas_user");
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("labas_token", jwtToken);
    localStorage.setItem("labas_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("labas_token");
    localStorage.removeItem("labas_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
