import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Placeorder from "./pages/Placeorder";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartCheckout from "./pages/CartCheckout"
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="md:px-21 sm:px-16 px-11 py-3">
      <Navbar />

      {/* toastify toaster */}
      <ToastContainer
        position="top-left"
        autoClose={1800}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable={false}
        newestOnTop
        limit={1}
        transition={Slide}
        toastClassName="custom-toast"
        className="toast-container"
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart-checkout" element={<CartCheckout/>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<Placeorder />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
