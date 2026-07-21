import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/dashboard/dashboard";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/CartPage/CartPage";
import Checkout from "./components/Checkout/Checkout";


const App = () => {
  const dashboardBodyRef = useRef(null);
  const [showNavbar, setShowNavbar] = useState(false);

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
    <BrowserRouter>
      <div className="container">
        <Navbar fixed={showNavbar} />
        <Routes>
          <Route
            path="/"
            element={<Dashboard dashboardBodyRef={dashboardBodyRef} />}
          />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>{" "}
      </div>
    </BrowserRouter>
  );
};

export default App;
