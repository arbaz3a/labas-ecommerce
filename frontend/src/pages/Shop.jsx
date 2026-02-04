import React, { useContext, useState, useEffect } from "react";
import { shopcontext } from "../context/shopcontext";
import Title from "../components/Title";
import Productitems from "../components/Productitems";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

function Shop() {
  const { products, search } = useContext(shopcontext);

  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const filtered = (products || [])
      .filter(
        (item) =>
          (category === "All" || item.category === category) &&
          (type === "All" || item.subCategory === type) &&
          (search.trim() === "" ||
            item.name.toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "name") return a.name.localeCompare(b.name);
        return 0;
      });

    setFilteredProducts(filtered);
  }, [category, type, sort, products, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* header shop page */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          <Title text1={"Our"} text2={"Collection"} />
        </h1>

        {/* search component */}
        <SearchBar />

        {/* sort by */}
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-600">Sort By</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg bg-white outline-none"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      {/* layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* mobile filter toggle button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-100 px-4 py-2 rounded-lg"
          >
            Filter
          </button>
        </div>

        {/* filters component */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } md:block md:col-span-3 lg:col-span-2`}
        >
          <Filters
            category={category}
            setCategory={setCategory}
            type={type}
            setType={setType}
            setSort={setSort}
          />
        </div>

        {/* products rendering */}
        <section className="md:col-span-9 lg:col-span-10">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-2xl p-3 bg-white hover:shadow-xl transition"
                >
                  <Productitems
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    category={item.category}
                    subCategory={item.subCategory}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Shop;
