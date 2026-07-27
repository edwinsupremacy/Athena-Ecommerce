import React from "react";
import "./Button.css";

const Buttons = ({ sizes, selectedSize, onSelectSize }) => {

  return (
    <div className="size-box-row">
      {sizes.map(({ size, stockAvailable }) => (
        <button
          key={size}
          className={`size-box ${selectedSize === size ? "active" : ""}`}
          disabled={stockAvailable < 1}
          onClick={() => onSelectSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
