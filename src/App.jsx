import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/dashboard/dashboard";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/CartPage/CartPage";
import Checkout from "./components/Checkout/Checkout";
import { CartProvider } from "./context/CartContext";
import NotFound from "./shared/Pages/NotFound";


const AppRoutes = () => {
  const dashboardBodyRef = useRef(null);
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowNavbar(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (!dashboardBodyRef.current) return;

      const rect = dashboardBodyRef.current.getBoundingClientRect();
      setShowNavbar(rect.top <= 200);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container">
      <Navbar fixed={showNavbar} />
      <Routes>
        <Route
          path="/"
          element={<Dashboard dashboardBodyRef={dashboardBodyRef} />}
        />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <CartProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </CartProvider>
);

export default App;