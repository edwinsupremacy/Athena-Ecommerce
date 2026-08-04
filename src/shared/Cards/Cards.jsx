import React from 'react'
import { useNavigate } from "react-router-dom";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import './Cards.css'


const Cards = ({ item }) => {
  const navigate = useNavigate();
  const { items, addItem } = useCart();

  const inStock = item.sizes.some((size) => size.stockAvailable > 0);
  const alreadyInCart = items.some((cartItem) => cartItem.id === item.id);

  const handleBagClick = (event) => {
    event.stopPropagation();
    if (alreadyInCart) {
      navigate("/cart");
      return;
    }
    if (!inStock) return;
    const defaultSize = item.sizes.find((size) => size.stockAvailable > 0)?.size;
    addItem(item, defaultSize, 1);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <section className="card-container">
      <section className="card" onClick={() => navigate(`/product/${item.id}`)}>
        <img src={item.imageUrl} alt={item.name} className='card-img'/>
        <div className="card-details">
          <h3 className="card-title">{item.name}</h3>
        </div>
        <section className="card-price">
          <div className="current-price">Ksh {Number(item.price).toLocaleString("en-KE")}</div>
          <button
            type="button"
            className="bag"
            onClick={handleBagClick}
            aria-label={alreadyInCart ? "Already in cart, view cart" : inStock ? "Add to cart" : "Out of stock"}
            disabled={!inStock && !alreadyInCart}
          >
            {alreadyInCart ? <CheckCircle /> : <ShoppingCart />}
          </button>
        </section>
      </section>
    </section>
  );
};

export default Cards