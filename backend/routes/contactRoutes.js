const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { submitContact } = require("../controllers/contactController");

const router = express.Router();

// submit contact form
router.post(
    "/",
    [
        body("name").trim().notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Please provide a valid email"),
        body("message")
            .trim()
            .notEmpty()
            .withMessage("Message is required")
            .isLength({ max: 1000 })
            .withMessage("Message cannot exceed 1000 characters"),
    ],
    validate,
    submitContact
);

module.exports = router;
