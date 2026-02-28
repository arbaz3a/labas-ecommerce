import React, { useState, useEffect } from "react";
import adminApi from "../../utils/adminApi";
import { Store } from "lucide-react";

const AdminSettings = () => {
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="admin-settings-container">
            <div style={{ marginBottom: 32 }}>
                <h1 className="admin-page-title">Settings</h1>
                <p className="admin-page-subtitle">View your store's configuration</p>
            </div>

            {toast && (
                <div className={`admin-toast admin-toast-${toast.type}`}>
                    {toast.msg}
                </div>
            )}

            <div className="admin-settings-grid" style={{ gridTemplateColumns: '1fr' }}>
                {/* store information card */}
                <div className="admin-settings-card" style={{ maxWidth: '600px' }}>
                    <div className="admin-settings-card-header">
                        <h3>
                            <Store size={18} />
                            Store Information
                        </h3>
                        <p>Basic details about your online store</p>
                    </div>

                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label className="admin-form-label">Store Name</label>
                            <input type="text" className="admin-form-input" defaultValue="LABAS" disabled />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-form-label">Support Email</label>
                            <input type="email" className="admin-form-input" defaultValue="support@labas.com" disabled />
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-form-label">Currency</label>
                        <select className="admin-select" style={{ width: '100%' }} disabled>
                            <option>PKR - Pakistani Rupee</option>
                        </select>
                    </div>

                    <p className="admin-field-info">
                        Contact system administrator to change these details.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
