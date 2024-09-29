import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCartItemsFromLocalStorage,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../utils/cartfns";
import jwt_decode from "jwt-decode";

const CartPage = () => {
  useEffect(() => {
    // Check if the code is running in the browser
    if (typeof window !== "undefined") {
      console.log("Running in the browser and logging jwt_decode", jwt_decode);
    }
  }, []);
  const [cartItems, setCartItems] = useState([]);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [postcode, setPostcode] = useState("");
  const [coupon, setCoupon] = useState(""); // For coupon code
  const [giftCertificate, setGiftCertificate] = useState("");
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false); // For dropdown

  useEffect(() => {
    const updateCart = () => {
      setCartItems(getCartItemsFromLocalStorage());
    };

    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  useEffect(() => {
    // Fetch cart items from localStorage when the component mounts
    setCartItems(getCartItemsFromLocalStorage());
  }, []);

  const handleRemoveFromCart = (solitaireId) => {
    removeFromCart(solitaireId);
    setCartItems(getCartItemsFromLocalStorage());
  };

  const handleQuantityChange = (solitaireId, newQuantity) => {
    updateCartItemQuantity({ SolitaireID: solitaireId, quantity: newQuantity });
    setCartItems(getCartItemsFromLocalStorage());
  };

  // Dummy functions for handling form submissions (replace with your actual logic)
  const handleShippingSubmit = async (event) => {
    event.preventDefault();
    console.log("Shipping form submitted:", country, region, postcode);
  };

  const handleCouponSubmit = async (event) => {
    event.preventDefault();
    console.log("Coupon form submitted:", coupon);
  };
  const toggleCartDropdown = () => {
    setCartDropdownOpen(!cartDropdownOpen);
  };
  const handleGiftCertificateSubmit = async (event) => {
    event.preventDefault();
    console.log("Gift certificate form submitted:", giftCertificate);
  };

  // Calculate subtotal and total (replace with your actual logic)
  const subTotal = cartItems.reduce(
    (total, item) => total + item.Price * item.quantity,
    0
  );
  const total = subTotal; // For now, total is the same as subtotal

  return (
    <div>
      {/* Main Content */}

      <main>
        <div className="pb-50">
          <div id="checkout-cart" className="container">
            <div className="d-flex justify-content-between align-items-center back-page">
              <div className="">
                <div className="back-to-home">
                  <Link href="/">
                    <i className="fas fa-arrow-left"></i>{" "}
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
                </ul>
              </div>
            </div>

            <div className="row">
              <div id="content" className="col">
                <h2 className="heading">
                  {" "}
                  <span>
                    Shopping Cart (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    Items)
                  </span>
                </h2>

                {cartItems.length === 0 ? (
                  <div id="shopping-cart">
                    <p>Your shopping cart is empty!</p>
                  </div>
                ) : (
                  <div id="shopping-cart">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <td className="text-center">Image</td>
                            <td className="text-start">Product Name</td>
                            <td className="text-start">UniqueCode</td>
                            <td className="text-start">Quantity</td>
                            <td className="text-end">Unit Price</td>
                            <td className="text-end">Total</td>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => (
                            <tr key={item.id}>
                              <td
                                className=""
                                style={{
                                  alignContent: "center",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Link
                                  href={
                                    item.Slug
                                      ? `/${item.Slug}`
                                      : `/${item.SolitaireID}`
                                  }
                                  style={{
                                    alignContent: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={item.Image1 || item.image}
                                    alt={item.SolitaireName || item.Title}
                                    title={item.SolitaireName || item.Title}
                                    className="img-thumbnail"
                                    style={{ height: "100px", width: "auto" }}
                                  />
                                </Link>
                              </td>
                              <td className="text-start text-wrap">
                                <Link
                                  href={
                                    item.Slug
                                      ? `/${item.Slug}`
                                      : `/${item.SolitaireID}`
                                  }
                                >
                                  {item.SolitaireName
                                    ? `${item.ShapeName}-${item.SolitaireID}`
                                    : item.Title}
                                </Link>
                                <br />
                                {/* Conditionally render size if available */}
                                {item.SizeOptions && (
                                  <small> - Size: {item.SizeOptions} </small>
                                )}
                              </td>
                              <td className="text-start">
                                {item.UniqueCode || ""}
                              </td>
                              <td className="text-start">
                                <div className="input-group cartpsp">
                                  <input
                                    type="number"
                                    name="quantity"
                                    value={item.quantity}
                                    size="1"
                                    className="form-control"
                                    min="1"
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        item.id, // Use generic 'id'
                                        parseInt(e.target.value) || 1
                                      )
                                    }
                                  />{" "}
                                  <button
                                    type="button"
                                    data-bs-toggle="tooltip"
                                    title="Update"
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.id,
                                        item.quantity
                                      )
                                    }
                                  >
                                    <i className="fa-solid fa-rotate"></i>
                                  </button>
                                  <button
                                    type="button"
                                    data-bs-toggle="tooltip"
                                    title="Remove"
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleRemoveFromCart(item.id)
                                    }
                                  >
                                    <i className="fa-solid fa-circle-xmark"></i>
                                  </button>
                                </div>
                              </td>
                              <td className="text-end">${item.Price || 0}</td>
                              <td className="text-end">
                                INR{""}
                                {((item.Price || 0) * item.quantity).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot id="checkout-total">
                          <tr>
                            <td colSpan="5" className="text-end">
                              <strong>Sub-Total</strong>
                            </td>
                            <td className="text-end">${subTotal.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td colSpan="5" className="text-end">
                              <strong>Total</strong>
                            </td>
                            <td className="text-end">${total.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                <h2 className="heading">
                  {" "}
                  <span>What would you like to do next?</span>
                </h2>
                <p>
                  Choose if you have a discount code or reward points you want
                  to use or would like to estimate your delivery cost.
                </p>
                <div id="accordion" className="accordion">
                  {/* Estimate Shipping & Taxes */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        type="button"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-shipping"
                      >
                        Estimate Shipping & Taxes
                      </button>
                    </h2>
                    <div
                      id="collapse-shipping"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <form id="form-quote" onSubmit={handleShippingSubmit}>
                          <p>
                            Enter your destination to get a shipping estimate.
                          </p>
                          <div className="row mb-3 required">
                            <label
                              htmlFor="input-country"
                              className="col-md-4 col-form-label"
                            >
                              Country
                            </label>
                            <div className="col-md-8">
                              <select
                                name="country_id"
                                id="input-country"
                                className="form-select"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                              >
                                <option value="">
                                  {" "}
                                  --- Please Select ---{" "}
                                </option>
                                {/* ... [Your country options] ... */}
                              </select>
                              <div
                                id="error-country"
                                className="invalid-feedback"
                              ></div>
                            </div>
                          </div>
                          <div className="row mb-3 required">
                            <label
                              htmlFor="input-zone"
                              className="col-md-4 col-form-label"
                            >
                              Region / State
                            </label>
                            <div className="col-md-8">
                              <select
                                name="zone_id"
                                id="input-zone"
                                className="form-select"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                              >
                                <option value="">
                                  {" "}
                                  --- Please Select ---{" "}
                                </option>
                                {/* ... [Your region/state options] ... */}
                              </select>
                              <div
                                id="error-zone"
                                className="invalid-feedback"
                              ></div>
                            </div>
                          </div>
                          <div className="row mb-3 required">
                            <label
                              htmlFor="input-postcode"
                              className="col-md-4 col-form-label"
                            >
                              Post Code
                            </label>
                            <div className="col-md-8">
                              <input
                                type="text"
                                name="postcode"
                                value={postcode}
                                placeholder="Post Code"
                                id="input-postcode"
                                className="form-control"
                                onChange={(e) => setPostcode(e.target.value)}
                              />
                              <div
                                id="error-postcode"
                                className="invalid-feedback"
                              ></div>
                            </div>
                          </div>
                          <div className="text-end">
                            <button
                              type="submit"
                              id="button-quote"
                              className="btn btn-primary"
                            >
                              Get Quotes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* Use Coupon Code */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        type="button"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-coupon"
                      >
                        Use Coupon Code
                      </button>
                    </h2>
                    <div
                      id="collapse-coupon"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <form id="form-coupon" onSubmit={handleCouponSubmit}>
                          <div className="row mb-3">
                            <label
                              htmlFor="input-coupon"
                              className="col-md-4 col-form-label"
                            >
                              Enter your coupon here
                            </label>
                            <div className="col-md-8">
                              <input
                                type="text"
                                name="coupon"
                                value={coupon}
                                placeholder="Enter your coupon here"
                                id="input-coupon"
                                className="form-control"
                                onChange={(e) => setCoupon(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                              Apply Coupon
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* Use Gift Certificate */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        type="button"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-voucher"
                      >
                        Use Gift Certificate
                      </button>
                    </h2>
                    <div
                      id="collapse-voucher"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <form
                          id="form-voucher"
                          onSubmit={handleGiftCertificateSubmit}
                        >
                          <div className="row mb-3">
                            <label
                              htmlFor="input-voucher"
                              className="col-md-4 col-form-label"
                            >
                              Enter your gift certificate code here
                            </label>
                            <div className="col-md-8">
                              <input
                                type="text"
                                name="voucher"
                                value={giftCertificate}
                                placeholder="Enter your gift certificate code here"
                                id="input-voucher"
                                className="form-control"
                                onChange={(e) =>
                                  setGiftCertificate(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                              Apply Gift Certificate
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="d-inline-block pt-2 pd-2 w-100">
                  <div className="float-start">
                    <Link href="/" className="btn btn-primary">
                      Continue Shopping
                    </Link>
                  </div>
                  <div className="float-end">
                    <Link href="/checkout" className="btn btn-primary">
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
