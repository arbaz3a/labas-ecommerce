import React, { useEffect, useState } from "react";
import adminApi from "../../utils/adminApi";
import { Users, ShoppingCart, DollarSign, Package, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const statusBadge = (status) => {
    const map = {
        pending: "admin-badge admin-badge-gray",
        processing: "admin-badge admin-badge-yellow",
        shipped: "admin-badge admin-badge-blue",
        delivered: "admin-badge admin-badge-green",
        confirmed: "admin-badge admin-badge-green",
        cancelled: "admin-badge admin-badge-red",
    };
    return map[status] || "admin-badge admin-badge-gray";
};

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const { data } = await adminApi.get("/dashboard");
            setStats(data.stats);
            setRecentOrders(data.recentOrders);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="admin-spinner" />
            </div>
        );
    }

    const statCards = [
        { label: "Total Users", value: stats?.totalUsers || 0, icon: Users, color: "#3B82F6", bg: "#EFF6FF" },
        { label: "Total Orders", value: stats?.totalOrders || 0, icon: ShoppingCart, color: "#10B981", bg: "#ECFDF5" },
        { label: "Revenue", value: `Rs ${(stats?.revenue || 0).toLocaleString()}`, icon: DollarSign, color: "#D97706", bg: "#FFFBEB" },
        { label: "Products", value: stats?.totalProducts || 0, icon: Package, color: "#8B5CF6", bg: "#F5F3FF" },
    ];

    return (
        <div className="admin-dashboard-wrapper">
            <div className="admin-dashboard-header">
                <div>
                    <h1 className="admin-page-title">Dashboard</h1>
                    <p className="admin-page-subtitle">Overview of your store performance</p>
                </div>
                <div className="admin-updated">
                    <TrendingUp size={14} />
                    Updated just now
                </div>
            </div>

            {/* Stat Cards */}
            <div className="admin-stats-grid">
                {statCards.map((card, idx) => (
                    <div className="admin-stat-card" key={idx}>
                        <div className="admin-stat-info">
                            <div className="admin-stat-label">{card.label}</div>
                            <div className="admin-stat-value">{card.value}</div>
                        </div>
                        <div className="admin-stat-icon-wrap" style={{ backgroundColor: card.bg, color: card.color }}>
                            <card.icon size={20} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="admin-dashboard-sections">
                {/* Recent Orders */}
                <div className="admin-dashboard-section card-recent">
                    <div className="admin-section-header">
                        <h3 className="admin-section-title">Recent Orders</h3>
                        <span className="admin-section-subtitle">Last {recentOrders.length} orders</span>
                    </div>

                    <div className="admin-recent-list">
                        {recentOrders.length === 0 ? (
                            <div className="admin-empty-state">
                                <ShoppingCart size={32} />
                                <p>No orders yet</p>
                            </div>
                        ) : (
                            recentOrders.map((order) => (
                                <div className="admin-recent-row" key={order._id}>
                                    <div className="admin-recent-meta">
                                        <div className="admin-recent-icon">
                                            <Package size={16} />
                                        </div>
                                        <div>
                                            <div className="admin-recent-name">{order.user?.name || "Customer"}</div>
                                            <div className="admin-recent-date">
                                                {new Date(order.createdAt).toLocaleDateString("en-PK", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="admin-recent-data">
                                        <div className="admin-recent-amount">Rs {order.totalPrice?.toLocaleString()}</div>
                                        <div className={statusBadge(order.status)}>{order.status}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {recentOrders.length > 0 && (
                        <Link to="/admin/orders" className="admin-view-all-link">
                            View All Orders <ArrowRight size={14} />
                        </Link>
                    )}
                </div>

                {/* Low Stock Alert placeholder */}
                <div className="admin-dashboard-section card-alerts">
                    <div className="admin-alert-box warning">
                        <div className="admin-alert-icon">
                            <AlertTriangle size={18} />
                        </div>
                        <div className="admin-alert-content">
                            <h4 className="admin-alert-title">Low Stock Alert</h4>
                            <p className="admin-alert-text">
                                <span className="highlight">3</span> products with less than 10 units in stock.
                            </p>
                        </div>
                    </div>

                    <div className="admin-promo-placeholder">
                        <h4 className="text-sm font-semibold mb-2">Admin Tip</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Check your inventory regularly to ensure popular items stay in stock during peak seasons.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
