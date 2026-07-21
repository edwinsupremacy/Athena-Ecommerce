import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import white_search_icon from "../../assets/search-w.png";
import black_search_icon from "../../assets/search-b.png";
import light_mode_icon from "../../assets/day.png";
import dark_mode_icon from "../../assets/night.png";
import logo from "../../assets/logo.png";
import { BaggageClaim, User } from "lucide-react";

const Navbar = ({ fixed }) => {
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
            <NavLink to="/inventory/men" className="nav-link">
              Men
            </NavLink>
          </li>
          <li>
            <NavLink to="/inventory/women" className="nav-link">
              Women
            </NavLink>
          </li>
          <li>
            <NavLink to="/inventory/children" className="nav-link">
              Children
            </NavLink>
          </li>
        
      </ul>
      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img src={white_search_icon} alt="" />
      </div>
      <div className="toggle-icon">
        <User />
        <Link to="/cart" className="cart-icon-link">
          <BaggageClaim />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
