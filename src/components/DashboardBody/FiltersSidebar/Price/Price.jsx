import React from "react";
import './Price.css'

const priceRanges = [
  { label: "All", value: "-" },
  { label: "Ksh 0-500", value: "0-500" },
  { label: "Ksh 500-1000", value: "500-1000" },
  { label: "Ksh 1000-1500", value: "1000-1500" },
  { label: "Ksh 1500-2500", value: "1500-2500" },
  { label: "Over Ksh 2500", value: "2500-" },
];

const Price = ({ value, onChange }) => (
  <div className="ml">
    <h2 className="sidebar-title price-title">Price</h2>
    {priceRanges.map((range) => (
      <label className="sidebar-label-container" key={range.value}>
        <input type="radio" name="price" value={range.value} checked={value === range.value} onChange={(event) => onChange(event.target.value)} />
        <span className="checkmark"></span>{range.label}
      </label>
    ))}
  </div>
);

export default Price;
