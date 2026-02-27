import React, { useEffect, useState, useRef } from "react";
import adminApi from "../../utils/adminApi";
import api from "../../utils/api";
import { Search, Plus, Pencil, Trash2, Upload, Link, X } from "lucide-react";
import { toast } from "react-toastify";

const CATEGORIES = ["Men", "Women", "Watches", "Shoes", "Fragrances"];

const SUBCATEGORIES = {
  Men: [
    "Shirts",
    "T-Shirts",
    "Polo",
    "Bottoms",
    "Blazers",
    "Jacket & Coats",
    "Hoodies & Sweatshirts",
    "Sweaters & Cardigans",
  ],
  Women: [
    "Top & Blouses",
    "T-Shirts",
    "Bottoms",
    "Sweaters & Cardigans",
    "Jacket & Coats",
  ],
  Watches: ["Classic", "Sport"],
  Shoes: ["Boots", "Loafers", "Sneakers", "Sandals", "Heels", "Slides"],
  Fragrances: ["Perfumes", "Candles"],
};

const emptyProduct = {
  _id: "",
  productId: "",
  name: "",
  description: "",
  price: 0,
  stock: 100,
  category: "Men",
  subCategory: "",
  sizes: "",
  careInstructions: "",
  image: [],
  bestseller: false,
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = new, object = editing
  const [form, setForm] = useState({ ...emptyProduct });
  const [imageTab, setImageTab] = useState("upload"); // "upload" | "url"
  const [imageUrls, setImageUrls] = useState("");
  const [previews, setPreviews] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const fileRef = useRef();

  const fetchProducts = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (catFilter !== "All") params.category = catFilter;
      const { data } = await api.get("/products", { params });
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, catFilter]);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyProduct });
    setPreviews([]);
    setImageUrls("");
    setUploadFiles([]);
    setImageTab("upload");
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      ...product,
      sizes: Array.isArray(product.sizes)
        ? product.sizes.join(", ")
        : product.sizes || "",
      careInstructions: Array.isArray(product.careInstructions)
        ? product.careInstructions.join(", ")
        : product.careInstructions || "",
    });
    setPreviews(product.image || []);
    setImageUrls((product.image || []).join("\n"));
    setUploadFiles([]);
    setImageTab("url");
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removePreview = (idx) => {
    const targetPreview = previews[idx];
    const isNewUpload =
      targetPreview.startsWith("blob:") || targetPreview.startsWith("data:");

    setPreviews((prev) => prev.filter((_, i) => i !== idx));

    if (isNewUpload) {
      const oldImagesCount = previews.filter(
        (p) => !p.startsWith("blob:") && !p.startsWith("data:"),
      ).length;
      const uploadIdx = idx - oldImagesCount;
      setUploadFiles((prev) => prev.filter((_, i) => i !== uploadIdx));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageList = [];

      // Handle image uploads
      if (imageTab === "upload") {
        let uploadedUrls = [];
        if (uploadFiles.length > 0) {
          const formData = new FormData();
          uploadFiles.forEach((file) => formData.append("images", file));

          const { data: uploadRes } = await adminApi.post(
            "/upload/product",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            },
          );
          uploadedUrls = uploadRes.urls;
        }
        const oldUrlsToKeep = previews.filter(
          (p) => !p.startsWith("blob:") && !p.startsWith("data:"),
        );
        imageList = [...oldUrlsToKeep, ...uploadedUrls];
      } else if (imageTab === "url") {
        imageList = imageUrls
          .split("\n")
          .map((u) => u.trim())
          .filter(Boolean);
      }

      const body = {
        productId: form.productId,
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        subCategory: form.subCategory,
        sizes: form.sizes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        careInstructions: form.careInstructions
          ? form.careInstructions
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        image: imageList,
        bestseller: form.bestseller,
      };

      if (editing) {
        await api.put(`/products/${editing._id}`, body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("labas_admin_token")}`,
          },
        });
      } else {
        await api.post("/products", body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("labas_admin_token")}`,
          },
        });
      }

      setModalOpen(false);
      fetchProducts();
      toast.success(editing ? "Product updated." : "Product created.");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("labas_admin_token")}`,
        },
      });
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted.");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Products</h1>
        <div className="admin-header-actions">
          <div className="admin-search">
            <Search size={16} />
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="admin-filter-select"
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
          >
            <option value="All">All</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            className="admin-btn admin-btn-primary admin-add-btn"
            onClick={openAdd}
          >
            <Plus size={16} /> <span className="admin-btn-text">ADD</span>
          </button>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", color: "#999", padding: 32 }}
                >
                  No products found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id}>
                  <td>
                    {p.image?.[0] ? (
                      <img
                        src={
                          p.image[0].startsWith("http")
                            ? p.image[0]
                            : `http://localhost:5000${p.image[0]}`
                        }
                        alt={p.name}
                        className="admin-product-thumb"
                      />
                    ) : (
                      <div
                        className="admin-product-thumb"
                        style={{
                          background: "#F0F0F0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#999",
                          fontSize: 10,
                        }}
                      >
                        N/A
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td>{p.category}</td>
                  <td>Rs {p.price?.toLocaleString()}</td>
                  <td style={{ color: "#16A34A", fontWeight: 600 }}>
                    {p.stock}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button
                        className="admin-btn-icon"
                        onClick={() => openEdit(p)}
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="admin-btn-danger"
                        onClick={() => handleDelete(p._id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="admin-card-list">
        {products.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
            No products found
          </p>
        ) : (
          products.map((p) => (
            <div className="admin-mobile-card" key={p._id}>
              <div className="admin-mobile-card-header">
                <div style={{ display: "flex", gap: 14, flex: 1 }}>
                  {p.image?.[0] ? (
                    <img
                      src={
                        p.image[0].startsWith("http")
                          ? p.image[0]
                          : `http://localhost:5000${p.image[0]}`
                      }
                      alt={p.name}
                      className="admin-product-thumb-mobile"
                    />
                  ) : (
                    <div
                      className="admin-product-thumb-mobile"
                      style={{
                        background: "#F5F5F5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#999",
                        fontSize: 10,
                      }}
                    >
                      N/A
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div
                      className="admin-mobile-card-title"
                      style={{ fontSize: 16, marginBottom: 2 }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {p.category}
                    </div>
                  </div>
                </div>
                <div
                  className="admin-mobile-card-actions"
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <button
                    className="admin-btn-icon"
                    onClick={() => openEdit(p)}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    className="admin-btn-icon-danger"
                    onClick={() => handleDelete(p._id)}
                    style={{ color: "#E55B5B" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="admin-mobile-card-body">
                <div className="admin-mobile-card-info">
                  <label>Price:</label>
                  Rs {p.price?.toLocaleString()}
                </div>
                <div
                  className="admin-mobile-card-info"
                  style={{ textAlign: "right" }}
                >
                  <label>Stock:</label>
                  <span style={{ color: "#16A34A", fontWeight: 600 }}>
                    {p.stock}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          className="admin-modal-overlay"
          onClick={() => setModalOpen(false)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="admin-modal-close"
              onClick={() => setModalOpen(false)}
            >
              <X size={20} />
            </button>
            <h2 className="admin-modal-title">
              {editing ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit}>
              {editing && (
                <div className="admin-form-group" style={{ marginBottom: 16 }}>
                  <label className="admin-form-label">
                    Database ID (Auto-generated)
                  </label>
                  <input
                    className="admin-form-input"
                    value={form._id}
                    style={{ backgroundColor: "#f5f5f5", color: "#888" }}
                    disabled
                  />
                </div>
              )}

              {/* Product ID + Category row */}
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Product ID</label>
                  <input
                    className="admin-form-input"
                    placeholder="e.g. MFW25SK011"
                    value={form.productId || ""}
                    onChange={(e) =>
                      setForm({ ...form, productId: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Category</label>
                  <select
                    className="admin-form-input"
                    value={form.category}
                    onChange={(e) => {
                      const newCategory = e.target.value;
                      setForm({
                        ...form,
                        category: newCategory,
                        subCategory: SUBCATEGORIES[newCategory]?.[0] || "",
                      });
                    }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Name */}
              <div className="admin-form-group">
                <label className="admin-form-label">Name</label>
                <input
                  className="admin-form-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              {/* Description */}
              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <textarea
                  className="admin-form-textarea"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                />
              </div>

              {/* Price / Stock */}
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Price (Rs)</label>
                  <input
                    className="admin-form-input"
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    min={0}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Stock</label>
                  <input
                    className="admin-form-input"
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                    min={0}
                  />
                </div>
              </div>

              {/* Sub-Category */}
              <div className="admin-form-group">
                <label className="admin-form-label">Sub-Category</label>
                <select
                  className="admin-form-input"
                  value={form.subCategory}
                  onChange={(e) =>
                    setForm({ ...form, subCategory: e.target.value })
                  }
                >
                  {SUBCATEGORIES[form.category]?.map((sc) => (
                    <option key={sc} value={sc}>
                      {sc}
                    </option>
                  ))}
                  {!SUBCATEGORIES[form.category]?.length && (
                    <option value="">No subcategories</option>
                  )}
                </select>
              </div>

              {/* Sizes */}
              <div className="admin-form-group">
                <label className="admin-form-label">
                  Sizes (comma-separated)
                </label>
                <input
                  className="admin-form-input"
                  placeholder={
                    form.category === "Shoes"
                      ? "40, 41, 42, 43, 44"
                      : form.category === "Watches"
                        ? "One Size"
                        : form.category === "Fragrances"
                          ? "50ml, 100ml"
                          : "S, M, L, XL"
                  }
                  value={form.sizes}
                  onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                />
              </div>

              {/* Care Instructions */}
              <div className="admin-form-group">
                <label className="admin-form-label">
                  Care Instructions (comma-separated)
                </label>
                <input
                  className="admin-form-input"
                  placeholder="e.g. Hand wash only, Do not bleach"
                  value={form.careInstructions}
                  onChange={(e) =>
                    setForm({ ...form, careInstructions: e.target.value })
                  }
                />
              </div>

              {/* Images */}
              <div className="admin-form-group">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <label className="admin-form-label" style={{ margin: 0 }}>
                    Product Images
                  </label>
                  <div className="admin-image-tabs">
                    <button
                      type="button"
                      className={`admin-image-tab ${imageTab === "upload" ? "active" : ""}`}
                      onClick={() => setImageTab("upload")}
                    >
                      <Upload size={14} /> Upload
                    </button>
                    <button
                      type="button"
                      className={`admin-image-tab ${imageTab === "url" ? "active" : ""}`}
                      onClick={() => setImageTab("url")}
                    >
                      <Link size={14} /> URL
                    </button>
                  </div>
                </div>

                {imageTab === "upload" ? (
                  <>
                    <div
                      className="admin-upload-zone"
                      onClick={() => fileRef.current?.click()}
                    >
                      <Upload />
                      <p>Click to upload images</p>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    {previews.length > 0 && (
                      <div className="admin-image-preview">
                        {previews.map((src, i) => {
                          const imgSrc =
                            src.startsWith("http") ||
                            src.startsWith("data:") ||
                            src.startsWith("blob:")
                              ? src
                              : `http://localhost:5000${src}`;
                          return (
                            <div className="admin-image-thumb" key={i}>
                              <img src={imgSrc} alt="" />
                              <button
                                type="button"
                                onClick={() => removePreview(i)}
                              >
                                ×
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <textarea
                    className="admin-form-textarea"
                    placeholder="https://... (one URL per line)"
                    value={imageUrls}
                    onChange={(e) => setImageUrls(e.target.value)}
                    rows={3}
                  />
                )}
              </div>

              {/* Bestseller */}
              <div className="admin-checkbox-wrap">
                <input
                  type="checkbox"
                  id="bestseller"
                  checked={form.bestseller}
                  onChange={(e) =>
                    setForm({ ...form, bestseller: e.target.checked })
                  }
                />
                <label htmlFor="bestseller">Bestseller</label>
              </div>

              <button
                type="submit"
                className="admin-form-submit"
                disabled={saving}
              >
                {saving
                  ? "SAVING..."
                  : editing
                    ? "UPDATE PRODUCT"
                    : "CREATE PRODUCT"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
