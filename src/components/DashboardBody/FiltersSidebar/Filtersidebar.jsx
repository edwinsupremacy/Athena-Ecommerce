import React from "react";
import './Filtersidebar.css'
import Category from "./Category/Category";
import Price from "./Price/Price";
import Color from "./Color/Color";

const Filtersidebar = ({ filters, onChange }) => {
  const updateFilter = (name, value) => onChange((current) => ({ ...current, [name]: value }));

  return (
    <div className="filtersidebar">
      <Category value={filters.shoeType} onChange={(value) => updateFilter("shoeType", value)} />
      <Price value={`${filters.minPrice}-${filters.maxPrice}`} onChange={(range) => {
        const [minPrice, maxPrice] = range.split("-");
        onChange((current) => ({ ...current, minPrice, maxPrice }));
      }} />
      <Color value={filters.color} onChange={(value) => updateFilter("color", value)} />
    </div>
  );
};

export default Filtersidebar;
