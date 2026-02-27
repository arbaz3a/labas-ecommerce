const Order = require("../models/Order");
const Product = require("../models/Product");
const ErrorResponse = require("../utils/ErrorResponse");

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private
 */
exports.createOrder = async (req, res, next) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return next(new ErrorResponse("No order items provided", 400));
        }

        if (!shippingAddress) {
            return next(new ErrorResponse("Shipping address is required", 400));
        }

        if (!paymentMethod) {
            return next(new ErrorResponse("Payment method is required", 400));
        }

        // Build order items with product snapshots
        const orderItems = [];
        let totalPrice = 0;

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return next(
                    new ErrorResponse(`Product not found: ${item.productId}`, 404)
                );
            }

            const itemTotal = product.price * item.quantity;
            totalPrice += itemTotal;

            orderItems.push({
                product: product._id,
                name: product.name,
                image: product.image[0],
                size: item.size,
                quantity: item.quantity,
                price: product.price,
            });
        }

        // Add delivery fee
        totalPrice += 199;

        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
        });

        res.status(201).json({
            success: true,
            order,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/orders
 * @access  Private
 */
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get single order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
exports.getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorResponse("Order not found", 404));
        }

        // Ensure the order belongs to the requesting user
        if (order.user.toString() !== req.user.id) {
            return next(new ErrorResponse("Not authorized to view this order", 403));
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (err) {
        next(err);
    }
};
