import React, { useEffect, useRef, useState } from "react";
import Inventory from "./Inventory/Inventory";  
import Filtersidebar from "./FiltersSidebar/Filtersidebar";
import { SlidersHorizontal, X } from "lucide-react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import "./DashboardBody.css";

const EMPTY_FILTERS = { shoeType: "", color: "", minPrice: "", maxPrice: "" };

const DashboardBody = () => {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const sheetRef = useRef(null);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  useEffect(() => {
    if (!filtersOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setFiltersOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filtersOpen]);

  useFocusTrap(sheetRef, filtersOpen);

  return (
    <div className="dashboardbody-container">
      <button
        type="button"
        className="mobile-filter-trigger"
        onClick={() => setFiltersOpen(true)}
      >
        <SlidersHorizontal size={17} />
        Filters
        {activeFilterCount > 0 && <span className="filter-count-badge">{activeFilterCount}</span>}
      </button>

      <div
        className={`filter-backdrop ${filtersOpen ? "open" : ""}`}
        onClick={() => setFiltersOpen(false)}
        aria-hidden="true"
      />

      <div className={`filter-container ${filtersOpen ? "open" : ""}`} ref={sheetRef} tabIndex={-1}>
        <div className="filter-sheet-header">
          <h2>Filters</h2>
          <button
            type="button"
            className="filter-close"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <Filtersidebar filters={filters} onChange={setFilters} />
        <div className="filter-sheet-footer">
          <button type="button" className="filter-clear" onClick={() => setFilters(EMPTY_FILTERS)}>
            Clear all
          </button>
          <button type="button" className="filter-apply" onClick={() => setFiltersOpen(false)}>
            Show results
          </button>
        </div>
      </div>

      <div className="inventory-container">
        <Inventory filters={filters} />
      </div>
    </div>
  );
};

export default DashboardBody;   

