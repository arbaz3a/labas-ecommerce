const express = require("express");
const path = require("path");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect, authorize } = require("../middleware/auth");
const {
    adminSetup,
    checkAdminExists,
    adminLogin,
    getDashboardStats,
    getAllUsers,
    deleteUser,
    getAllOrders,
    updateOrderStatus,
    updatePaymentStatus,
    uploadProductImage,
    getSettings,
    getAdminProfile,
    updateProfile,
    changePassword,
    addAdmin,
} = require("../controllers/adminController");

const router = express.Router();

// ─── Rate limiter for auth routes ───
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, error: "Too many attempts, please try again later" },
});

// ─── Multer config for product images ───
const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "..", "public", "uploads", "products");
        const fs = require("fs");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});


const imageFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error("Only JPG, PNG, and WebP images are allowed"));
};

const uploadProduct = multer({
    storage: productStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});


// ─── Public routes (rate limited) ───
router.get("/setup-check", checkAdminExists);

router.post(
    "/setup",
    loginLimiter,
    [
        body("name").trim().notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    validate,
    adminSetup
);

router.post(
    "/login",
    loginLimiter,
    [
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    validate,
    adminLogin
);

// ─── All routes below require admin auth ───
router.use(protect, authorize("admin"));

// Dashboard
router.get("/dashboard", getDashboardStats);

// Users
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Orders
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);
router.put("/orders/:id/payment", updatePaymentStatus);

// Uploads
router.post("/upload/product", uploadProduct.array("images", 10), uploadProductImage);

// Settings
router.get("/settings", getSettings);
router.get("/profile", getAdminProfile);
router.put("/profile", updateProfile);
router.put(
    "/password",
    [
        body("currentPassword").notEmpty().withMessage("Current password is required"),
        body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
    ],
    validate,
    changePassword
);
router.post(
    "/add-admin",
    [
        body("name").trim().notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    validate,
    addAdmin
);

module.exports = router;
