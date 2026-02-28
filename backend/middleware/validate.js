const { validationResult } = require("express-validator");

/* middleware to check express validator results and return 400 with error details if validation fails */
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const messages = errors.array().map((err) => err.msg);

        return res.status(400).json({
            success: false,
            error: messages.join(", "),
        });
    }

    next();
};

module.exports = validate;
