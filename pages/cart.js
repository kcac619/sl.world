import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCartItemsFromLocalStorage,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../utils/cartfns";

const CartPage = () => {
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
      <header>
        <div className="top-header hidden-xs" style={{ fontFamily: "outfit" }}>
          <div className="container">
            <div className="row">
              <div className="topbspinner">
                <div className="col-md-6 col-xs-12">
                  <div className="ebook">
                    <div className="ebook-ctn">
                      <h4>Monday - Friday: 8:00 AM - 9:00 PM</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xs-12">
                  <div className="custom-link">
                    <a href="index.php?route=information/information&language=en-gb&information_id=1">
                      About
                    </a>
                    <a href="index.php?route=information/sitemap&language=en-gb">
                      Site Map
                    </a>
                    <a href="index.php?route=product/manufacturer&language=en-gb">
                      Brand
                    </a>
                    <a href="index.php?route=information/contact&language=en-gb">
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="homemenu">
          <div className="container">
            <div className="row">
              <div className="sub_megamenu">
                <div className="container_wb_megamenu">
                  <div id="stamenu">
                    <nav id="menu" className="navbar">
                      <div className="navbar-expand-md">
                        <button
                          type="button"
                          className="btn-navbar navbar-toggler"
                          onclick="openNav()"
                          data-bs-toggle="collapse"
                          data-bs-target=".navbar-ex1-collapse"
                        >
                          <i className="fa fa-bars" />
                        </button>
                      </div>
                      <div id="wr-menu-icon ">
                        <div
                          className="wrmenu collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#under-menu"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        ></div>
                      </div>
                      <div id="mySidenav" className="sidenav menu-vertical">
                        <div id="under-menu" className="">
                          <div className="close-nav">
                            <span className="categories">Categories</span>
                            <a
                              href="javascript:void(0)"
                              className="closebtn float-end"
                              onclick="closeNav()"
                            >
                              <i className="fa fa-close" />
                            </a>
                          </div>
                          <div className="navbar-collapse navbar-ex1-collapse">
                            <ul className="nav navbar-nav">
                              <li className="nav-item">
                                <a href={"/solitaire"} className="nav-item">
                                  Solitaire
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="https://opencart.workdo.io/diamond/index.php?route=product/category&language=en-gb&path=60"
                                  className="nav-link"
                                >
                                  {/*<img src="https://opencart.workdo.io/diamond/image/cache/catalog/menu-icon/meat-fish-14x14.png" alt="Amethyst" title="Amethyst"> */}{" "}
                                  Amethyst
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="https://opencart.workdo.io/diamond/index.php?route=product/category&language=en-gb&path=67"
                                  className="nav-link"
                                >
                                  {/*<img src="" alt="Blue Sapphire" title="Blue Sapphire"> */}{" "}
                                  Blue Sapphire
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="https://opencart.workdo.io/diamond/index.php?route=product/category&language=en-gb&path=17"
                                  className="nav-link"
                                >
                                  {/*<img src="https://opencart.workdo.io/diamond/image/cache/catalog/menu-icon/coffee--tea-14x14.png" alt="Black Diamond" title="Black Diamond"> */}{" "}
                                  Black Diamond
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="https://opencart.workdo.io/diamond/index.php?route=product/category&language=en-gb&path=68"
                                  className="nav-link"
                                >
                                  {/*<img src="https://opencart.workdo.io/diamond/image/cache/catalog/menu-icon/chocolate-crackers-14x14.png" alt="Ametrine" title="Ametrine"> */}{" "}
                                  Ametrine
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </nav>
                    <div
                      className="w3-overlay w3-animate-opacity"
                      onclick="closeNav()"
                      style={{ cursor: "pointer" }}
                      id="myOverlay"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-5 head-manu">
                <div className="top-manu">
                  <div className="megamenu">
                    <div className="container_wb_megamenu">
                      <div id="stamenu">
                        <nav id="menu" className="navbar">
                          <div className="navbar-expand-md">
                            <button
                              type="button"
                              className="btn-navbar navbar-toggler"
                              onclick="openNav()"
                              data-bs-toggle="collapse"
                              data-bs-target=".navbar-ex1-collapse"
                            >
                              <i className="fa fa-bars" />
                            </button>
                          </div>
                          <div id="wr-menu-icon ">
                            <div
                              className="wrmenu collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#under-menu"
                              aria-expanded="false"
                              aria-controls="collapseExample"
                            ></div>
                          </div>
                          <div id="mySidenav" className="sidenav menu-vertical">
                            <div id="under-menu" className="">
                              <div className="close-nav">
                                <span className="categories">Categories</span>
                                <a
                                  href="javascript:void(0)"
                                  className="closebtn float-end"
                                  onclick="closeNav()"
                                >
                                  <i className="fa fa-close" />
                                </a>
                              </div>
                              <div className="navbar-collapse navbar-ex1-collapse">
                                <ul className="nav navbar-nav">
                                  <li className="nav-item">
                                    <Link
                                      href={"/solitaire"}
                                      className="nav-item"
                                    >
                                      Solitaire
                                    </Link>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      href="https://opencart.workdo.io/diamond/index.php?route=product/category&language=en-gb&path=60"
                                      className="nav-link"
                                    >
                                      {/*<img src="https://opencart.workdo.io/diamond/image/cache/catalog/menu-icon/meat-fish-14x14.png" alt="Amethyst" title="Amethyst"> */}{" "}
                                      Amethyst
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      href="https://opencart.workdo.io/diamond/index.php?route=product/category&language=en-gb&path=67"
                                      className="nav-link"
                                    >
                                      {/*<img src="" alt="Blue Sapphire" title="Blue Sapphire"> */}{" "}
                                      Blue Sapphire
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      href="https://opencart.workdo.io/diamond/index.php?route=product/category&language=en-gb&path=17"
                                      className="nav-link"
                                    >
                                      {/*<img src="https://opencart.workdo.io/diamond/image/cache/catalog/menu-icon/coffee--tea-14x14.png" alt="Black Diamond" title="Black Diamond"> */}{" "}
                                      Black Diamond
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      href="https://opencart.workdo.io/diamond/index.php?route=product/category&language=en-gb&path=68"
                                      className="nav-link"
                                    >
                                      {/*<img src="https://opencart.workdo.io/diamond/image/cache/catalog/menu-icon/chocolate-crackers-14x14.png" alt="Ametrine" title="Ametrine"> */}{" "}
                                      Ametrine
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </nav>
                        <div
                          className="w3-overlay w3-animate-opacity"
                          onclick="closeNav()"
                          style={{ cursor: "pointer" }}
                          id="myOverlay"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 col-sm-2 text-left header-logo">
                <div id="logo">
                  <a href="https://opencart.workdo.io/diamond/index.php?route=common/home&language=en-gb">
                    <img
                      src="https://opencart.workdo.io/diamond/image/catalog/storlogo/logo.png"
                      title="diamond"
                      alt="diamond"
                      className="img-responsive img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div className="col-md-5 col-sm-5 megamenu_border">
                <div className="main-header">
                  <div className="h-icon">
                    <div id="top-links">
                      <div className="h-search">
                        <div className="top-search">
                          <ul>
                            <li
                              id="search"
                              className="desktop-search d-inline-block"
                            >
                              <div className="d-search">
                                <button
                                  id="search_toggle"
                                  className="search-toggle"
                                  data-toggle="collapse"
                                  onclick="openSearch()"
                                >
                                  <span>Search</span>
                                  <img
                                    src="image/catalog/search.png"
                                    alt="search"
                                  />
                                </button>
                              </div>
                              <div id="search" className="wbSearch">
                                <div id="search_block_top">
                                  <select id="workdo-search-category">
                                    <option value={0}>Categories</option>
                                    <option value={60}>Amethyst</option>
                                    <option value={20}>bead</option>
                                    <option value={27}>
                                      &nbsp;&nbsp;&nbsp;&nbsp;bracelet
                                    </option>
                                    <option value={61}>
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alexandrite
                                    </option>
                                    <option value={63}>
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fashion
                                    </option>
                                    <option value={67}>Blue Sapphire</option>
                                    <option value={25}>Burma Ruby</option>
                                    <option value={29}>
                                      &nbsp;&nbsp;&nbsp;&nbsp;Citrine
                                    </option>
                                    <option value={65}>
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Colombian
                                      Emerald
                                    </option>
                                    <option value={66}>
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diamond
                                    </option>
                                    <option value={64}>
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Garnet
                                    </option>
                                    <option value={28}>
                                      &nbsp;&nbsp;&nbsp;&nbsp;Morganite
                                    </option>
                                    <option value={17}>Black Diamond</option>
                                    <option value={68}>Ametrine</option>
                                  </select>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      name="search"
                                      defaultValue=""
                                      placeholder="Search Product..."
                                      className="search_query form-control input-lg workdo-search"
                                    />
                                    <div className="input-group-btn">
                                      <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                      >
                                        <img
                                          src="image/catalog/search.png"
                                          alt="search"
                                        />
                                      </button>
                                      <a
                                        href="javascript:void(0)"
                                        className="closebtn close-nav"
                                        onclick="closeSearch()"
                                      >
                                        <i className="fa fa-close" />
                                      </a>
                                    </div>
                                    {/* workdo Search Start  */}
                                    <div className="workdo-search text-left">
                                      <div
                                        className="workdo-search-loader"
                                        style={{ display: "none" }}
                                      >
                                        <div className="loaders" />
                                      </div>
                                      {/* Add Loader */}
                                      <div className="workdo-search-result">
                                        {/* search results */}
                                      </div>
                                    </div>
                                    {/* workdo Search End  */}
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <ul className="list-inline d-flex user-bg">
                        <li className="userapp" />
                        <li className="huser">
                          <div className="dropdown">
                            <a
                              href=""
                              className="dropdown-toggle huser-drop"
                              data-bs-toggle="dropdown"
                            >
                              <div className="xuser">
                                <img src="image/catalog/huser.svg" alt="user" />
                                <span>My Profile</span>
                                <i className="fa fa-angle-down enaleng" />
                              </div>
                              <div className="xuser-desc d-none">
                                <span>
                                  <span className="d-none d-lg-inline">
                                    My Account
                                  </span>
                                </span>
                              </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right haccount  hlogout">
                              <h5 className="text-left">Your Account</h5>
                              <h6 className="text-left">
                                Access account and manage orders
                              </h6>
                              <li className="acd">
                                <a
                                  href="https://opencart.workdo.io/diamond/index.php?route=account/register&language=en-gb"
                                  className="dropdown-item"
                                >
                                  <i className="fa fa-user-plus" />
                                  Register
                                </a>
                              </li>
                              <li className="acd">
                                <a
                                  href="https://opencart.workdo.io/diamond/index.php?route=account/login&language=en-gb"
                                  className="dropdown-item"
                                >
                                  <i className="fa fa-lock" />
                                  Login
                                </a>
                              </li>
                              <li className="wishcom">
                                <a href="">
                                  <i className="fa fa-compress" />
                                  compare
                                </a>
                              </li>
                              <li className="wishcom">
                                <a href="https://opencart.workdo.io/diamond/index.php?route=account/wishlist&language=en-gb">
                                  <i className="fa fa-heart" />
                                  wishlist
                                </a>
                              </li>
                              <li className="xsla d-inline-block">
                                {" "}
                                <form
                                  action="https://opencart.workdo.io/diamond/index.php?route=common/currency|save&language=en-gb"
                                  method="post"
                                  encType="multipart/form-data"
                                  id="form-currency"
                                >
                                  <div className="dropdown">
                                    <button
                                      className="btn-link dropdown-toggle test"
                                      data-bs-toggle="dropdown"
                                    >
                                      <strong>$</strong>
                                      <span className="d-md-inline">
                                        Currency
                                      </span>{" "}
                                      <i className="fa fa-angle-down" />
                                    </button>
                                    <ul className="dropdown-menu">
                                      <li>
                                        <a href="EUR" className="dropdown-item">
                                          € Euro
                                        </a>
                                      </li>
                                      <li>
                                        <a href="GBP" className="dropdown-item">
                                          £ Pound Sterling
                                        </a>
                                      </li>
                                      <li>
                                        <a href="USD" className="dropdown-item">
                                          $ US Dollar
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <input
                                    type="hidden"
                                    name="code"
                                    defaultValue=""
                                  />{" "}
                                  <input
                                    type="hidden"
                                    name="redirect"
                                    defaultValue="https://opencart.workdo.io/diamond/index.php?route=common/home"
                                  />
                                </form>
                              </li>
                            </ul>
                            <ul></ul>
                          </div>
                        </li>
                      </ul>
                      <div className="d-inline-block">
                        <span id="header-cart">
                          <div id="cart" className="dropdown btn-block">
                            <button
                              type="button"
                              data-bs-toggle="dropdown"
                              className="btn btn-inverse dropdown-toggle"
                              onClick={toggleCartDropdown}
                              aria-expanded={cartDropdownOpen}
                            >
                              {/* ... [Your existing cart icon and text] ...  */}
                              <div className="xuser">
                                <img src="image/catalog/hcart.svg" alt="cart" />
                              </div>
                              <span className="cartl">
                                <span className="cartt">
                                  {cartItems.reduce(
                                    (acc, item) => acc + item.quantity,
                                    0
                                  )}{" "}
                                </span>
                                <span className="cartna">cart: items</span>
                                <strong>Items</strong>
                              </span>
                            </button>

                            {/* Cart Dropdown (Custom Styled) */}
                            <ul
                              className={`dropdown-menu dropdown-menu-right${
                                cartDropdownOpen ? " show" : ""
                              }`}
                              aria-labelledby="cart"
                              style={{
                                padding: "1rem",
                                maxWidth: "300px",
                                backgroundColor: "#0d1e1c", // Dark background color
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              {cartItems.length === 0 ? (
                                <li className="text-center">
                                  Your shopping cart is empty!
                                </li>
                              ) : (
                                <>
                                  <div
                                    style={{
                                      maxHeight: "250px",
                                      overflowY: "auto",
                                    }}
                                  >
                                    {cartItems.map((item) => (
                                      <div
                                        key={item.SolitaireID}
                                        className="d-flex align-items-center mb-3"
                                      >
                                        <Link href={`/${item.SolitaireID}`}>
                                          <img
                                            src={item.Image1}
                                            alt={
                                              item.ShapeName +
                                              "-" +
                                              item.SolitaireID
                                            }
                                            style={{
                                              width: "50px",
                                              height: "50px",
                                              objectFit: "cover",
                                              marginRight: "10px",
                                            }}
                                          />
                                        </Link>
                                        <div>
                                          <Link href={`/${item.SolitaireID}`}>
                                            <h6
                                              className="mb-0"
                                              style={{
                                                color: "#f2dfcf",
                                                fontFamily: "outfit",
                                              }}
                                            >
                                              {item.ShapeName +
                                                "-" +
                                                item.SolitaireID}
                                            </h6>
                                          </Link>
                                          <span className="text-muted small">
                                            Qty: {item.quantity} x ${item.Price}
                                          </span>
                                        </div>
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-link text-danger ml-auto"
                                          onClick={() =>
                                            handleRemoveFromCart(
                                              item.SolitaireID
                                            )
                                          }
                                        >
                                          <i className="fa fa-times"></i>
                                        </button>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Cart Totals */}
                                  <div className="text-right">
                                    <p className="mb-1">
                                      Subtotal:{" "}
                                      <span className="font-weight-bold">
                                        ${subTotal.toFixed(2)}
                                      </span>
                                    </p>
                                    <p className="mb-1">
                                      Total:{" "}
                                      <span className="font-weight-bold">
                                        ${total.toFixed(2)}
                                      </span>
                                    </p>
                                    <Link
                                      href="/cart"
                                      className="btn btn-primary btn-block"
                                    >
                                      View Cart
                                    </Link>
                                  </div>
                                </>
                              )}
                            </ul>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
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
                            <tr key={item.SolitaireID}>
                              <td
                                className=""
                                style={{
                                  alignContent: "center",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Link
                                  href={`/${item.SolitaireID}`}
                                  style={{
                                    alignContent: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={item.Image1}
                                    alt={item.ProductName}
                                    title={item.ProductName}
                                    className="img-thumbnail"
                                    style={{ height: "100px", width: "auto" }}
                                  />
                                </Link>
                              </td>
                              <td className="text-start text-wrap">
                                <Link href={`/${item.SolitaireID}`}>
                                  {item.ShapeName + "-" + item.SolitaireID}
                                </Link>
                                <br />
                                <small> - Size: {item.SizeOptions} </small>
                                {/* ... [Add other details if needed] ... */}
                              </td>
                              <td className="text-start">{item.UniqueCode}</td>
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
                                        item.SolitaireID,
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
                                        item.SolitaireID,
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
                                      handleRemoveFromCart(item.SolitaireID)
                                    }
                                  >
                                    <i className="fa-solid fa-circle-xmark"></i>
                                  </button>
                                </div>
                              </td>
                              <td className="text-end">${item.Price}</td>
                              <td className="text-end">
                                ${item.Price * item.quantity}
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
