import React from 'react'

const Price = () => {
  return (
    <div className="ml">
      <h2 className="sidebar-title price-title">Price</h2>

      <label className="sidebar-label-container">
        <input type="radio" name="test2" />
        <span className="checkmark"></span>
        All
      </label>

      <label className="sidebar-label-container">
        <input type="radio" name="test2" />
        <span className="checkmark"></span>
        Ksh 0-500
      </label>
      <label className="sidebar-label-container">
        <input type="radio" name="test2" />
        <span className="checkmark"></span>
        Ksh 500-1000
      </label>
      <label className="sidebar-label-container">
        <input type="radio" name="test2" />
        <span className="checkmark"></span>
        Ksh 1000-1500
      </label>

      <label className="sidebar-label-container">
        <input type="radio" name="test2" />
        <span className="checkmark"></span>
        Ksh 1500-2500
      </label>

      <label className="sidebar-label-container">
        <input type="radio" name="test2" />
        <span className="checkmark"></span>
        Over Ksh 2500
      </label>
    </div>
  );
}

export default Price