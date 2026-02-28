const Product = require("../models/Product");
const ErrorResponse = require("../utils/ErrorResponse");

/* desc get all products with optional filters route get api products access public */
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

/* desc get single product route get api products id access public */
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

/* desc create product route post api products access private admin */
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

/* desc update product route put api products id access private admin */
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

/* desc delete product route delete api products id access private admin */
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
