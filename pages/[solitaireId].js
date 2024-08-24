import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Link from "next/link"; // For routing
import {
  getCartItemsFromLocalStorage,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../utils/cartfns";

const SolitaireDetails = () => {
  const router = useRouter();
  const { solitaireId } = router.query;

  const [solitaire, setSolitaire] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

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
  // Check if this solitaire is already in the cart
  const isInCart = cartItems.some(
    (item) => item.SolitaireID === solitaire?.SolitaireID
  );

  const handleAddToCart = () => {
    console.log("quantity", quantity);
    addToCart({ ...solitaire, quantity });
    setCartItems(getCartItemsFromLocalStorage());
  };

  const handleRemoveFromCart = (solitaireId) => {
    removeFromCart(solitaireId);
    setCartItems(getCartItemsFromLocalStorage());
  };

  // Toggle the cart dropdown
  const toggleCartDropdown = () => {
    setCartDropdownOpen(!cartDropdownOpen);
  };
  // Calculate subtotal and total
  const subTotal = cartItems.reduce(
    (total, item) => total + item.Price * item.quantity,
    0
  );
  const total = subTotal;

  useEffect(() => {
    if (solitaireId) {
      fetchSolitaireDetails(solitaireId);
    }
  }, [solitaireId]);

  const fetchSolitaireDetails = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/solitairebyId/${id}`);

      if (response.status === 200) {
        setSolitaire(response.data.solitaire);
      } else {
        console.error("Error fetching solitaire details:", response.data.error);
        setError("Error fetching solitaire details.");
      }
    } catch (error) {
      console.error("Error fetching solitaire details:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Quantity handling
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value) || 1); // Ensure quantity is at least 1
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handle form submission (you'll need to adapt this to your backend logic)
  const handleSubmit = async (event) => {
    event.preventDefault();
    // ... [Your logic to add the solitaire to the cart using API call] ...
  };

  if (isLoading) {
    return <div style={{ color: "#f2dfcf" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "#f2dfcf" }}>Error: {error}</div>;
  }

  if (!solitaire) {
    return <div style={{ color: "#f2dfcf" }}>Solitaire not found.</div>;
  }

  return (
    <div>
      <Head>
        <title>
          {solitaire.ProductName} {solitaire.SolitaireID} -{" "}
          {solitaire.ShapeName}
        </title>
        {/* ... [Add other meta tags] ... */}
      </Head>

      {/* Header */}
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

      {/* Main Content */}
      <main>
        <div className="">
          <div id="product-info">
            <div className="">
              <div id="content" className="col">
                <div className="productbg p-bg">
                  <div className="container">
                    <div className="row">
                      {/* Image Section */}
                      <div className="col-lg-5 col-md-6 col-xs-12 zoom-left sticky t-50">
                        <div className="pro-bg">
                          <div className="image magnific-popup row">
                            <div className="col-md-12 col-sm-12 col-xs-12 big-img">
                              {solitaire.Image1 && (
                                <a
                                  href={solitaire.Image1}
                                  title={solitaire.ProductName}
                                >
                                  <img
                                    id="img_01"
                                    src={solitaire.Image1}
                                    data-zoom-image={solitaire.Image1}
                                    title={solitaire.ShapeName}
                                    alt={solitaire.ShapeName}
                                    style={{ top: "50px", scale: "0.85" }}
                                    className="img-thumbnail img-fluid"
                                  />
                                </a>
                              )}
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 gal-img">
                              <div id="gal1" className="gallery_img">
                                {/* Render additional images here */}
                                {solitaire.Image2 && (
                                  <a
                                    href={solitaire.Image2}
                                    className="elevatezoom-gallery img-fluid"
                                    title={solitaire.ShapeName}
                                    data-update=""
                                    data-image={solitaire.Image2}
                                    data-zoom-image={solitaire.Image2}
                                  >
                                    <img
                                      src={solitaire.Image2}
                                      data-zoom-image={solitaire.Image2}
                                      id="img_02"
                                      title={solitaire.ShapeName}
                                      alt={solitaire.ShapeName}
                                      className="img-thumbnail"
                                    />
                                  </a>
                                )}
                                {/* ... Add Image3, Image4, Image5 similarly */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product Details Section */}
                      <div className="col-lg-7 col-md-6 col-xs-12 pro-content t-50">
                        <div className="d-flex justify-content-between align-items-center back-page">
                          <div className="">
                            <div className="back-to-home">
                              {/* ... [Adapt link to use Next.js Link component] ... */}
                            </div>
                          </div>
                          <div className="">
                            <ul className="breadcrumb">
                              <li className="breadcrumb-item">
                                <Link href="/">
                                  <i className="fas fa-home"></i>
                                </Link>
                              </li>
                              <li className="breadcrumb-item">
                                <Link href="#">
                                  {solitaire.ShapeName +
                                    "-" +
                                    solitaire.SolitaireID}
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Product Information */}
                        <div className="prsubdec">
                          {/* ... [Replace rating logic with your React implementation] ... */}

                          <div className="pro-btn">
                            <a className="product-name" href="#">
                              {solitaire.BrandName}
                            </a>

                            <form
                              method="post"
                              className="d-inline-flex wc-btn"
                              onSubmit={(event) => {
                                event.preventDefault();
                                // Add your logic here to handle adding to wishlist
                              }}
                            >
                              <button
                                type="submit"
                                data-bs-toggle="tooltip"
                                className="btn pcrt wish"
                                title="Add to Wish List"
                                style={{
                                  textAlign: "center",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src="image/catalog/wishlist.svg"
                                  alt="wishlist"
                                />
                              </button>

                              <button
                                type="submit"
                                data-bs-toggle="tooltip"
                                className="btn pcrt compare"
                                title="Add to Compare"
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  // Add your logic here to handle adding to compare
                                }}
                              >
                                <svg width="16px" height="16px">
                                  <use xlinkHref="#compare"></use>
                                </svg>
                              </button>
                            </form>
                          </div>

                          <h1>
                            {solitaire.ShapeName + "-" + solitaire.SolitaireID}
                          </h1>

                          <div
                            className="products-specific"
                            style={{ fontFamily: "outfit" }}
                          >
                            <ul className="list-unstyled">
                              <li className="d-flex align-items-center">
                                {" "}
                                {/* Use flexbox for alignment */}
                                <i className="fas fa-gem mr-2"></i>{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* Icon column - adjust icon class */}
                                <span className="text-decor">Shape:</span>{" "}
                                {solitaire.ShapeName}
                              </li>
                              <li className="d-flex align-items-center">
                                <i className="fas fa-balance-scale-left mr-2"></i>{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                {/* Adjust icon class */}
                                <span className="text-decor">Carat:</span>{" "}
                                {solitaire.Carat}
                              </li>
                              <li className="d-flex align-items-center">
                                <i className="fas fa-palette mr-2"></i>{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* Adjust icon class */}
                                <span className="text-decor">Color:</span>{" "}
                                {solitaire.ColorName}
                              </li>
                              <li className="d-flex align-items-center">
                                <i className="fas fa-search-plus mr-2"></i>{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* Adjust icon class */}
                                <span className="text-decor">
                                  Clarity:
                                </span>{" "}
                                {solitaire.PurityName}
                              </li>
                              <li className="d-flex align-items-center">
                                <i className="fas fa-map-marker-alt mr-2"></i>{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* Adjust icon class */}
                                <span className="text-decor">
                                  Location:
                                </span>{" "}
                                {solitaire.LocationName}
                              </li>
                            </ul>

                            <ul className="list-unstyled">
                              <li className="d-flex align-items-center">
                                <i className="fas fa-cut mr-2"></i>{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* Adjust icon class */}
                                <span className="text-decor">Cut:</span>{" "}
                                {solitaire.CutName}
                              </li>
                              <li className="d-flex align-items-center">
                                <i className="fas fa-flask mr-2"></i>{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* Adjust icon class */}
                                <span className="text-decor">Lab:</span>{" "}
                                {solitaire.LabName}
                              </li>
                              <li className="d-flex align-items-center">
                                <i className="fas fa-magic mr-2"></i>{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* Adjust icon class */}
                                <span className="text-decor">Polish:</span>{" "}
                                {solitaire.PolishName}
                              </li>
                              <li className="d-flex align-items-center">
                                <i className="fas fa-arrows-alt-h mr-2"></i>{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {/* Adjust icon class */}
                                <span className="text-decor">
                                  Symmetry:
                                </span>{" "}
                                {solitaire.SymmetryName}
                              </li>
                            </ul>
                          </div>

                          {/* Product Form (replace OpenCart logic)  */}
                          <div id="product" className="clearfix">
                            <form id="form-product" onSubmit={handleSubmit}>
                              {/* ... [Your web_option JSX] ... */}

                              {/* Quantity Input */}
                              <div className="pro-qut">
                                <label
                                  htmlFor="input-quantity"
                                  className="form-label text-decorop"
                                >
                                  Qty
                                </label>
                                <div className="op-box qty-plus-minus">
                                  <button
                                    type="button"
                                    className="form-control pull-left btn-number btnminus"
                                    disabled={quantity === 1}
                                    onClick={decreaseQuantity}
                                  >
                                    <span className="fa fa-minus"></span>
                                  </button>
                                  <input
                                    id="input-quantity"
                                    type="text"
                                    name="quantity"
                                    value={quantity}
                                    size="2"
                                    className="form-control input-number pull-left"
                                    onChange={handleQuantityChange}
                                  />
                                  <button
                                    type="button"
                                    className="form-control pull-left btn-number btnplus"
                                    onClick={increaseQuantity}
                                  >
                                    <span className="fa fa-plus"></span>
                                  </button>
                                  <div
                                    id="error-quantity"
                                    className="form-text"
                                  ></div>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="pro-price">
                                <ul className="list-unstyled">
                                  <li className="text-decor-bold">
                                    <h2>
                                      <span className="price-new">
                                        ${solitaire.Price}
                                      </span>
                                    </h2>
                                  </li>
                                </ul>
                              </div>

                              {/* Add to Cart Button */}
                              <div className="qty-flex">
                                {isInCart ? ( // Display a message if already in cart
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <p
                                      className="text-success"
                                      style={{
                                        marginRight: "10px",
                                        display: "inline-block",
                                      }}
                                    >
                                      Already in cart!
                                    </p>
                                    <Link
                                      href="/cart"
                                      className="btn btn-primary btn-lg btn-block"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      Open Cart
                                      <img
                                        alt="stor-bg"
                                        src="image/catalog/stor-bg.svg"
                                        style={{
                                          marginLeft: "5px",
                                        }}
                                      />
                                    </Link>
                                  </div>
                                ) : (
                                  <button
                                    onClick={handleAddToCart}
                                    className="btn btn-primary btn-lg btn-block"
                                  >
                                    Add to Cart
                                    <img
                                      alt="stor-bg"
                                      src="image/catalog/stor-bg.svg"
                                    />
                                  </button>
                                )}

                                <input
                                  type="hidden"
                                  name="product_id"
                                  value={solitaire.SolitaireID}
                                />
                              </div>
                            </form>
                          </div>
                          {/* ... [Replace AddToAny section as needed] ... */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  PDF and Video Panels  */}
                <div className="container mt-4">
                  <div className="row">
                    {/* PDF Panel */}
                    <div className="col-md-6">
                      <div className="card">
                        <div
                          className="card-header"
                          style={{
                            color: "#f2dfcf",
                            fontFamily: "outfit",
                            textAlign: "center",
                          }}
                        >
                          Product Certificate (PDF)
                        </div>
                        <object
                          class="pdf"
                          data="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf"
                          width="auto"
                          height="600"
                          style={{ marginBottom: "50px" }}
                        ></object>
                      </div>
                    </div>

                    {/* Video Panel */}
                    <div className="col-md-6">
                      <div
                        className="card"
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className="card-header"
                          style={{
                            color: "#f2dfcf",
                            fontFamily: "outfit",
                            textAlign: "center",
                          }}
                        >
                          Product Video
                        </div>
                        <div
                          className="card-body embed-responsive "
                          style={{
                            width: "100%",
                            height: "100%",
                            minHeight: "300px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {/* Replace with an actual video player component */}
                          <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Product Video"
                            allowFullScreen
                            className="embed-responsive-item"
                            style={{
                              width: "100%",
                              height: "100%",
                              minHeight: "250px",
                            }}
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ... [Your product-reviews and pro-banner JSX - remove jQuery/inline scripts] ...  */}
              </div>
            </div>
          </div>
        </div>

        {/* ... [Your related products slider JSX - use Products table or adapt from Solitaires] ... */}
      </main>

      {/* ... [Your footer JSX - replace jQuery/inline scripts] ... */}
    </div>
  );
};

export default SolitaireDetails;
