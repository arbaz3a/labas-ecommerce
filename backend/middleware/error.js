const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // log to console for dev
    if (process.env.NODE_ENV === "development") {
        console.error(err.stack);
    }

    // mongoose bad objectid
    if (err.name === "CastError") {
        const message = "Resource not found";
        error = new ErrorResponse(message, 404);
    }

    // mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `An account with this ${field} already exists`;
        error = new ErrorResponse(message, 400);
    }

    // mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
        error = new ErrorResponse(message, 400);
    }

    // jwt errors
    if (err.name === "JsonWebTokenError") {
        error = new ErrorResponse("Invalid token", 401);
    }

    if (err.name === "TokenExpiredError") {
        error = new ErrorResponse("Token expired", 401);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
    });
};

module.exports = errorHandler;
