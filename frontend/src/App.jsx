import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Shop from "./pages/Shop.jsx";
import Contact from "./pages/Contact.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Product from "./pages/Product.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileLayout from "./layout/ProfileLayout.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import Settings from "./pages/Settings.jsx";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext.jsx";

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/signin" />;
  return children;
};

function App() {
  const location = useLocation();

  // Hide navbar/footer on auth pages AND profile/order/settings pages
  const hideLayout = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/profile",
    "/orders",
    "/settings",
  ].includes(location.pathname);

  return (
    <div className="md:px-21 sm:px-16 px-11 py-3">
      {!hideLayout && <Navbar />}

      {/* Toastify */}
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
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/product/:productID" element={<Product />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileLayout>
                <Profile />
              </ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <ProfileLayout>
                <Orders />
              </ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <ProfileLayout>
                <Settings />
              </ProfileLayout>
            </PrivateRoute>
          }
        />

        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
