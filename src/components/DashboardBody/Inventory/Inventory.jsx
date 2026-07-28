import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Cards from "../../../shared/Cards/Cards";
import SkeletonCard from "../../../shared/Cards/SkeletonCard";   // ← add this
import { getItems } from "../../../api/catalog";
import "./Inventory.css";

const SKELETON_COUNT = 8;   

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

  return (
    <div className="inventory">
      <h1>Inventory</h1>
      <div className="inventory-pager">
        <div className="inventory-cards">
          {isLoading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <SkeletonCard key={i} />)
            : error
            ? <p>{error}</p>
            : items.length === 0
            ? <p>No products match your filters.</p>
            : items.map((item) => <Cards key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Inventory;