import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import white_search_icon from "../../assets/search-w.png";
import logo from "../../assets/logo.png";
import { BaggageClaim, Menu, Phone, Search, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFocusTrap } from "../../hooks/useFocusTrap";

const CALL_NUMBER = "+254 700 000 000";

const Navbar = ({ fixed }) => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const drawerRef = useRef(null);
  const searchOverlayRef = useRef(null);
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

  useEffect(() => {
    setMenuOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!mobileSearchOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMobileSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileSearchOpen]);

  useFocusTrap(drawerRef, menuOpen);
  useFocusTrap(searchOverlayRef, mobileSearchOpen);

  const searchProducts = (event) => {
    event.preventDefault();
    navigate(search.trim() ? `/?search=${encodeURIComponent(search.trim())}` : "/");
  };

  return (
    <div className={`navbar ${fixed ? "navbar-fixed" : ""}`}>
      <button
        type="button"
        className="menu-toggle"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <Link to="/" className="logo-link" aria-label="Athena home">
        <img src={logo} alt="Athena" className="logo" />
      </Link>

      <ul className="nav-links">
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
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit" aria-label="Search products">
          <img src={white_search_icon} alt="" />
        </button>
      </form>

      <button
        type="button"
        className="search-toggle"
        aria-label="Search products"
        onClick={() => setMobileSearchOpen(true)}
      >
        <Search size={22} />
      </button>

      <div className="toggle-icon">
        <Link to="/cart" className="cart-icon-link" aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}>
          <BaggageClaim />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>

      {mobileSearchOpen && (
        <div
          className="mobile-search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          ref={searchOverlayRef}
          tabIndex={-1}
        >
          <form className="mobile-search-form" onSubmit={searchProducts}>
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit" aria-label="Search">
              <Search size={20} />
            </button>
          </form>
          <button
            type="button"
            className="mobile-search-cancel"
            onClick={() => setMobileSearchOpen(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <div
        className={`nav-backdrop ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <nav
        className={`mobile-drawer ${menuOpen ? "open" : ""}`}
        aria-label="Main menu"
        ref={drawerRef}
        tabIndex={-1}
      >
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className={link.isActive ? "active" : ""}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a href={`tel:${CALL_NUMBER.replace(/\s+/g, "")}`} className="mobile-call-us">
          <Phone size={16} />
          <span>{CALL_NUMBER}</span>
        </a>
      </nav>
    </div>
  );
};

export default Navbar;