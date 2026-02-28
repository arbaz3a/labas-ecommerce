const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth");
const {
    register,
    login,
    forgotPassword,
    resetPassword,
    getMe,
} = require("../controllers/authController");

const router = express.Router();

// register
router.post(
    "/register",
    [
        body("name").trim().notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Please provide a valid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    validate,
    register
);

// login
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Please provide a valid email"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    validate,
    login
);

// forgot password
router.post(
    "/forgot-password",
    [body("email").isEmail().withMessage("Please provide a valid email")],
    validate,
    forgotPassword
);

// reset password
router.post(
    "/reset-password/:token",
    [
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    validate,
    resetPassword
);

// get current user protected
router.get("/me", protect, getMe);

module.exports = router;
