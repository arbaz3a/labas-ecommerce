const backendUrl = "http://localhost:5000";

export const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("data:")) return path;
    // remove leading slash if exists to avoid double slashes
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${backendUrl}/${cleanPath}`;
};
