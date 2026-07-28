import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import white_search_icon from "../../assets/search-w.png";
import logo from "../../assets/logo.png";
import { BaggageClaim } from "lucide-react";
import { useCart } from "../../context/CartContext";

const Navbar = ({ fixed }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const searchProducts = (event) => {
    event.preventDefault();
    navigate(search.trim() ? `/?search=${encodeURIComponent(search.trim())}` : "/");
  };

  return (
    <div className={`navbar ${fixed ? "navbar-fixed" : ""}`}>
      <img src={logo} alt="" className="logo" />
      <ul>
        <li>
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/?category=Men" className="nav-link">
            Men
          </NavLink>
        </li>
        <li>
          <NavLink to="/?category=Women" className="nav-link">
            Women
          </NavLink>
        </li>
        <li>
          <NavLink to="/?category=Kids" className="nav-link">
            Children
          </NavLink>
        </li>

      </ul>
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
