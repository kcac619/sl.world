"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  getCartItemsFromLocalStorage,
  removeFromCart,
  updateCartItemQuantity,
} from "../utils/cartfns";
import axios from "axios";

const Checkout = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
  });
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [shippingMethod, setShippingMethod] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [comment, setComment] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateCart = () => {
      setCartItems(getCartItemsFromLocalStorage());
    };

    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  useEffect(() => {
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleConfirmOrder = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const orderData = {
        cartItems: cartItems,
        ...shippingDetails, // Spread shipping details
        shippingFirstName: shippingDetails.firstName,
        shippingLastName: shippingDetails.lastName,
        shippingAddress: shippingDetails.address,
        shippingCity: shippingDetails.city,
        shippingPostcode: shippingDetails.postcode,
        orderNote: comment,
        shippingMethod: shippingMethod, // Add shipping method
        paymentMethod: paymentMethod, // Add payment method
      };

      const response = await axios.post("/api/checkout", orderData);

      if (response.status === 201) {
        console.log("Order created successfully:", response.data);
        setOrderSuccess(true);
        localStorage.removeItem("cart");
        setTimeout(() => {
          router.push("/order-success");
          setSubmitting(false);
        }, 1000);
      } else {
        setError(response.data.error || "Failed to create order.");
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setError(
        error.response?.data?.error || "An error occurred during checkout."
      );
      setSubmitting(false);
    }
  };

  const subTotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.Price);
    return total + (isNaN(price) ? 0 : price) * item.quantity;
  }, 0);

  const total = subTotal;

  return (
    <div className="checkout-page">
      <Head>
        <title>Checkout</title>
      </Head>

      <div className="pb-50">
        <div id="checkout-checkout" className="container">
          <div className="d-flex justify-content-between align-items-center back-page">
            <div className="">
              <div className="back-to-home">
                <Link href="/">
                  <img src="/img/back-to-home.svg" alt="Back to home" />  {" "}
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

          <div className="row">
            <div id="content" className="col">
              <h1 className="checkout-heading">Checkout</h1>

              <div className="row">
                {/* Billing & Shipping Details (Left Column) */}
                <div className="col-md-7 mb-3">
                  {/* Billing Details Form */}
                  <form id="checkout-payment-address">
                    <fieldset>
                      <legend>Billing Details</legend>
                      <div className="row row-cols-1 row-cols-md-2">
                        <div className="col mb-3 required">
                          <label
                            htmlFor="input-payment-firstname"
                            className="form-label"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={shippingDetails.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            id="input-payment-firstname"
                            className="form-control"
                            required
                          />
                          <div
                            id="error-payment-firstname"
                            className="invalid-feedback"
                          ></div>
                        </div>
                        <div className="col mb-3 required">
                          <label
                            htmlFor="input-payment-lastname"
                            className="form-label"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={shippingDetails.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            id="input-payment-lastname"
                            className="form-control"
                            required
                          />
                          <div
                            id="error-payment-lastname"
                            className="invalid-feedback"
                          ></div>
                        </div>

                        <div className="col mb-3 required">
                          <label
                            htmlFor="input-payment-email"
                            className="form-label"
                          >
                            E-Mail
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={shippingDetails.email}
                            onChange={handleInputChange}
                            placeholder="E-Mail"
                            id="input-payment-email"
                            className="form-control"
                            required
                          />
                          <div
                            id="error-payment-email"
                            className="invalid-feedback"
                          ></div>
                        </div>
                        <div className="col mb-3 required">
                          <label
                            htmlFor="input-payment-telephone"
                            className="form-label"
                          >
                            Telephone
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={shippingDetails.phone}
                            onChange={handleInputChange}
                            placeholder="Telephone"
                            id="input-payment-telephone"
                            className="form-control"
                            required
                          />
                          <div
                            id="error-payment-telephone"
                            className="invalid-feedback"
                          ></div>
                        </div>
                        <div className="col mb-3">
                          <label
                            htmlFor="input-payment-address"
                            className="form-label"
                          >
                            Address{" "}
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={shippingDetails.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                            id="input-payment-address"
                            className="form-control"
                          />
                        </div>
                        <div className="col mb-3">
                          <label
                            htmlFor="input-payment-city"
                            className="form-label"
                          >
                            City{" "}
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={shippingDetails.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            id="input-payment-city"
                            className="form-control"
                          />
                        </div>
                        <div className="col mb-3">
                          <label
                            htmlFor="input-payment-postcode"
                            className="form-label"
                          >
                            Post Code{" "}
                          </label>
                          <input
                            type="text"
                            name="postcode"
                            value={shippingDetails.postcode}
                            onChange={handleInputChange}
                            placeholder="Post Code"
                            id="input-payment-postcode"
                            className="form-control"
                          />
                        </div>
                        <div className="col mb-3 required">
                          <label
                            htmlFor="input-payment-country"
                            className="form-label"
                          >
                            Country
                          </label>
                          <select
                            name="country"
                            id="input-payment-country"
                            className="form-select"
                            value={shippingDetails.country}
                            onChange={handleInputChange}
                          >
                            <option value=""> --- Please Select --- </option>
                            <option value="244">Aaland Islands</option>
                            <option value="1">Afghanistan</option>
                            <option value="2">Albania</option>
                            <option value="3">Algeria</option>
                            {/* ... [Your other country options] ... */}
                          </select>
                          <div
                            id="error-payment-country"
                            className="invalid-feedback"
                          ></div>
                        </div>
                        <div className="col mb-3 required">
                          <label
                            htmlFor="input-payment-zone"
                            className="form-label"
                          >
                            Region / State
                          </label>
                          <select
                            name="region"
                            id="input-payment-zone"
                            className="form-select"
                            value={shippingDetails.region}
                            onChange={handleInputChange}
                          >
                            <option value=""> --- Please Select --- </option>
                            {/* ... [Your region/state options based on selected country] ... */}
                          </select>
                          <div
                            id="error-payment-zone"
                            className="invalid-feedback"
                          ></div>
                        </div>
                      </div>
                      <div className="text-end mb-3">
                        <button
                          type="submit"
                          id="button-shipping-address"
                          className="btn btn-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log(
                              "Billing address submitted: ",
                              shippingDetails
                            );
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    </fieldset>
                  </form>

                  {/* Delivery Details Form */}
                  <form
                    id="checkout-shipping-address"
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log("Shipping address form submitted : ", {
                        shippingDetails,
                      });
                    }}
                  >
                    <fieldset>
                      <legend>Delivery Details</legend>
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
                            name="firstName"
                            value={shippingDetails.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            id="input-shipping-firstname"
                            className="form-control"
                            required
                          />
                          <div
                            id="error-shipping-firstname"
                            className="invalid-feedback"
                          ></div>
                        </div>
                        <div className="col mb-3 required">
                          <label
                            htmlFor="input-shipping-lastname"
                            className="form-label"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={shippingDetails.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            id="input-shipping-lastname"
                            className="form-control"
                            required
                          />
                          <div
                            id="error-shipping-lastname"
                            className="invalid-feedback"
                          ></div>
                        </div>
                        <div className="col mb-3 required">
                          <label
                            htmlFor="input-shipping-email"
                            className="form-label"
                          >
                            E-Mail
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={shippingDetails.email}
                            onChange={handleInputChange}
                            placeholder="E-Mail"
                            id="input-shipping-email"
                            className="form-control"
                            required
                          />
                          <div
                            id="error-shipping-email"
                            className="invalid-feedback"
                          ></div>
                        </div>
                        <div className="col mb-3 required">
                          <label
                            htmlFor="input-shipping-telephone"
                            className="form-label"
                          >
                            Telephone
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={shippingDetails.phone}
                            onChange={handleInputChange}
                            placeholder="Telephone"
                            id="input-shipping-telephone"
                            className="form-control"
                            required
                          />
                          <div
                            id="error-shipping-telephone"
                            className="invalid-feedback"
                          ></div>
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
                            name="address"
                            value={shippingDetails.address}
                            onChange={handleInputChange}
                            placeholder="Address 1"
                            id="input-shipping-address-1"
                            className="form-control"
                            required
                          />
                          <div
                            id="error-shipping-address-1"
                            className="invalid-feedback"
                          ></div>
                        </div>

                        {/* Address 2 (Optional) */}
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
                            value={shippingDetails.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            id="input-shipping-city"
                            className="form-control"
                            required
                          />
                          <div
                            id="error-shipping-city"
                            className="invalid-feedback"
                          ></div>
                        </div>

                        {/* Post Code */}
                        <div className="col mb-3 required">
                          <label
                            htmlFor="input-shipping-postcode"
                            className="form-label"
                          >
                            Post Code
                          </label>
                          <input
                            type="text"
                            name="postcode"
                            value={shippingDetails.postcode}
                            onChange={handleInputChange}
                            placeholder="Post Code"
                            id="input-shipping-postcode"
                            className="form-control"
                            required
                          />
                          <div
                            id="error-shipping-postcode"
                            className="invalid-feedback"
                          ></div>
                        </div>

                        {/* Country */}
                        <div className="col mb-3 required">
                          <label
                            htmlFor="input-shipping-country"
                            className="form-label"
                          >
                            Country
                          </label>
                          <select
                            name="country"
                            id="input-shipping-country"
                            className="form-select"
                            value={shippingDetails.country}
                            onChange={handleInputChange}
                          >
                            <option value=""> --- Please Select --- </option>
                            <option value="244">Aaland Islands</option>
                            <option value="1">Afghanistan</option>
                            <option value="2">Albania</option>
                            <option value="3">Algeria</option>
                            {/* ... [Your other country options] ... */}
                          </select>
                          <div
                            id="error-shipping-country"
                            className="invalid-feedback"
                          ></div>
                        </div>

                        {/* Region / State */}
                        <div className="col mb-3 required">
                          <label
                            htmlFor="input-shipping-zone"
                            className="form-label"
                          >
                            Region / State
                          </label>
                          <select
                            name="region"
                            id="input-shipping-zone"
                            className="form-select"
                            value={shippingDetails.region}
                            onChange={handleInputChange}
                          >
                            <option value=""> --- Please Select --- </option>
                            {/* ... [Your region/state options based on selected country] ... */}
                          </select>
                          <div
                            id="error-shipping-zone"
                            className="invalid-feedback"
                          ></div>
                        </div>
                      </div>
                      <div className="text-end mb-3">
                        <button
                          type="submit"
                          id="button-shipping-address"
                          className="btn btn-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("Shipping address form submitted : ", {
                              shippingDetails,
                            });
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    </fieldset>
                  </form>

                  {/* Shipping and Payment Method (Simplified - No Forms) */}
                  <div className="mb-4">
                    <h3>Shipping Method</h3>
                    <p>Please select your preferred shipping method.</p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="shipping_method"
                        id="shipping-method-1"
                        value="standard_shipping"
                        onChange={(e) => setShippingMethod(e.target.value)}
                        checked={shippingMethod === "standard_shipping"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="shipping-method-1"
                      >
                        Standard Shipping
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="shipping_method"
                        id="shipping-method-2"
                        value="express_shipping"
                        onChange={(e) => setShippingMethod(e.target.value)}
                        checked={shippingMethod === "express_shipping"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="shipping-method-2"
                      >
                        Express Shipping
                      </label>
                    </div>
                    <hr />

                    <h3>Payment Method</h3>
                    <p>Please select your preferred payment method.</p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment_method"
                        id="payment-method-1"
                        value="credit_card"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        checked={paymentMethod === "credit_card"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="payment-method-1"
                      >
                        Credit Card
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment_method"
                        id="payment-method-2"
                        value="paypal"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        checked={paymentMethod === "paypal"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="payment-method-2"
                      >
                        PayPal
                      </label>
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="mb-3">
                    <label htmlFor="input-comment" className="form-label">
                      <strong>Add Comments About Your Order</strong>
                    </label>
                    <textarea
                      name="comment"
                      rows="8"
                      id="input-comment"
                      className="form-control"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
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
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleConfirmOrder}
                          disabled={submitting || cartItems.length === 0}
                        >
                          {submitting ? (
                            <div>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                               Submitting...
                            </div>
                          ) : (
                            "Confirm Order"
                          )}
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
    </div>
  );
};

export default Checkout;
