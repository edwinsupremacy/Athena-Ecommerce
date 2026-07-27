import React from 'react'
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import './Cards.css'



const Cards = ({ item }) => {
  const navigate = useNavigate();

  return (
    <>
      <section className="card-container">
        <section className="card" onClick={() => navigate(`/product/${item.id}`)}>
          <img src={item.imageUrl} alt={item.name} className='card-img'/>
          <div className="card-details">
            <h3 className="card-title">{item.name}</h3>
          </div>
          <section className="card-price">
            <div className="current-price">Ksh {Number(item.price).toLocaleString("en-KE")}</div>
            <div className="bag">
              <ShoppingCart />
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export default Cards
