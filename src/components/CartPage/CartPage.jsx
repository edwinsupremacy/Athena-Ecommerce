import React from "react";
import "./CartPage.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { items, updateQuantity, removeItem, emptyCart } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formatPrice = (num) => `KShs${num.toLocaleString("en-KE", { minimumFractionDigits: 2 })}`;

  return (
    <div className="cart-cntr">
      <div className="cart-breadcrumb">Home <span className="crumb-arrow">›</span> <span className="crumb-current">Shopping Cart</span></div>
      <h1 className="cart-heading">Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-table-section">
          <div className="cart-table-header"><span className="col-product">Product</span><span className="col-price">Price</span><span className="col-qty">Quantity</span><span className="col-subtotal">Subtotal</span></div>
          {items.length === 0 ? <div className="empty-msg">Your cart is empty.</div> : items.map((item) => (
            <div className="cart-row" key={`${item.id}-${item.size}`}>
              <div className="col-product product-cell"><img src={item.imageUrl} alt={item.name} className="cart-item-img" /><div><div className="cart-item-name">{item.name}</div><div className="cart-item-size"><strong>Size:</strong> {item.size}</div></div></div>
              <div className="col-price">{formatPrice(item.price)}</div>
              <div className="col-qty"><div className="cart-qty-selector"><button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.size, -1)}>−</button><span className="cart-qty-value">{item.quantity}</span><button className="cart-qty-btn" disabled={item.quantity >= item.stockAvailable} onClick={() => updateQuantity(item.id, item.size, 1)}>+</button></div></div>
              <div className="col-subtotal subtotal-cell">{formatPrice(item.price * item.quantity)}<button className="remove-btn" onClick={() => removeItem(item.id, item.size)}>×</button></div>
            </div>
          ))}
          <div className="cart-actions"><button className="empty-cart-btn" onClick={emptyCart}>Empty cart</button></div>
        </div>
        <div className="cart-totals-box"><div className="totals-heading">Cart totals</div><div className="totals-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="totals-row totals-total"><span>Total</span><span>{formatPrice(subtotal)}</span></div><Link to="/checkout" className="cart-icon-link"><button className="checkout-btn" disabled={items.length === 0}>Proceed to checkout</button></Link></div>
      </div>
    </div>
  );
};

export default CartPage;
