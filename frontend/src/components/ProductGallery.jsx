import React from "react";
import { FiChevronUp, FiChevronDown, FiZoomIn } from "react-icons/fi";
import { getImageUrl } from "../utils/imageUtils";

function ProductGallery({
  productdata,
  mainImage,
  imageIndex,
  setMainImage,
  setImageIndex,
  prevImage,
  nextImage,
  handleTouchStart,
  handleTouchEnd,
  setIsFullscreen,
}) {
  return (
    <>
      <div className="hidden md:flex flex-col items-center gap-2">
        <button onClick={prevImage} className="cursor-pointer my-1">
          <FiChevronUp size={22} />
        </button>

        {productdata.image.map((img, idx) => (
          <img
            key={idx}
            src={getImageUrl(img)}
            alt={productdata.name}
            className={`w-20 h-20 object-cover cursor-pointer border ${mainImage === img
                ? "border-black"
                : "border-transparent hover:border-gray-300"
              }`}
            onClick={() => {
              setMainImage(getImageUrl(img));
              setImageIndex(idx);
            }}
          />
        ))}

        <button onClick={nextImage} className="cursor-pointer my-1">
          <FiChevronDown size={22} />
        </button>
      </div>
      <div className="w-full md:flex-1 flex justify-center items-center">
        <div className="relative max-w-120 w-full">
          <img
            src={getImageUrl(mainImage)}
            alt={productdata.name}
            className="w-full max-h-130 object-contain rounded-xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer"
          >
            <FiZoomIn size={22} />
          </button>
        </div>
      </div>
      <div className="md:hidden flex justify-center mx-auto my-2 gap-2">
        {productdata.image.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${idx === imageIndex ? "bg-black" : "bg-gray-300"
              }`}
          />
        ))}
      </div>
    </>
  );
}

export default ProductGallery;
