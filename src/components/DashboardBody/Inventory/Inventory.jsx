import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Cards from "../../../shared/Cards/Cards";
import { getItems } from "../../../api/catalog";
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

const Inventory = ({ filters }) => {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  useEffect(() => {
    let isCurrent = true;
    setError("");
    setIsLoading(true);

    getItems({ category, search, ...filters })
      .then((result) => isCurrent && setItems(result))
      .catch((requestError) => {
        if (!isCurrent) return;
        setItems([]);
        if (requestError.response?.status !== 404) setError(requestError.response?.data || "Unable to load products.");
      })
      .finally(() => isCurrent && setIsLoading(false));

    return () => { isCurrent = false; };
  }, [category, search, filters]);
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
          {isLoading ? <p>Loading products...</p> : error ? <p>{error}</p> : items.length === 0 ? <p>No products match your filters.</p> : items.map((item) => <Cards key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
