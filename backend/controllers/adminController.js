const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const ErrorResponse = require("../utils/ErrorResponse");
const sendTokenResponse = require("../utils/sendToken");

// setup check if admin already exists
exports.checkAdminExists = async (req, res, next) => {
    try {
        const admin = await User.findOne({ role: "admin" });
        res.status(200).json({ success: true, exists: !!admin });
    } catch (err) {
        next(err);
    }
};

// setup create first admin
exports.adminSetup = async (req, res, next) => {
    try {
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            return next(new ErrorResponse("Admin already exists. Setup blocked.", 400));
        }

        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password, role: "admin" });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        next(err);
    }
};

// login admin only
exports.adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        if (user.role !== "admin") {
            return next(new ErrorResponse("Access denied. Admin only.", 403));
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// dashboard stats
exports.getDashboardStats = async (req, res, next) => {
    try {
        const [totalUsers, totalOrders, totalProducts, revenueAgg, recentOrders] =
            await Promise.all([
                User.countDocuments(),
                Order.countDocuments(),
                Product.countDocuments(),
                Order.aggregate([
                    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
                ]),
                Order.find()
                    .sort({ createdAt: -1 })
                    .limit(3)
                    .populate("user", "name"),
            ]);

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalOrders,
                revenue: revenueAgg[0]?.total || 0,
                totalProducts,
            },
            recentOrders,
        });
    } catch (err) {
        next(err);
    }
};

// users crud
exports.getAllUsers = async (req, res, next) => {
    try {
        const { search } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        const users = await User.find(filter).sort({ createdAt: -1 });

        res.status(200).json({ success: true, users });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }

        res.status(200).json({ success: true, message: "User deleted" });
    } catch (err) {
        next(err);
    }
};

// orders
exports.getAllOrders = async (req, res, next) => {
    try {
        const { search, status } = req.query;
        const filter = {};

        if (status && status !== "all") {
            filter.status = status;
        }

        let orders = await Order.find(filter)
            .sort({ createdAt: -1 })
            .populate("user", "name email");

        if (search) {
            const q = search.toLowerCase();
            orders = orders.filter(
                (o) =>
                    o._id.toString().toLowerCase().includes(q) ||
                    o.user?.name?.toLowerCase().includes(q) ||
                    o.shippingAddress?.city?.toLowerCase().includes(q)
            );
        }

        res.status(200).json({ success: true, orders });
    } catch (err) {
        next(err);
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return next(new ErrorResponse("Order not found", 404));
        }

        res.status(200).json({ success: true, order });
    } catch (err) {
        next(err);
    }
};

exports.updatePaymentStatus = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { paymentStatus: req.body.paymentStatus },
            { new: true, runValidators: true }
        );

        if (!order) {
            return next(new ErrorResponse("Order not found", 404));
        }

        res.status(200).json({ success: true, order });
    } catch (err) {
        next(err);
    }
};

// product image upload
exports.uploadProductImage = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return next(new ErrorResponse("Please upload at least one image", 400));
        }

        const urls = req.files.map(
            (f) => `/uploads/${f.filename}`
        );

        res.status(200).json({ success: true, urls });
    } catch (err) {
        next(err);
    }
};


exports.getSettings = async (req, res, next) => {
    try {
        const settingsPath = path.join(__dirname, "..", "data", "settings.json");
        let settings = {};
        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
        }

        res.status(200).json({ success: true, settings });
    } catch (err) {
        next(err);
    }
};

// admin profile password
exports.getAdminProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, user });
    } catch (err) {
        next(err);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, user });
    } catch (err) {
        next(err);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id).select("+password");

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return next(new ErrorResponse("Current password is incorrect", 400));
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password updated" });
    } catch (err) {
        next(err);
    }
};

exports.addAdmin = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return next(new ErrorResponse("A user with this email already exists", 400));
        }

        const user = await User.create({ name, email, password, role: "admin" });

        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json({ success: true, user: userObj });
    } catch (err) {
        next(err);
    }
};
