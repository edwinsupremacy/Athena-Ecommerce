import React from "react";
import "./Color.css";

const colors = [
  { label: "All", value: "" },
  { label: "White", value: "White" },
  { label: "Black", value: "Black" },
  { label: "Brown", value: "Brown" },
  { label: "Grey", value: "Gray" },
];

const Color = ({ value, onChange }) => (
  <div>
    <div className="color-title">Color</div>
    {colors.map((color) => (
      <label className={`sidebar-label-container ${color.label === "All" ? "color-title" : ""}`} key={color.label}>
        <input type="radio" name="color" value={color.value} checked={value === color.value} onChange={(event) => onChange(event.target.value)} />
        <span className="checkmark"></span>{color.label}
      </label>
    ))}
  </div>
);

export default Color;
