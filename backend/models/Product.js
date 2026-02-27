const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a product name"],
        trim: true,
        maxlength: [200, "Name cannot exceed 200 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide a product description"],
        maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    productId: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"],
        min: [0, "Price cannot be negative"],
    },
    image: {
        type: [String],
        required: [true, "Please provide at least one image"],
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
        trim: true,
    },
    subCategory: {
        type: String,
        required: [true, "Please provide a sub-category"],
        trim: true,
    },
    sizes: {
        type: [String],
        default: [],
    },
    careInstructions: {
        type: [String],
        default: [],
    },
    bestseller: {
        type: Boolean,
        default: false,
    },
    stock: {
        type: Number,
        default: 100,
        min: [0, "Stock cannot be negative"],
    },
    date: {
        type: Number,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", ProductSchema);
