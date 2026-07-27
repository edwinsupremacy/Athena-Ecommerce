import React from 'react'
import CategoryTypes from './CategoryTypes/CategoryTypes'
import "./Category.css"

const Category = ({ value, onChange }) => {
  return (
    <div>
      <div className='sidebar-title'>Category</div>
      <CategoryTypes label="All" name="category" value="" checked={value === ""} onChange={onChange} />
      <CategoryTypes label="Sneakers" name="category" value="Sneakers" checked={value === "Sneakers"} onChange={onChange} />
      <CategoryTypes label="Flats" name="category" value="Flats" checked={value === "Flats"} onChange={onChange} />
      <CategoryTypes label="Sandles" name="category" value="Sandals" checked={value === "Sandals"} onChange={onChange} />
      <CategoryTypes label="Heels" name="category" value="Heels" checked={value === "Heels"} onChange={onChange} />
    
    </div>
  );
}

export default Category
