import React, { useContext, useState } from "react";
import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    Tag,
    Settings,
    Store,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import "../../admin.css";

const links = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/products", icon: Package, label: "Products" },
    { to: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const AdminLayout = () => {
    const { admin, loading, logout } = useContext(AdminContext);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="admin-spinner" />
            </div>
        );
    }

    if (!admin || admin.role !== "admin") {
        return <Navigate to="/admin/login" />;
    }

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    return (
        <>
            <header className="admin-mobile-header">
                <button
                    className="admin-mobile-toggle"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu size={20} />
                </button>
                <div className="admin-sidebar-brand" style={{ fontFamily: "var(--admin-font-serif)", paddingBottom: 0, borderBottom: 'none', marginBottom: 0 }}>
                    LABAS <span style={{ marginLeft: 4, fontWeight: '800', fontSize: '10px', background: '#111', color: '#fff', padding: '2px 4px', borderRadius: '2px' }}>ADMIN</span>
                </div>
            </header>

            {/* overlay */}
            {sidebarOpen && (
                <div
                    className="admin-sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="admin-sidebar-brand" style={{ fontFamily: "var(--admin-font-serif)", paddingBottom: '20px', borderBottom: '1px solid #f0f0f0', marginBottom: '10px' }}>
                    LABAS <span style={{ marginLeft: 4, fontWeight: '800', fontSize: '10px', background: '#111', color: '#fff', padding: '2px 4px', borderRadius: '2px' }}>ADMIN</span>
                </div>

                <nav className="admin-sidebar-nav">
                    {links.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `admin-sidebar-link ${isActive ? "active" : ""}`
                            }
                            onClick={() => setSidebarOpen(false)}
                        >
                            <Icon size={18} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <div className="admin-sidebar-footer">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-sidebar-link"
                    >
                        <Store size={18} />
                        View Store
                    </a>
                    <button className="admin-sidebar-link" onClick={handleLogout}>
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* main content */}
            <main className="admin-main">
                <Outlet />
            </main>
        </>
    );
};

export default AdminLayout;
