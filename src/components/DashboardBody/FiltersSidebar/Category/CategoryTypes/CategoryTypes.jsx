import React from 'react'
import "./CategoryTypes.css"
const CategoryTypes = ({ label, name, value, checked, onChange }) => {
  return (
    <div>
      
      <label className="sidebar-label-container">
        <input type="radio" name={name} value={value} checked={checked} onChange={(event) => onChange(event.target.value)} />
        <span className="checkmark"></span>
        {label}
      </label>
    </div>
  );
};

export default CategoryTypes
