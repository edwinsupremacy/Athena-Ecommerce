import React from "react";
import "./Loader.css";

const Loader = ({ label = "Loading...", fullPage = false }) => (
  <div className={fullPage ? "loader-fullpage" : "loader-inline"}>
    <div className="spinner" />
    {label && <p className="loader-label">{label}</p>}
  </div>
);

export default Loader;