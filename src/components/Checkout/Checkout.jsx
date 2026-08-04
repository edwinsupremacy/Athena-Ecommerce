import React, { useState, useEffect } from "react";
import "./Checkout.css";
import mpesa from "../../assets/svg/m-pesa.svg";
import { checkout, getOrderStatus } from "../../api/catalog";
import { useCart } from "../../context/CartContext";
import Loader from "../../shared/Loader/Loader";
import toast from "react-hot-toast";

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 60000;

const Checkout = () => {
  const { items, emptyCart } = useCart();
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ firstName: "", secondName: "", phoneNumber: "", email: "", country: "Kenya", streetAddress: "", apartment: "", city: "", county: "Nairobi County", deliveryLocation: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderRef, setOrderRef] = useState(null);
  const [receiptNumber, setReceiptNumber] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // null | "pending" | "paid" | "failed" | "timeout"

  const formatPrice = (num) => `KShs${num.toLocaleString("en-KE", { minimumFractionDigits: 2 })}`;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const surcharge = 0;
  const total = subtotal + surcharge;

  const updateForm = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const placeOrder = async () => {
    setError("");
    if (items.length === 0) return setError("Your cart is empty.");
    if (!form.firstName || !form.secondName || !form.phoneNumber || !form.email || !form.streetAddress || !form.city || !form.deliveryLocation) {
      return setError("Please complete all required delivery details.");
    }

    setSubmitting(true);
    try {
      const result = await checkout({
        firstName: form.firstName,
        secondName: form.secondName,
        phoneNumber: form.phoneNumber,
        email: form.email,
        deliveryLocation: [form.deliveryLocation, form.streetAddress, form.apartment, form.city, form.county, form.country].filter(Boolean).join(", "),
        modeOfCollection: 0,
        items: items.map((item) => ({ itemId: item.id, size: item.size, quantity: item.quantity })),
      });
      
      setOrderRef(result.orderReference);
      setPaymentStatus("pending");
      toast.success(`Order ${result.orderReference} created — check your phone`);
    } catch (requestError) {
      const message = requestError.response?.data || "Unable to place your order. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Polls order status once an order has been created and we're waiting on M-Pesa.
  useEffect(() => {
    if (paymentStatus !== "pending" || !orderRef) return;

    const start = Date.now();
    const interval = setInterval(async () => {
      try {
        const status = await getOrderStatus(orderRef);
        if (status.status === "Paid") {
          setReceiptNumber(status.mpesaReceiptNumber);
          setPaymentStatus("paid");
          emptyCart(); // clear cart only now that payment is confirmed
          clearInterval(interval);
        } else if (status.status === "Failed") {
          setPaymentStatus("failed");
          toast.error("Payment was not completed.");
          clearInterval(interval);
        } else if (Date.now() - start > POLL_TIMEOUT_MS) {
          setPaymentStatus("timeout");
          clearInterval(interval);
        }
        // status === "Pending" → keep polling
      } catch {
        if (Date.now() - start > POLL_TIMEOUT_MS) {
          setPaymentStatus("timeout");
          clearInterval(interval);
        }
        // transient network error while polling — keep trying until timeout
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [paymentStatus, orderRef, emptyCart]);

  const resetToForm = () => {
    setPaymentStatus(null);
    setOrderRef(null);
    setReceiptNumber(null);
    setError("");
  };

  // ---- Full-screen states take over the page once an order exists ----

  if (paymentStatus === "pending") {
    return (
      <div className="checkout-cntr">
        <div className="payment-status-card">
          <Loader label="Check your phone — enter your M-Pesa PIN to complete payment" fullPage />
          <p className="payment-status-sub">Order {orderRef}</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === "paid") {
    return (
      <div className="checkout-cntr">
        <div className="payment-status-card payment-success">
          <div className="status-icon success-icon">✓</div>
          <h2>Payment received</h2>
          <p>Your order <strong>{orderRef}</strong> is confirmed.</p>
          {receiptNumber && <p className="receipt-number">M-Pesa receipt: {receiptNumber}</p>}
          <a href="/" className="place-order-btn status-action">Continue shopping</a>
        </div>
      </div>
    );
  }

  if (paymentStatus === "failed" || paymentStatus === "timeout") {
    return (
      <div className="checkout-cntr">
        <div className="payment-status-card payment-failed">
          <div className="status-icon failed-icon">✕</div>
          <h2>{paymentStatus === "timeout" ? "Payment not confirmed" : "Payment failed"}</h2>
          <p>
            {paymentStatus === "timeout"
              ? "We didn't receive confirmation in time. If you completed the M-Pesa prompt, contact support with your order reference before retrying."
              : "The M-Pesa transaction was not completed."}
          </p>
          <p className="receipt-number">Order reference: {orderRef}</p>
          <button className="place-order-btn status-action" onClick={resetToForm}>Try again</button>
        </div>
      </div>
    );
  }

  // ---- Default: the billing form ----

  return (
    <div className="checkout-cntr">
      <h1 className="checkout-heading">Checkout</h1>
      <div className="checkout-layout">
        <div className="billing-section">
          <h2 className="section-heading">Billing details</h2>
          <div className="form-row"><div className="form-group"><label>First name<span className="required">*</span></label><input name="firstName" type="text" value={form.firstName} onChange={updateForm} /></div><div className="form-group"><label>Last name<span className="required">*</span></label><input name="secondName" type="text" value={form.secondName} onChange={updateForm} /></div></div>
          <div className="form-group"><label>Country / Region<span className="required">*</span></label><select name="country" value={form.country} onChange={updateForm}><option>Kenya</option><option>Uganda</option><option>Tanzania</option></select></div>
          <div className="form-group"><label>Street address<span className="required">*</span></label><input name="streetAddress" type="text" value={form.streetAddress} onChange={updateForm} placeholder="House number and street name" required /><input name="apartment" type="text" value={form.apartment} onChange={updateForm} placeholder="Apartment, suite, unit, etc. (optional)" className="mt-8" /></div>
          <div className="form-group"><label>Town / City<span className="required">*</span></label><input name="city" type="text" value={form.city} onChange={updateForm} required /></div>
          <div className="form-group"><label>State / County<span className="required">*</span></label><select name="county" value={form.county} onChange={updateForm}><option>Nairobi County</option><option>Mombasa County</option><option>Kisumu County</option></select></div>
          <div className="form-group"><label>Phone<span className="required">*</span></label><input name="phoneNumber" type="tel" value={form.phoneNumber} onChange={updateForm} required /></div>
          <div className="form-group"><label>Email address<span className="required">*</span></label><input name="email" type="email" value={form.email} onChange={updateForm} required /></div>
          <div className="form-group"><label>Select Delivery location<span className="required">*</span></label><input name="deliveryLocation" type="text" value={form.deliveryLocation} onChange={updateForm} /></div>
        </div>
        <div className="order-section">
          <h2 className="section-heading">Your order</h2>
          <div className="order-box">
            <div className="order-row order-header"><span>Product</span><span>Subtotal</span></div>
            {items.map((item) => <div className="order-row" key={`${item.id}-${item.size}`}><span>{item.name} × {item.quantity}<br /><span className="order-size">Size: {item.size}</span></span><span>{formatPrice(item.price * item.quantity)}</span></div>)}
            <div className="order-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="order-row"><span>Surcharge Fee</span><span>{formatPrice(surcharge)}</span></div>
            <div className="order-row order-total"><span>Total</span><span>{formatPrice(total)}</span></div>
            <div className="payment-method">
              <label className="payment-option"><input type="radio" name="payment" checked readOnly />M-Pesa payment</label>
              <div className="payment-icons"><img src={mpesa} alt="" /></div><p className="payment-note">Pay securely via M-Pesa .</p>
            </div>
            <p className="privacy-note">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <span className="policy-link">privacy policy</span>.</p>
            <label className="terms-checkbox"><input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} />I have read and agree to the website <span className="policy-link">terms and conditions</span> *</label>
            {error && <p className="checkout-error">{error}</p>}
            <button className="place-order-btn" disabled={!agreed || submitting} onClick={placeOrder}>{submitting ? "Placing order..." : "Place order"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;