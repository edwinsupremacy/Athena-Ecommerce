import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Cards from "../../../shared/Cards/Cards";
import SkeletonCard from "../../../shared/Cards/SkeletonCard";
import { PackageSearch, TriangleAlert } from "lucide-react";
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
      <div className="inventory-header">
        <p className="inventory-eyebrow">Shop All</p>
        <h1>Inventory</h1>
        <p className="inventory-count">{isLoading ? "Loading…" : `${items.length} products`}</p>
      </div>
      <div className="inventory-pager">
        <div className="inventory-cards">
          {isLoading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <SkeletonCard key={i} />)
            : error
              ? (
                <div className="inventory-state inventory-state--error">
                  <TriangleAlert />
                  <h2>Couldn't load the inventory</h2>
                  <p>{error}</p>
                </div>
              )
              : items.length === 0
                ? (
                  <div className="inventory-state">
                    <PackageSearch />
                    <h2>No products match your filters</h2>
                    <p>Try clearing a filter or searching a different category.</p>
                  </div>
                )
                : items.map((item) => <Cards key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Inventory;


// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import Cards from "../../../shared/Cards/Cards";
// import SkeletonCard from "../../../shared/Cards/SkeletonCard";   // ← add this
// import { getItems } from "../../../api/catalog";
// import "./Inventory.css";

// const SKELETON_COUNT = 8;

// const Inventory = ({ filters }) => {
//   const [searchParams] = useSearchParams();
//   const [items, setItems] = useState([]);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const category = searchParams.get("category");
//   const search = searchParams.get("search");

//   useEffect(() => {
//     let isCurrent = true;
//     setError("");
//     setIsLoading(true);

//     getItems({ category, search, ...filters })
//       .then((result) => isCurrent && setItems(result))
//       .catch((requestError) => {
//         if (!isCurrent) return;
//         setItems([]);
//         if (requestError.response?.status !== 404) setError(requestError.response?.data || "Unable to load products.");
//       })
//       .finally(() => isCurrent && setIsLoading(false));

//     return () => { isCurrent = false; };
//   }, [category, search, filters]);

//   return (
//     <div className="inventory">
//       <h1>Inventory</h1>
//       <div className="inventory-pager">
//         <div className="inventory-cards">
//           {isLoading
//             ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <SkeletonCard key={i} />)
//             : error
//             ? <p>{error}</p>
//             : items.length === 0
//             ? <p>No products match your filters.</p>
//             : items.map((item) => <Cards key={item.id} item={item} />)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inventory;