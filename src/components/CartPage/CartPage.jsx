import React, { useState } from "react";
import image3 from "../../assets/slideshowimages/image2.jpeg";
import "./CartPage.css";
import { Link } from "react-router-dom";

const initialItems = [
  {
    id: 1,
    name: "Women Brogues, Green",
    size: 39,
    price: 1999,
    quantity: 1,
    image: image3,
  },
  {
    id: 2,
    name: "Women Brogues, Green",
    size: 39,
    price: 1999,
    quantity: 1,
    image: image3,
  },
  {
    id: 3,
    name: "Women Brogues, Green",
    size: 39,
    price: 1999,
    quantity: 1,
    image: image3,
  },
  {
    id: 4,
    name: "Women Brogues, Green",
    size: 39,
    price: 1999,
    quantity: 1,
    image: image3,
  },
];

const CartPage = () => {
  const [items, setItems] = useState(initialItems);
  const [coupon, setCoupon] = useState("");

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const emptyCart = () => setItems([]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const formatPrice = (num) =>
    `KShs${num.toLocaleString("en-KE", { minimumFractionDigits: 2 })}`;

  return (
    <div className="cart-cntr">
      <div className="cart-breadcrumb">
        Home <span className="crumb-arrow">›</span>{" "}
        <span className="crumb-current">Shopping Cart</span>
      </div>
      <h1 className="cart-heading">Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-table-section">
          <div className="cart-table-header">
            <span className="col-product">Product</span>
            <span className="col-price">Price</span>
            <span className="col-qty">Quantity</span>
            <span className="col-subtotal">Subtotal</span>
          </div>

          {items.length === 0 ? (
            <div className="empty-msg">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <div className="cart-row" key={item.id}>
                <div className="col-product product-cell">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div>
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-size">
                      <strong>Size:</strong> {item.size}
                    </div>
                  </div>
                </div>
                <div className="col-price">{formatPrice(item.price)}</div>
                <div className="col-qty">
                  <div className="cart-qty-selector">
                    <button
                      className="cart-qty-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="cart-qty-value">{item.quantity}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-subtotal subtotal-cell">
                  {formatPrice(item.price * item.quantity)}
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="cart-actions">
            <button className="empty-cart-btn" onClick={emptyCart}>
              Empty cart
            </button>
            {/* <button className="update-cart-btn" disabled>
              Update cart
            </button> */}
          </div>
        </div>

        <div className="cart-totals-box">
          <div className="totals-heading">Cart totals</div>
          <div className="totals-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="totals-row totals-total">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <Link to="/checkout" className="cart-icon-link">
            <button className="checkout-btn" disabled={items.length === 0}>
              Proceed to checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
