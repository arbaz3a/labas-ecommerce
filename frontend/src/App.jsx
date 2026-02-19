import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import ProfileLayout from "./layout/ProfileLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderConfirmation from "./pages/OrderConfirmation";
import Settings from "./pages/Settings";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/profile" || location.pathname === "/orders" || location.pathname === "/settings";
  return (
    <div className="md:px-21 sm:px-16 px-11 py-3">
      {!hideLayout && <Navbar />}

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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/orders" element={<ProfileLayout><Orders /></ProfileLayout>}/>
        <Route path="/profile" element={<ProfileLayout><Profile /></ProfileLayout>}/>
        <Route path="/settings" element={<ProfileLayout><Settings /></ProfileLayout>}/>
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
