import React, { useContext, useEffect, useState } from "react";
import { shopcontext } from "../context/shopcontext";
import Title from "./Title";
import Productitems from "./Productitems";

function LatestCollection() {
  const { products } = useContext(shopcontext);
  const [latestproduct, setlatestproducts] = useState([]);

  useEffect(() => {
    setlatestproducts(products.slice(0, 15));
  }, [products]);

  return (
    <div className="my-14 px-4 sm:px-8">
      <div className="text-center mb-10">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
          Discover our newest arrivals, crafted with premium quality and modern
          elegance for your everyday style.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {latestproduct.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-3 bg-white hover:shadow-xl transition"
          >
            <Productitems
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              category={item.category}
              subCategory={item.subCategory}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
