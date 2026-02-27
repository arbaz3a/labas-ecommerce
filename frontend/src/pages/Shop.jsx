import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import { FiChevronDown, FiCheck } from "react-icons/fi";

const SORT_OPTIONS = [
  { label: "Relevant", value: "relevant" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" },
];

function Shop() {
  const { products, search } = useContext(ShopContext);
  const { category: urlCategory, subcategory: urlSubcategory } = useParams();
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [sortBy, setSortBy] = useState("relevant");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (urlCategory) {
      const cat = capitalize(urlCategory);
      setCategory(cat);
      if (urlSubcategory) {
        const subName = urlSubcategory
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        setType(subName);
      } else {
        setType("All");
      }
    } else {
      setCategory("All");
      setType("All");
    }
  }, [urlCategory, urlSubcategory]);

  useEffect(() => {
    const activeSearch = search || urlSearch;
    let filtered = (products || []).filter(
      (item) =>
        (category === "All" || item.category === category) &&
        (type === "All" || item.subCategory === type) &&
        (activeSearch.trim() === "" ||
          item.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
          item.category.toLowerCase().includes(activeSearch.toLowerCase()) ||
          item.subCategory.toLowerCase().includes(activeSearch.toLowerCase()) ||
          item.description
            ?.toLowerCase()
            .includes(activeSearch.toLowerCase()) ||
          item.productId?.toLowerCase().includes(activeSearch.toLowerCase())),
    );
    switch (sortBy) {
      case "price-asc":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [category, type, products, search, urlSearch, sortBy]);

  const pageTitle =
    category === "All" ? "All Products" : type !== "All" ? type : category;
  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label || "Relevant";

  return (
    <div className="page-wrapper py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-black">
          {pageTitle}
        </h1>
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="sort-dropdown-trigger"
          >
            <span className="sort-dropdown-label">{currentSortLabel}</span>
            <FiChevronDown
              className={`sort-dropdown-chevron ${sortOpen ? "sort-dropdown-chevron-open" : ""}`}
            />
          </button>

          {sortOpen && (
            <div className="sort-dropdown-menu">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setSortOpen(false);
                  }}
                  className={`sort-dropdown-option ${sortBy === option.value ? "sort-dropdown-option-active" : ""}`}
                >
                  <span className="sort-dropdown-check">
                    {sortBy === option.value && (
                      <FiCheck className="w-3.5 h-3.5" />
                    )}
                  </span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item._id}
              id={item._id}
              productId={item.productId}
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

export default Shop;
