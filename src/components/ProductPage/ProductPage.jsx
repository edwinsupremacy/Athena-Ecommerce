import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductPage.css";
import Buttons from "../../shared/Buttons/Buttons";
import { getItem } from "../../api/catalog";
import { useCart } from "../../context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    getItem(id)
      .then((product) => {
        setItem(product);
        setSelectedSize(product.sizes.find((size) => size.stockAvailable > 0)?.size ?? null);
      })
      .catch((requestError) => setError(requestError.response?.data || "Unable to load this product."));
  }, [id]);

  if (error) return <div className="cntr">{error}</div>;
  if (!item) return <div className="cntr">Loading product...</div>;

  const inStock = item.sizes.some((size) => size.stockAvailable > 0);
  const selectedStock = item.sizes.find((size) => size.size === selectedSize)?.stockAvailable ?? 0;
  const addToCart = () => {
    if (selectedSize) addItem(item, selectedSize, quantity);
  };

  return (
    <div className="cntr">
      <div className="title">Home</div>
      <div className="product-page-container">
        <div className="small-images">
          <img src={item.imageUrl} alt={item.name} className="image" />
          <img src={item.imageUrl} alt={item.name} className="image" />
          <img src={item.imageUrl} alt={item.name} className="image" />
        </div>

        <div className="main-image">
          <img src={item.imageUrl} alt={item.name} className="image" />
        </div>

        <div className="description-box">
          <div className="shoe-title">{item.name}</div>
          <div className="description-story">Choose your preferred available size before adding this item to your cart.</div>
          <div className="price">Ksh {Number(item.price).toLocaleString("en-KE")}</div>
          <div className="instock">{inStock ? "instock" : "out of stock"}</div>

          <div className="others">
            <div className="size-toggles">
              <p>sizes:</p>
              <Buttons sizes={item.sizes} selectedSize={selectedSize} onSelectSize={(size) => {
                setSelectedSize(size);
                setQuantity((current) => Math.min(current, item.sizes.find((itemSize) => itemSize.size === size)?.stockAvailable ?? 1));
              }} />
            </div>
            <div className="pay-buttons">
              <div className="quantity-selector">
                <button className="qty-btn" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>−</button>
                <span className="qty-value">{quantity}</span>
                <button className="qty-btn" disabled={quantity >= selectedStock} onClick={() => setQuantity((current) => current + 1)}>+</button>
              </div>
              <button className="add-cart-btn" disabled={!selectedSize} onClick={addToCart}>+ Add to cart</button>
              <button className="buy-now-btn" disabled={!selectedSize} onClick={() => { addToCart(); navigate("/cart"); }}>Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
