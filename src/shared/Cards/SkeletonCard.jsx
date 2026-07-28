import React from "react";
import "./Cards.css";
import "./SkeletonCard.css";

const SkeletonCard = () => (
  <section className="card-container">
    <section className="card skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="card-details">
        <div className="skeleton skeleton-title" />
      </div>
      <section className="card-price">
        <div className="skeleton skeleton-price" />
        <div className="skeleton skeleton-bag" />
      </section>
    </section>
  </section>
);

export default SkeletonCard;