const Product = require("../models/Product");
const ErrorResponse = require("../utils/ErrorResponse");

/**
 * @desc    Get all products (with optional filters)
 * @route   GET /api/products
 * @access  Public
 */
exports.getAllProducts = async (req, res, next) => {
    try {
        const { category, subCategory, search, bestseller } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (subCategory) filter.subCategory = subCategory;
        if (bestseller === "true") filter.bestseller = true;

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { subCategory: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { productId: { $regex: search, $options: "i" } },
            ];
        }

        const products = await Product.find(filter).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorResponse("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Create product
 * @route   POST /api/products
 * @access  Private/Admin
 */
exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return next(new ErrorResponse("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return next(new ErrorResponse("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Product deleted",
        });
    } catch (err) {
        next(err);
    }
};
