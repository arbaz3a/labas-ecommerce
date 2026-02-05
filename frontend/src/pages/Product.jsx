import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { shopcontext } from "../context/shopcontext";
import ProductFullscreen from "../components/ProductFullscreen";
import ProductInfoDetails from "../components/ProductInfoDetails";
import ProductImageGallery from "../components/ProductImageGallery";
import RelatedProducts from "../components/RelatedProducts";

function Product() {
  const { productID } = useParams();
  const { products, currency } = useContext(shopcontext);

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

  // swipe handlers for main image mobile version + fullscreen (mobile & touch devices)
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
        {/* left images + display image + dots image representation */}
        <ProductImageGallery
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

        {/* after zoom fullscreen section*/}
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

        {/* right product info details section*/}
        <ProductInfoDetails
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

export default Product;
