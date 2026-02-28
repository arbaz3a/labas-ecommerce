const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const ErrorResponse = require("../utils/ErrorResponse");

/* desc get current user s wishlist route get api wishlist access private */
exports.getWishlist = async (req, res, next) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
            "products",
            "name price image category subCategory"
        );

        if (!wishlist) {
            wishlist = { products: [] };
        }

        res.status(200).json({
            success: true,
            products: wishlist.products,
        });
    } catch (err) {
        next(err);
    }
};

/* desc add product to wishlist route post api wishlist access private */
exports.addToWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return next(new ErrorResponse("Product ID is required", 400));
        }

        const product = await Product.findById(productId);
        if (!product) {
            return next(new ErrorResponse("Product not found", 404));
        }

        let wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: req.user.id,
                products: [productId],
            });
        } else {
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId);
                await wishlist.save();
            }
        }

        res.status(200).json({
            success: true,
            products: wishlist.products,
        });
    } catch (err) {
        next(err);
    }
};

/* desc remove product from wishlist route delete api wishlist productid access private */
exports.removeFromWishlist = async (req, res, next) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            return next(new ErrorResponse("Wishlist not found", 404));
        }

        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== req.params.productId
        );
        await wishlist.save();

        res.status(200).json({
            success: true,
            products: wishlist.products,
        });
    } catch (err) {
        next(err);
    }
};
