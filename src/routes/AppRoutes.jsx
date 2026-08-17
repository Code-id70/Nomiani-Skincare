import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PaymentMethod from "../pages/PaymentMethod";
import Payment from "../pages/Payment";
import OrderConfirmation from "../pages/OrderConfirmation";

import AdminOrders from "../pages/admin/AdminOrders";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminCustomers from "../pages/admin/AdminCustomers";
import AdminAnalytics from "../pages/admin/AdminAnalytics";
import AdminSettings from "../pages/admin/AdminSettings";


// Admin
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            CUSTOMER WEBSITE
        ========================== */}

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route
          path="/product/:slug"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/payment-method" element={<PaymentMethod />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        {/* =========================
            ADMIN
        ========================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />

        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />

        <Route
          path="/admin/customers"
          element={<AdminCustomers />}
        />

        <Route
          path="/admin/analytics"
          element={<AdminAnalytics />}
        />

        <Route
          path="/admin/settings"
          element={<AdminSettings />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;