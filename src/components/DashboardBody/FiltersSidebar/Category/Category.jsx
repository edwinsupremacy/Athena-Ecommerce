import React from 'react'
import CategoryTypes from './CategoryTypes/CategoryTypes'
import "./Category.css"

const Category = () => {
  return (
    <div>
      <div className='sidebar-title'>Category</div>
      <CategoryTypes label="All" name="category" value="all" />
      <CategoryTypes label="Sneakers" name="category" value="men" />
      <CategoryTypes label="Flats" name="category" value="women" />
      <CategoryTypes label="Sandles" name="category" value="children" />
      <CategoryTypes label="Heels" name="category" value="shoes" />
    
    </div>
  );
}

export default Category