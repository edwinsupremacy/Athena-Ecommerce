import React, { useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import white_search_icon from "../../assets/search-w.png";
import logo from "../../assets/logo.png";
import { BaggageClaim, Phone } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CALL_NUMBER = "+254 700 000 000";

const Navbar = ({ fixed }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const activeCategory = new URLSearchParams(location.search).get("category");
  const isHome = location.pathname === "/" && !activeCategory;

  const navLinks = [
    { label: "Home", to: "/", isActive: isHome },
    { label: "Men", to: "/?category=Men", isActive: activeCategory === "Men" },
    { label: "Women", to: "/?category=Women", isActive: activeCategory === "Women" },
    { label: "Children", to: "/?category=Kids", isActive: activeCategory === "Kids" },
  ];

  const searchProducts = (event) => {
    event.preventDefault();
    navigate(search.trim() ? `/?search=${encodeURIComponent(search.trim())}` : "/");
  };

  return (
    <div className={`navbar ${fixed ? "navbar-fixed" : ""}`}>
      <img src={logo} alt="Athena" className="logo" />
      <ul>
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className={`nav-link ${link.isActive ? "active" : ""}`}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <a href={`tel:${CALL_NUMBER.replace(/\s+/g, "")}`} className="call-us">
        <Phone size={15} />
        <span>{CALL_NUMBER}</span>
      </a>
      <form className="search-box" onSubmit={searchProducts}>
        <input type="text" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
        <button type="submit" aria-label="Search products"><img src={white_search_icon} alt="" /></button>
      </form>
      <div className="toggle-icon">
        <Link to="/cart" className="cart-icon-link">
          <BaggageClaim />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;