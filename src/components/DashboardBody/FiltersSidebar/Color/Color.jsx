import React from 'react'
import "./Color.css"

const Color = () => {
  return (
    <div>
      <div className="color-title">Color</div>
      <label className="sidebar-label-container color-title">
        <input type="radio" name="test3" />
        <span className="checkmark"></span>
        All
      </label>

      <label className="sidebar-label-container">
        <input type="radio" name="test3" />
        <span className="checkmark"></span>
        White
      </label>
      <label className="sidebar-label-container">
        <input type="radio" name="test3" />
        <span className="checkmark"></span>
        Black
      </label>
      <label className="sidebar-label-container">
        <input type="radio" name="test3" />
        <span className="checkmark"></span>
        Brown
      </label>

      <label className="sidebar-label-container">
        <input type="radio" name="test3" />
        <span className="checkmark"></span>
        Grey
      </label>
    </div>
  );
}

export default Color