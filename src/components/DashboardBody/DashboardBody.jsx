import React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import Inventory from "./Inventory/Inventory";
import Filtersidebar from "./FiltersSidebar/Filtersidebar";
import "./DashboardBody.css";

const DashboardBody = () => {

  return (
    <div className="dashboardbody-container">
      <div className="filter-container">
        <Filtersidebar />
      </div>

      <div className="inventory-container">
        
        <Inventory />
      </div>
    </div>
  );
};

export default DashboardBody;
