import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// attach jwt token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("labas_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// handle 401 responses globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("labas_token");
            localStorage.removeItem("labas_user");
            // only redirect if not already on an auth page
            if (
                !window.location.pathname.includes("/signin") &&
                !window.location.pathname.includes("/signup")
            ) {
                window.location.href = "/signin";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
