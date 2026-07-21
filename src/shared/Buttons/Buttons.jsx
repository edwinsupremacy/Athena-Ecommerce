import React, { useState } from "react";
import "./Button.css";

const sizes = [39, 40, 41, 42, 43, 44, 45];

const Buttons = () => {
  const [selectedSize, setSelectedSize] = useState(43);

  return (
    <div className="size-box-row">
      {sizes.map((size) => (
        <button
          key={size}
          className={`size-box ${selectedSize === size ? "active" : ""}`}
          onClick={() => setSelectedSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
