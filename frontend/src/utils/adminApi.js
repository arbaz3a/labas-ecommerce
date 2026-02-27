import axios from "axios";

const adminApi = axios.create({
    baseURL: "/api/admin",
    headers: { "Content-Type": "application/json" },
});

// Attach admin JWT token
adminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("labas_admin_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Redirect to admin login on 401
adminApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("labas_admin_token");
            localStorage.removeItem("labas_admin_user");
            if (!window.location.pathname.includes("/admin/login")) {
                window.location.href = "/admin/login";
            }
        }
        return Promise.reject(error);
    }
);

export default adminApi;
