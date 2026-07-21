import React from 'react'
import "./CategoryTypes.css"
const CategoryTypes = ({ label}) => {
  return (
    <div>
      
      <label className="sidebar-label-container">
        <input type="radio" name="test" />
        <span className="checkmark"></span>
        {label}
      </label>
    </div>
  );
};

export default CategoryTypes