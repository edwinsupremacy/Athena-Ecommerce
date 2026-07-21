import React from "react";
import { useParams } from "react-router-dom";
import image3 from "../../assets/slideshowimages/image2.jpeg";
import "./ProductPage.css";
import Buttons from "../../shared/Buttons/Buttons";

const ProductPage = () => {
  // const { id } = useParams();
  return (
    <div className="cntr">
      <div className="title">Home</div>
      <div className="product-page-container">
        <div className="small-images">
          <img src={image3} alt="" className="image" />
          <img src={image3} alt="" className="image" />
          <img src={image3} alt="" className="image" />
        </div>

        <div className="main-image">
          <img src={image3} alt="" className="image" />
        </div>

        <div className="description-box">
          <div className="shoe-title">Adidas shoes</div>
          <div className="description-story">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
            vel maiores aliquam nemo, rerum delectus, ducimus mollitia sit
            quisquam incidunt dolor. Ipsa ab quo quidem optio, unde pariatur
            velit consequatur.
          </div>
          <div className="price">Ksh 4,000</div>

          <div className="instock">instock</div>

          <div className="others">
            <div className="size-toggles">
              <p>sizes:</p>
              <Buttons />
            </div>
            <div className="pay-buttons">
              <div className="quantity-selector">
                <button className="qty-btn">−</button>
                <span className="qty-value">1</span>
                <button className="qty-btn">+</button>
              </div>
              <button className="add-cart-btn">+ Add to cart</button>
              <button className="buy-now-btn">Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
