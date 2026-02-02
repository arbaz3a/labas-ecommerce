import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

function ProductFullscreen({
  isFullscreen,
  setIsFullscreen,
  mainImage,
  productdata,
  prevImage,
  nextImage,
  handleFSTouchStart,
  handleFSTouchEnd,
}) {
  if (!isFullscreen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-3xl z-50 flex flex-col items-center justify-center"
      onTouchStart={handleFSTouchStart}
      onTouchEnd={handleFSTouchEnd}
    >
      <img
        src={mainImage}
        alt={productdata.name}
        className="max-h-[85vh] max-w-full rounded-xl object-contain"
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-10 text-white">
        <button
          onClick={prevImage}
          className="p-3 cursor-pointer bg-black/40 rounded-full"
        >
          <FiChevronLeft size={28} />
        </button>

        <button
          onClick={() => setIsFullscreen(false)}
          className="cursor-pointer p-3 bg-black/40 rounded-full"
        >
          <FiX size={28} />
        </button>

        <button
          onClick={nextImage}
          className="cursor-pointer p-3 bg-black/40 rounded-full"
        >
          <FiChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}

export default ProductFullscreen;
