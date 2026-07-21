import React, { useState } from "react";
import "./Checkout.css";
import   mpesa  from "../../assets/svg/m-pesa.svg";

const orderItems = [
  { id: 1, name: "Women Brogues, Green", size: 39, price: 1999, quantity: 5 },
];

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [agreed, setAgreed] = useState(false);

  const formatPrice = (num) =>
    `KShs${num.toLocaleString("en-KE", { minimumFractionDigits: 2 })}`;

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const surcharge = 0;
  const total = subtotal + surcharge;

  return (
    <div className="checkout-cntr">
      <h1 className="checkout-heading">Checkout</h1>


      <div className="checkout-layout">
        <div className="billing-section">
          <h2 className="section-heading">Billing details</h2>

          <div className="form-row">
            <div className="form-group">
              <label>
                First name<span className="required">*</span>
              </label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>
                Last name<span className="required">*</span>
              </label>
              <input type="text" />
            </div>
          </div>

          <div className="form-group">
            <label>
              Country / Region<span className="required">*</span>
            </label>
            <select defaultValue="Kenya">
              <option>Kenya</option>
              <option>Uganda</option>
              <option>Tanzania</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Street address<span className="required">*</span>
            </label>
            <input type="text" placeholder="House number and street name" />
            <input
              type="text"
              placeholder="Apartment, suite, unit, etc. (optional)"
              className="mt-8"
            />
          </div>

          <div className="form-group">
            <label>
              Town / City<span className="required">*</span>
            </label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>
              State / County<span className="required">*</span>
            </label>
            <select defaultValue="Nairobi County">
              <option>Nairobi County</option>
              <option>Mombasa County</option>
              <option>Kisumu County</option>
            </select>
          </div>

          {/* <div className="form-group">
            <label>
              Postcode / ZIP<span className="required">*</span>
            </label>
            <input type="text" />
          </div> */}

          <div className="form-group">
            <label>Phone</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>
              Email address(optional)<span className="required">*</span>
            </label>
            <input type="email" />
          </div>

          <div className="form-group">
            <label>
              Select Delivery location<span className="required">*</span>
            </label>
            <input type="text" />
          </div>
        </div>

        <div className="order-section">
          <h2 className="section-heading">Your order</h2>

          <div className="order-box">
            <div className="order-row order-header">
              <span>Product</span>
              <span>Subtotal</span>
            </div>

            {orderItems.map((item) => (
              <div className="order-row" key={`${item.id}-${item.size}`}>
                <span>
                  {item.name} × {item.quantity}
                  <br />
                  <span className="order-size">Size: {item.size}</span>
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}

            <div className="order-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="order-row">
              <span>Surcharge Fee</span>
              <span>{formatPrice(surcharge)}</span>
            </div>

            <div className="order-row order-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <div className="payment-method">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "mpesa"}
                  onChange={() => setPaymentMethod("mpesa")}
                />
                M-Pesa, Airtel Money &amp; Card Payments
              </label>
              <div className="payment-icons">
                <img src={mpesa} alt="" />
              </div>
              <p className="payment-note">
                Pay securely via M-Pesa .
              </p>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "person"}
                  onChange={() => setPaymentMethod("person")}
                />
                Pay in Person
              </label>
            </div>

            <p className="privacy-note">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our{" "}
              <span className="policy-link">privacy policy</span>.
            </p>

            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I have read and agree to the website{" "}
              <span className="policy-link">terms and conditions</span> *
            </label>

            <button className="place-order-btn" disabled={!agreed}>
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
