import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ProductFullscreen from "../components/ProductFullscreen";
import ProductInfo from "../components/ProductInfo";
import ProductGallery from "../components/ProductGallery";
import RelatedProducts from "../components/RelatedProducts";

function ProductDetails() {
  const { productID } = useParams();
  const { products, currency } = useContext(ShopContext);

  const [productdata, setproductdata] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openDesc, setOpenDesc] = useState(false);
  const [openCare, setOpenCare] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fetchproductData = async () => {
    const product = products.find((p) => p._id === productID);
    if (product) {
      setproductdata(product);
      setMainImage(product.image[0]);
      setSelectedSize(product.sizes?.[0] || "");
      setImageIndex(0);
      setQuantity(1);
      setSelectedSize(null);
    }
  };

  useEffect(() => {
    fetchproductData();
  }, [productID, products]);

  if (!productdata) return <div className="p-10">Loading…</div>;

  const prevImage = () => {
    const prev =
      (imageIndex - 1 + productdata.image.length) % productdata.image.length;
    setImageIndex(prev);
    setMainImage(productdata.image[prev]);
  };

  const nextImage = () => {
    const next = (imageIndex + 1) % productdata.image.length;
    setImageIndex(next);
    setMainImage(productdata.image[next]);
  };

  let touchStartX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) nextImage(); // swipe left
    if (touchEndX > touchStartX + 50) prevImage(); // swipe right
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-8 md:gap-10 items-start">
        <ProductGallery
          productdata={productdata}
          mainImage={mainImage}
          imageIndex={imageIndex}
          setMainImage={setMainImage}
          setImageIndex={setImageIndex}
          prevImage={prevImage}
          nextImage={nextImage}
          handleTouchStart={handleTouchStart}
          handleTouchEnd={handleTouchEnd}
          setIsFullscreen={setIsFullscreen}
        />
        <ProductFullscreen
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
          mainImage={mainImage}
          productdata={productdata}
          prevImage={prevImage}
          nextImage={nextImage}
          handleTouchStart={handleTouchStart}
          handleTouchEnd={handleTouchEnd}
        />
        <ProductInfo
          productdata={productdata}
          currency={currency}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
          openDesc={openDesc}
          setOpenDesc={setOpenDesc}
          openCare={openCare}
          setOpenCare={setOpenCare}
        />
      </div>
      <RelatedProducts currentProduct={productdata} />
    </>
  );
}

export default ProductDetails;
