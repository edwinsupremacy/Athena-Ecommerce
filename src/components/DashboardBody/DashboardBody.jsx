import React, { useState } from "react";
import Inventory from "./Inventory/Inventory";
import Filtersidebar from "./FiltersSidebar/Filtersidebar";
import "./DashboardBody.css";

const DashboardBody = () => {
  const [filters, setFilters] = useState({ shoeType: "", color: "", minPrice: "", maxPrice: "" });

  return (
    <div className="dashboardbody-container">
      <div className="filter-container">
        <Filtersidebar filters={filters} onChange={setFilters} />
      </div>

      <div className="inventory-container">
        
        <Inventory filters={filters} />
      </div>
    </div>
  );
};

export default DashboardBody;
