import React from "react";

function Filters({ category, setCategory, type, setType, setSort }) {
  const categories = ["All", "Men", "Women", "Kids"];
  const types = [
    "All",
    "Topwear",
    "Bottomwear",
    "Winterwear",
    "Bags",
    "Watches",
    "Accessories",
    "Shoes",
  ];

  return (
    <aside className="md:col-span-3 lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 h-fit">
      <h2 className="text-lg font-semibold mb-6">Filters</h2>

      {/* category Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
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

      {/* type Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Type</h3>
        <div className="space-y-2">
          {types.map((t) => (
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

      {/* clear filters */}
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
  );
}

export default Filters;
