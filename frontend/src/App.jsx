import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Shop from "./pages/Shop.jsx";
import Contact from "./pages/Contact.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext.jsx";

// Admin imports
import { AdminProvider } from "./context/AdminContext.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminSetup from "./pages/admin/AdminSetup.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminSettings from "./pages/admin/AdminSettings.jsx";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/signin" />;
  return children;
};

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const hideLayout =
    isAdminRoute ||
    ["/signin", "/signup", "/forgot-password"].includes(location.pathname) ||
    location.pathname.startsWith("/reset-password");

  return (
    <div>
      {!hideLayout && <Navbar />}
      <ToastContainer
        position="top-center"
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
        {/* ─── Store Routes ─── */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/shop/:category/:subcategory" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/product/:productID" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
          path="/profile"
          element={<PrivateRoute><Profile /></PrivateRoute>}
        />
        <Route
          path="/orders"
          element={<PrivateRoute><Orders /></PrivateRoute>}
        />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />

        {/* ─── Admin Routes ─── */}
        <Route
          path="/admin/*"
          element={
            <AdminProvider>
              <Routes>
                <Route path="login" element={<AdminLogin />} />
                <Route path="setup" element={<AdminSetup />} />
                <Route element={<AdminLayout />}>
                  <Route index element={<Navigate to="dashboard" />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Routes>
            </AdminProvider>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
