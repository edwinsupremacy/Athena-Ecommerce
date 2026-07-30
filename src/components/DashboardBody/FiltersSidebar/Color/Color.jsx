import React from "react";
import "./Color.css";

const colors = [
  { label: "All", value: "", swatch: "conic-gradient(from 180deg, #fff 0deg 90deg, #1a1a1a 90deg 180deg, #6b4226 180deg 270deg, #9b9b9b 270deg 360deg)" },
  { label: "White", value: "White", swatch: "#ffffff" },
  { label: "Black", value: "Black", swatch: "#1a1a1a" },
  { label: "Brown", value: "Brown", swatch: "#6b4226" },
  { label: "Grey", value: "Gray", swatch: "#9b9b9b" },
];

const Color = ({ value, onChange }) => (
  <div>
    <div className="color-title">Color</div>
    {colors.map((color) => (
      <label className="sidebar-label-container swatch-label" key={color.label}>
        <input
          type="radio"
          name="color"
          value={color.value}
          checked={value === color.value}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className="swatch" style={{ background: color.swatch }} />
        {color.label}
      </label>
    ))}
  </div>
);

export default Color;