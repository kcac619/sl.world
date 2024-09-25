"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  getCartItemsFromLocalStorage,
  removeFromCart,
  updateCartItemQuantity,
} from "../utils/cartfns";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [postcode, setPostcode] = useState("");
  const [shippingAddressId, setShippingAddressId] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [comment, setComment] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  useEffect(() => {
    // Update cart items when local storage changes
    const updateCart = () => {
      setCartItems(getCartItemsFromLocalStorage());
    };

    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  useEffect(() => {
    // Fetch cart items when component mounts
    setCartItems(getCartItemsFromLocalStorage());
  }, []);

  const handleRemoveFromCart = (solitaireId) => {
    removeFromCart(solitaireId);
    setCartItems(getCartItemsFromLocalStorage());
  };

  const handleQuantityChange = (solitaireId, newQuantity) => {
    updateCartItemQuantity(solitaireId, newQuantity);
    setCartItems(getCartItemsFromLocalStorage());
  };

  // Placeholder functions for form submissions (replace with your actual logic)
  const handleShippingAddressSubmit = (event) => {
    event.preventDefault();
    // ... [Your logic to save shipping address] ...
    console.log("Shipping address submitted.");
  };

  const handleShippingMethodSubmit = (event) => {
    event.preventDefault();
    // ... [Your logic to save shipping method] ...
    console.log("Shipping method submitted.");
  };

  const handlePaymentMethodSubmit = (event) => {
    event.preventDefault();
    // ... [Your logic to save payment method] ...
    console.log("Payment method submitted.");
  };

  const handleConfirmOrder = (event) => {
    event.preventDefault();
    // ... [Your logic to place the order] ...
    console.log("Order confirmed!");
  };

  // Calculate subtotal and total (replace with your actual logic)
  const subTotal = cartItems.reduce(
    (total, item) => total + item.Price * item.quantity,
    0
  );
  const total = subTotal;

  return (
    <div className="checkout-page">
      <Head>
        <title>Checkout</title>
      </Head>

      <Header />

      <div className="pb-50">
        <div id="checkout-checkout" className="container">
          {/* Breadcrumb */}
          <div className="d-flex justify-content-between align-items-center back-page">
            <div className="">
              <div className="back-to-home">
                <Link href="/">
                  <img src="/img/back-to-home.svg" alt="Back to home" />{" "}
                  <span> Back to category</span>
                </Link>
              </div>
            </div>
            <div className="">
              <ul className="breadcrumb ">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <i className="fas fa-home"></i>
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/cart">Shopping Cart</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/checkout">Checkout</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Breadcrumb end */}

          <div className="row">
            <div id="content" className="col">
              <h1 className="checkout-heading">Checkout</h1>

              {/* Two-Column Layout */}
              <div className="row">
                {/* Shipping & Payment (Left Column) */}
                <div className="col-md-7 mb-3">
                  {/* Shipping Address */}
                  <div id="checkout-shipping-address">
                    <fieldset>
                      <legend>Shipping Address</legend>
                      {/* ... [Your existing address selection logic (existing vs. new)] ... */}

                      {/* New Shipping Address Form */}
                      <div id="shipping-new" style={{ display: "block" }}>
                        <form
                          id="form-shipping-address"
                          onSubmit={handleShippingAddressSubmit}
                        >
                          <div className="row row-cols-1 row-cols-md-2">
                            {/* First Name */}
                            <div className="col mb-3 required">
                              <label
                                htmlFor="input-shipping-firstname"
                                className="form-label"
                              >
                                First Name
                              </label>
                              <input
                                type="text"
                                name="firstname"
                                defaultValue=""
                                placeholder="First Name"
                                id="input-shipping-firstname"
                                className="form-control"
                              />
                              <div
                                id="error-shipping-firstname"
                                className="invalid-feedback"
                              ></div>
                            </div>

                            {/* Last Name */}
                            <div className="col mb-3 required">
                              <label
                                htmlFor="input-shipping-lastname"
                                className="form-label"
                              >
                                Last Name
                              </label>
                              <input
                                type="text"
                                name="lastname"
                                defaultValue=""
                                placeholder="Last Name"
                                id="input-shipping-lastname"
                                className="form-control"
                              />
                              <div
                                id="error-shipping-lastname"
                                className="invalid-feedback"
                              ></div>
                            </div>

                            {/* Company */}
                            <div className="col mb-3">
                              <label
                                htmlFor="input-shipping-company"
                                className="form-label"
                              >
                                Company
                              </label>
                              <input
                                type="text"
                                name="company"
                                defaultValue=""
                                placeholder="Company"
                                id="input-shipping-company"
                                className="form-control"
                              />
                            </div>

                            {/* Address 1 */}
                            <div className="col mb-3 required">
                              <label
                                htmlFor="input-shipping-address-1"
                                className="form-label"
                              >
                                Address 1
                              </label>
                              <input
                                type="text"
                                name="address_1"
                                defaultValue=""
                                placeholder="Address 1"
                                id="input-shipping-address-1"
                                className="form-control"
                              />
                              <div
                                id="error-shipping-address-1"
                                className="invalid-feedback"
                              ></div>
                            </div>

                            {/* Address 2 */}
                            <div className="col mb-3">
                              <label
                                htmlFor="input-shipping-address-2"
                                className="form-label"
                              >
                                Address 2
                              </label>
                              <input
                                type="text"
                                name="address_2"
                                defaultValue=""
                                placeholder="Address 2"
                                id="input-shipping-address-2"
                                className="form-control"
                              />
                            </div>

                            {/* City */}
                            <div className="col mb-3 required">
                              <label
                                htmlFor="input-shipping-city"
                                className="form-label"
                              >
                                City
                              </label>
                              <input
                                type="text"
                                name="city"
                                defaultValue=""
                                placeholder="City"
                                id="input-shipping-city"
                                className="form-control"
                              />
                              <div
                                id="error-shipping-city"
                                className="invalid-feedback"
                              ></div>
                            </div>

                            {/* Post Code */}
                            <div className="col mb-3">
                              <label
                                htmlFor="input-shipping-postcode"
                                className="form-label"
                              >
                                Post Code
                              </label>
                              <input
                                type="text"
                                name="postcode"
                                defaultValue=""
                                placeholder="Post Code"
                                id="input-shipping-postcode"
                                className="form-control"
                              />
                              <div
                                id="error-shipping-postcode"
                                className="invalid-feedback"
                              ></div>
                            </div>

                            {/* Country */}
                            {/* ... [Your Country Select JSX] ...  */}

                            {/* Region / State */}
                            {/* ... [Your Region/State Select JSX] ... */}
                          </div>

                          <div className="text-end mb-3">
                            <button
                              type="submit"
                              id="button-shipping-address"
                              className="btn btn-primary"
                            >
                              Continue
                            </button>
                          </div>
                        </form>
                      </div>
                    </fieldset>
                  </div>

                  {/* Shipping Method (placeholder)  */}
                  <div id="checkout-shipping-method" className="mb-3">
                    <form
                      id="form-shipping-method"
                      onSubmit={handleShippingMethodSubmit}
                    >
                      <fieldset>
                        <legend>Shipping Method</legend>
                        <div className="input-group">
                          <select
                            name="shipping_method"
                            id="input-shipping-method"
                            className="form-select"
                            value={shippingMethod}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            disabled
                          >
                            <option value=""> --- Please Select --- </option>
                            {/* ... [Your shipping method options] ... */}
                          </select>
                          <button
                            type="submit"
                            id="button-shipping-method"
                            className="btn btn-light"
                          >
                            <i className="fa-solid fa-rotate"></i>
                          </button>
                        </div>
                      </fieldset>
                    </form>
                  </div>

                  {/* Payment Method (placeholder) */}
                  <div id="checkout-payment-method" className="mb-4">
                    <form
                      id="form-payment-method"
                      onSubmit={handlePaymentMethodSubmit}
                    >
                      <fieldset>
                        <legend>Payment Method</legend>
                        <div className="input-group">
                          <select
                            name="payment_method"
                            id="input-payment-method"
                            className="form-select"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            disabled
                          >
                            <option value=""> --- Please Select --- </option>
                            {/* ... [Your payment method options] ... */}
                          </select>
                          <button
                            type="submit"
                            id="button-payment-method"
                            className="btn btn-light"
                          >
                            <i className="fa-solid fa-rotate"></i>
                          </button>
                        </div>
                      </fieldset>
                    </form>

                    <div className="mb-2">
                      <label htmlFor="input-comment" className="form-label">
                        <strong>Add Comments About Your Order</strong>
                      </label>
                      <textarea
                        name="comment"
                        rows="3"
                        id="input-comment"
                        className="form-control"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Order Summary (Right Column) */}
                <div className="col-md-5">
                  <div id="checkout-confirm">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <td className="text-start">Product Name</td>
                            <td className="text-end">Total</td>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => (
                            <tr key={item.SolitaireID}>
                              <td className="text-start">
                                {item.quantity}x{" "}
                                <Link href={`/${item.Slug}`}>
                                  {item.SolitaireName}
                                </Link>
                                <br />
                                <small>
                                  {" "}
                                  - Size: {item.SizeOptions || "N/A"}
                                </small>
                              </td>
                              <td className="text-end">
                                ${(item.Price * item.quantity).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          {/* Sub-Total */}
                          <tr>
                            <td className="text-end">
                              <strong>Sub-Total</strong>
                            </td>
                            <td className="text-end">${subTotal.toFixed(2)}</td>
                          </tr>

                          {/* Total */}
                          <tr>
                            <td className="text-end">
                              <strong>Total</strong>
                            </td>
                            <td className="text-end">${total.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    <div id="checkout-payment">
                      <div className="text-end">
                        {/* "Confirm Order" Button (disabled for now) */}
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleConfirmOrder}
                        >
                          Confirm Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
