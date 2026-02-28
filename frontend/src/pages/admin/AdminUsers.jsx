import React, { useEffect, useState } from "react";
import adminApi from "../../utils/adminApi";
import { Search, Trash2 } from "lucide-react";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const { data } = await adminApi.get("/users", {
                params: search ? { search } : {},
            });
            setUsers(data.users);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [search]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await adminApi.delete(`/users/${id}`);
            setUsers(users.filter((u) => u._id !== id));
        } catch (err) {
            alert(err.response?.data?.error || "Failed to delete user");
        }
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="admin-spinner" />
            </div>
        );
    }

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Users</h1>
                <div className="admin-search">
                    <Search />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: "center", color: "#999", padding: "32px" }}>
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td style={{ fontWeight: 600 }}>{user.name || "N/A"}</td>
                                    <td>{user.email || "N/A"}</td>
                                    <td>
                                        <span
                                            className={
                                                user.role === "admin"
                                                    ? "admin-badge admin-badge-blue"
                                                    : "admin-badge admin-badge-gray"
                                            }
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <button
                                            className="admin-btn-danger"
                                            onClick={() => handleDelete(user._id)}
                                            title="Delete user"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* mobile cards */}
            <div className="admin-card-list">
                {users.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>No users found</p>
                ) : (
                    users.map((user) => (
                        <div className="admin-mobile-card" key={user._id}>
                            <div className="admin-mobile-card-header">
                                <div className="admin-mobile-card-title">{user.name || "N/A"}</div>
                                <button
                                    className="admin-btn-icon-danger"
                                    onClick={() => handleDelete(user._id)}
                                    style={{ color: "#E55B5B" }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="admin-mobile-card-body">
                                <div className="admin-mobile-card-info">
                                    <label>Phone</label>
                                    {user.phone || "N/A"}
                                </div>
                                <div className="admin-mobile-card-info">
                                    <label>City</label>
                                    {user.city || "N/A"}
                                </div>
                                <div className="admin-mobile-card-info">
                                    <label>Joined</label>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                                <div className="admin-mobile-card-info">
                                    <label>Role</label>
                                    <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                        {user.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
