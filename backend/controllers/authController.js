const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const sendTokenResponse = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");

/* desc register user route post api auth register access public */
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorResponse("An account with this email already exists", 400));
        }

        // create user
        const user = await User.create({ name, email, password });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        next(err);
    }
};

/* desc login user route post api auth login access public */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // find user and include password field
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        // check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

/* desc forgot password send reset email route post api auth forgot password access public */
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(new ErrorResponse("No account found with that email", 404));
        }

        // get reset token
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        // create reset url
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const html = `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset for your LABAS account.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">Reset Password</a>
      <p>This link will expire in <strong>15 minutes</strong>.</p>
      <p>If you did not request this, please ignore this email.</p>
    `;

        try {
            await sendEmail({
                to: user.email,
                subject: "LABAS — Password Reset",
                text: `Reset your password by visiting: ${resetUrl}`,
                html,
            });

            res.status(200).json({
                success: true,
                message: "Password reset email sent",
            });
        } catch (err) {
            // if email fails clean up the token
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (err) {
        next(err);
    }
};

/* desc reset password route post api auth reset password token access public */
exports.resetPassword = async (req, res, next) => {
    try {
        // hash the token from the url
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(new ErrorResponse("Invalid or expired reset token", 400));
        }

        // set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

/* desc get current logged in user route get api auth me access private */
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        next(err);
    }
};
