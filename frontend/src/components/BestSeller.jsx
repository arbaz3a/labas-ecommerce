import React, { useContext, useEffect, useState } from "react";
import { shopcontext } from "../context/shopcontext";
import Title from "./Title";
import Productitems from "./Productitems";

function BestSeller() {
  const { products } = useContext(shopcontext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter(item => item.bestseller === true);
    setBestSeller(bestProducts.slice(0, 10));
  }, [products]);

  return (
    <div className="my-16 px-4 sm:px-8 bg-gray-50 py-12 rounded-2xl">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
          Our most loved products, chosen by customers for quality, comfort,
          and timeless style.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {bestSeller.map((item, index) => (
          <Productitems
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
