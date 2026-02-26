import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FiHeart } from "react-icons/fi";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
    const { products, wishlist } = useContext(ShopContext);

    const wishlistProducts = products.filter((p) => wishlist.includes(p._id));

    return (
        <div className="page-wrapper py-10 min-h-[70vh]">
            <h1
                className="text-2xl sm:text-3xl font-semibold mb-8 text-black"
            >
                Wishlist
            </h1>

            {wishlistProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <FiHeart className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-base text-gray-500 mb-6">Your wishlist is empty.</p>
                    <Link
                        to="/shop"
                        className="px-8 py-3 bg-black text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:opacity-90 transition"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
                    {wishlistProducts.map((item) => (
                        <ProductCard
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            category={item.category}
                            subCategory={item.subCategory}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
