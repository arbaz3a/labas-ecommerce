import React from "react";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const sizeCharts = {
  Shirts: {
    title: "Clothing Size Guide",
    headers: ["SIZE", "CHEST (IN)", "LENGTH (IN)", "SHOULDER (IN)"],
    rows: [
      ["S", "36–38", "27", "17"],
      ["M", "38–40", "28", "17.5"],
      ["L", "40–42", "29", "18"],
      ["XL", "42–44", "30", "18.5"],
      ["XXL", "44–46", "31", "19"],
    ],
    note: "Measure around the fullest part of your chest. Lay a well-fitting shirt flat and compare.",
  },
  "T-Shirts": {
    title: "T-Shirt Size Guide",
    headers: ["SIZE", "CHEST (IN)", "LENGTH (IN)", "SLEEVE (IN)"],
    rows: [
      ["S", "36–38", "26", "8"],
      ["M", "38–40", "27", "8.5"],
      ["L", "40–42", "28", "9"],
      ["XL", "42–44", "29", "9.5"],
      ["XXL", "44–46", "30", "10"],
    ],
    note: "Measure around the fullest part of your chest while standing straight.",
  },
  Polo: {
    title: "Polo Size Guide",
    headers: ["SIZE", "CHEST (IN)", "LENGTH (IN)", "SLEEVE (IN)"],
    rows: [
      ["S", "36–38", "26", "8.5"],
      ["M", "38–40", "27", "9"],
      ["L", "40–42", "28", "9.5"],
      ["XL", "42–44", "29", "10"],
    ],
    note: "Measure around the fullest part of your chest while standing straight.",
  },
  Bottoms: {
    title: "Bottoms Size Guide",
    headers: ["SIZE", "WAIST (IN)", "HIP (IN)", "INSEAM (IN)"],
    rows: [
      ["28", "28", "36", "30"],
      ["30", "30", "38", "30"],
      ["32", "32", "40", "31"],
      ["34", "34", "42", "31"],
      ["36", "36", "44", "32"],
    ],
    note: "Measure your natural waist at the narrowest point.",
  },

  "Hoodies & Sweatshirts": {
    title: "Hoodie Size Guide",
    headers: ["SIZE", "CHEST (IN)", "LENGTH (IN)", "SLEEVE (IN)"],
    rows: [
      ["S", "38–40", "26", "24"],
      ["M", "40–42", "27", "25"],
      ["L", "42–44", "28", "26"],
      ["XL", "44–46", "29", "27"],
    ],
    note: "Hoodies are designed for a relaxed fit.",
  },
  "Jacket & Coats": {
    title: "Jacket Size Guide",
    headers: ["SIZE", "CHEST (IN)", "LENGTH (IN)", "SHOULDER (IN)"],
    rows: [
      ["S", "38–40", "26", "17.5"],
      ["M", "40–42", "27", "18"],
      ["L", "42–44", "28", "18.5"],
      ["XL", "44–46", "29", "19"],
    ],
    note: "Jacket measurements are for the outer shell. Layer accordingly.",
  },
  "Sweaters & Cardigans": {
    title: "Sweater Size Guide",
    headers: ["SIZE", "CHEST (IN)", "LENGTH (IN)", "SLEEVE (IN)"],
    rows: [
      ["S", "38–40", "26", "24"],
      ["M", "40–42", "27", "25"],
      ["L", "42–44", "28", "26"],
      ["XL", "44–46", "29", "27"],
    ],
    note: "Designed for a comfortable, relaxed fit.",
  },

  "Top & Blouses": {
    title: "Tops Size Guide",
    headers: ["SIZE", "BUST (IN)", "LENGTH (IN)", "SHOULDER (IN)"],
    rows: [
      ["XS", "32", "23", "14"],
      ["S", "34", "24", "14.5"],
      ["M", "36", "25", "15"],
      ["L", "38", "26", "15.5"],
      ["XL", "40", "27", "16"],
    ],
    note: "Measure around the fullest part of your bust.",
  },

  Boots: {
    title: "Shoe Size Guide",
    headers: ["SIZE", "UK", "US", "EU", "FOOT LENGTH (CM)"],
    rows: [
      ["6", "6", "7", "39", "24.5"],
      ["7", "7", "8", "40", "25.4"],
      ["8", "8", "9", "41", "26.2"],
      ["9", "9", "10", "42", "27.1"],
      ["10", "10", "11", "43", "27.9"],
      ["11", "11", "12", "44", "28.8"],
    ],
    note: "Stand on a sheet of paper and trace around your foot. Measure the length from heel to the longest toe in centimeters and compare with the chart above.",
  },
  Heels: {
    title: "Heel Size Guide",
    headers: ["SIZE", "UK", "US", "EU", "FOOT LENGTH (CM)"],
    rows: [
      ["3", "3", "5", "36", "22.5"],
      ["4", "4", "6", "37", "23.5"],
      ["5", "5", "7", "38", "24.5"],
      ["6", "6", "8", "39", "25.0"],
      ["7", "7", "9", "40", "25.5"],
      ["8", "8", "10", "41", "26.5"],
    ],
    note: "Stand on a sheet of paper and trace around your foot. Measure the length from heel to the longest toe in centimeters.",
  },
  "Men's Watches": {
    title: "Watch Size Guide",
    headers: ["WRIST SIZE (IN)", "CASE DIAMETER (MM)", "RECOMMENDED FIT"],
    rows: [
      ["6–6.5", "38–40", "Small"],
      ["6.5–7", "40–42", "Medium"],
      ["7–7.5", "42–44", "Standard"],
      ["7.5–8", "44–46", "Large"],
      ["8+", "46+", "Oversized"],
    ],
    note: "Wrap a measuring tape around your wrist just below the wrist bone. Or use a strip of paper and measure its length.",
  },
};
["Loafers", "Sneakers", "Sandals", "Slides"].forEach((cat) => {
  sizeCharts[cat] = { ...sizeCharts.Boots, title: "Shoe Size Guide" };
});
["Blazers"].forEach((cat) => {
  sizeCharts[cat] = { ...sizeCharts["Jacket & Coats"] };
});

export function getSizeChart(category, subCategory) {
  if (sizeCharts[subCategory]) return sizeCharts[subCategory];
  if (category === "Shoes") return sizeCharts.Boots;
  if (category === "Watches") return sizeCharts["Men's Watches"];
  if (category === "Men") return sizeCharts.Shirts;
  if (category === "Women") return sizeCharts["Top & Blouses"];
  return null;
}

export default function SizeChart({ isOpen, onClose, category, subCategory }) {
  const chart = getSizeChart(category, subCategory);

  if (!chart) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2
                  className="text-lg font-semibold text-black"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {chart.title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-black transition cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 py-5">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      {chart.headers.map((h) => (
                        <th
                          key={h}
                          className="text-[11px] font-semibold tracking-wider uppercase text-gray-500 pb-3 pr-4"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chart.rows.map((row, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={`py-3 pr-4 text-sm ${j === 0 ? "font-semibold text-black" : "text-gray-600"}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {chart.note && (
                <div className="px-6 pb-6">
                  <h3 className="text-xs font-bold tracking-wider uppercase mb-2 text-black">
                    How to Measure
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {chart.note}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
