import React from 'react'
import { useNavigate } from "react-router-dom";
import image0 from "../../assets/slideshowimages/image2.jpeg";
import { ShoppingCart } from "lucide-react";
import './Cards.css'



const Cards = ({ id }) => {
  const navigate = useNavigate();

  return (
    <>
      <section className="card-container">
        <section className="card">
          <img src={image0} alt="" className='card-img'/>
          <div className="card-details">
            <h3 className="card-title">Shoe</h3>
          </div>
          <section className="card-price">
            <div className="current-price">Ksh 2000</div>
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