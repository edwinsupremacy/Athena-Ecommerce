import React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Cards from "../../../shared/Cards/Cards";
import "./Inventory.css";
// const testProducts = [
//   { id: 1 },
//   { id: 2 },
//   { id: 3 },
//   { id: 4 },
//   { id: 5 },
//   { id: 6 },
//   { id: 7 },
//   { id: 8 },
//   { id: 9 },
//   { id: 10 },
// ];

// const CARDS_PER_PAGE = 5;

const Inventory = () => {



  // const [page, setPage] = useState(0);
  // const totalPages = Math.ceil(testProducts.length / CARDS_PER_PAGE);
  // const start = page * CARDS_PER_PAGE;
  // const visibleProducts = testProducts.slice(start, start + CARDS_PER_PAGE);
  // const goNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  // const goPrev = () => setPage((p) => Math.max(p - 1, 0));


  return (
    <div className="hi">
      <h1>Inventory</h1>
      <div className="inventory-pager">
        <div className="inventory-cards">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards  />
          <Cards  />
          <Cards  />
          <Cards  />
          <Cards  />
          <Cards  />
          
        </div>
      </div>
    </div>
  );
};

export default Inventory;
