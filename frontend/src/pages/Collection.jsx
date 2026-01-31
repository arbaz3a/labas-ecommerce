import React, { useContext, useState, useEffect } from "react";
import { shopcontext } from "../context/shopcontext";
import Title from "../components/Title";
import Productitems from "../components/Productitems";

function Collection() {
  const { products } = useContext(shopcontext);

  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState(products || []);

  useEffect(() => {
    const filtered = (products || [])
      .filter(
        (item) =>
          (category === "All" || item.category === category) &&
          (type === "All" || item.subCategory === type)
      )
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "name") return a.name.localeCompare(b.name);
        return 0;
      });

    setFilteredProducts(filtered);
  }, [category, type, sort, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* header page name*/}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          <Title text1={"Our"} text2={"Collection"} />
        </h1>

        {/* sort portion */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg bg-white w-full md:w-auto"
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {/* layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* filter left portion */}
        <aside className="md:col-span-3 lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 h-fit">
          <h2 className="text-lg font-semibold mb-6">Filters</h2>

          {/* category */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2">
              {["All", "Men", "Women", "Kids"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* type */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Type</h3>
            <div className="space-y-2">
              {[
                "All",
                "Topwear",
                "Bottomwear",
                "Bags",
                "Watches",
                "Accessories",
                "Shoes",
              ].map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={type === t}
                    onChange={() => setType(t)}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setCategory("All");
              setType("All");
              setSort("default");
            }}
            className="text-sm text-gray-500 underline cursor-pointer hover:text-black"
          >
            Clear Filters
          </button>
        </aside>

        {/* product portion */}
        <section className="md:col-span-9 lg:col-span-10">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-2xl p-4 bg-white hover:shadow-xl transition"
                >
                  <Productitems
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    category={item.category}
                    subCategory={item.subCategory}
                  />

                  <button className="cursor-pointer mt-4 w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Collection;
