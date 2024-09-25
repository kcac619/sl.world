import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Glide from "@glidejs/glide"; // Import Glide

// Import Glide CSS
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

import {
  getCartItemsFromLocalStorage,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../utils/cartfns";
import { Skeleton } from "@chakra-ui/react";

const Pair = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const [solitaires, setSolitaires] = useState([
    // Dummy data for two solitaires
    {
      SolitaireID: 1,
      SolitaireName: "Radiant-13",
      Slug: "radiant-13",
      ShapeName: "Radiant",
      Carat: 2.5,
      ColorName: "E",
      FluorName: "None",
      PurityName: "VS1",
      CutName: "Excellent",
      LabName: "GIA",
      PolishName: "Excellent",
      SymmetryName: "Very Good",
      LocationName: "New York",
      CertificateNumber: "123456789",
      UniqueCode: "RAD1234",
      Image1:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/1/1-1000x1000.png",
      Image2:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/1/2-1000x1000.png",
      Image3:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/2/1-1000x1000.png", // Add a third image
      Image4: null,
      Image5: null,
      PDFKey: "dummy.pdf",
      VideoKey: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      IsActive: true,
      Price: 9999.99, // Add a price
      BrandName: "Example Brand", // Add a brand name
    },
    {
      SolitaireID: 2,
      SolitaireName: "Emerald-8",
      Slug: "emerald-8",
      ShapeName: "Emerald",
      Carat: 1.8,
      ColorName: "D",
      FluorName: "Faint",
      PurityName: "VVS2",
      CutName: "Very Good",
      LabName: "IGI",
      PolishName: "Good",
      SymmetryName: "Excellent",
      LocationName: "London",
      CertificateNumber: "987654321",
      UniqueCode: "EME5678",
      Image1:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/11/1-1000x1000.png",
      Image2:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/11/2-1000x1000.png",
      Image3:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/12/1-1000x1000.png", // Add a third image
      Image4: null,
      Image5: null,
      PDFKey: "dummy.pdf",
      VideoKey: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      IsActive: true,
      Price: 6800.5, // Add a price
      BrandName: "Another Brand",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState([1, 1]); // Quantities for each solitaire
  const [cartItems, setCartItems] = useState([]);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [mainImageUrls, setMainImageUrls] = useState([null, null]);
  const [showSkeletons, setShowSkeletons] = useState([false, false]);

  const galleryRefs = [useRef(null), useRef(null)];

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

  // Function to remove item from cart and update state
  const handleRemoveFromCart = (solitaireId) => {
    removeFromCart(solitaireId);
    setCartItems(getCartItemsFromLocalStorage());
  };

  const handleSubmit = () => {
    console.log("submitted");
  };
  // Toggle the cart dropdown
  const toggleCartDropdown = () => {
    setCartDropdownOpen(!cartDropdownOpen);
  };

  // Initialize Glide for each solitaire
  useEffect(() => {
    solitaires.forEach((solitaire, index) => {
      if (galleryRefs[index].current) {
        new Glide(galleryRefs[index].current, {
          type: "carousel",
          perView: 4,
          gap: 10,
          rewind: false,
        }).mount();
      }
    });
  }, [solitaires]);

  // Set main image URLs when solitaires data changes
  useEffect(() => {
    setMainImageUrls(solitaires.map((solitaire) => solitaire.Image1));
  }, [solitaires]);

  const handleGalleryImageClick = (solitaireIndex, imageUrl) => {
    const newSkeletons = [...showSkeletons];
    newSkeletons[solitaireIndex] = true;
    setShowSkeletons(newSkeletons);

    setTimeout(() => {
      const newImageUrls = [...mainImageUrls];
      newImageUrls[solitaireIndex] = imageUrl;
      setMainImageUrls(newImageUrls);

      newSkeletons[solitaireIndex] = false;
      setShowSkeletons(newSkeletons);
    }, 300);
  };

  // Handle quantity changes
  const handleQuantityChange = (solitaireIndex, newQuantity) => {
    const newQuantities = [...quantities];
    newQuantities[solitaireIndex] = parseInt(newQuantity) || 1;
    setQuantities(newQuantities);
  };

  const increaseQuantity = (solitaireIndex) => {
    const newQuantities = [...quantities];
    newQuantities[solitaireIndex]++;
    setQuantities(newQuantities);
  };

  const decreaseQuantity = (solitaireIndex) => {
    const newQuantities = [...quantities];
    if (newQuantities[solitaireIndex] > 1) {
      newQuantities[solitaireIndex]--;
    }
    setQuantities(newQuantities);
  };
  const areSolitairesInCart = solitaires.map((solitaire) =>
    cartItems.some((item) => item.SolitaireID === solitaire.SolitaireID)
  );
  const handleAddToCart = (solitaireIndex) => {
    const solitaireToAdd = {
      ...solitaires[solitaireIndex],
      quantity: quantities[solitaireIndex],
    };
    addToCart(solitaireToAdd);
    setCartItems(getCartItemsFromLocalStorage());
  };

  // Calculate subtotal and total
  const subTotal = cartItems.reduce(
    (total, item) => total + item.Price * item.quantity,
    0
  );
  const total = subTotal; // For now, total is the same as subtotal

  return (
    <div>
      <Head>
        <title>Pair - Diamond Store</title>
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
                      <h4 style={{ opacity: 0.7 }}>
                        Monday - Friday: 8:00 AM - 9:00 PM
                      </h4>
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
                  <div
                    id="stamenu"
                    className={` ${isOpen ? "active" : ""} menu-fixed`}
                  >
                    <nav id="menu" className="navbar">
                      <div className="navbar-expand-md">
                        <button
                          type="button"
                          className="btn-navbar navbar-toggler"
                          onClick={toggleDrawer}
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
                      <div
                        id="mySidenav"
                        className={`sidenav menu-vertical ${
                          isOpen ? "open" : ""
                        }`}
                      >
                        <div id="under-menu" className="">
                          <div className="close-nav">
                            <span
                              className="categories"
                              style={{ color: "var(--main-color)" }}
                            >
                              Categories
                            </span>
                            <button
                              type="button"
                              className=" float-end"
                              onClick={toggleDrawer}
                            >
                              <i className="fa fa-close" />
                            </button>
                          </div>
                          <div className="navbar-collapse navbar-ex1-collapse">
                            <ul className="nav navbar-nav">
                              <li className="nav-item">
                                <Link href={"/solitaire"} className="nav-item">
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
                            </ul>
                          </div>
                        </div>
                      </div>
                    </nav>
                    <div
                      className="w3-overlay w3-animate-opacity"
                      onclick={toggleDrawer}
                      style={{
                        cursor: "pointer",
                        display: isOpen ? "block" : "none",
                      }}
                      id="myOverlay"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-5 head-manu">
                <div className="top-manu">
                  <div className="megamenu">
                    <div className="container_wb_megamenu">
                      <div
                        id="stamenu"
                        // className={` ${isOpen ? "active" : ""} menu-fixed`}
                      >
                        <nav id="menu" className="navbar">
                          <div className="navbar-expand-md">
                            <button
                              type="button"
                              className="btn-navbar navbar-toggler"
                              onClick={toggleDrawer}
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
                          <div
                            id="mySidenav"
                            className={`sidenav menu-vertical ${
                              isOpen ? "open" : ""
                            }`}
                          >
                            <div id="under-menu" className="">
                              <div className="close-nav">
                                <span
                                  className="categories"
                                  style={{ color: "var(--main-color)" }}
                                >
                                  Categories
                                </span>
                                <button
                                  type="button"
                                  className=" float-end"
                                  onClick={toggleDrawer}
                                >
                                  <i className="fa fa-close" />
                                </button>
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
                                </ul>
                              </div>
                            </div>
                          </div>
                        </nav>
                        <div
                          className="w3-overlay w3-animate-opacity"
                          onclick={toggleDrawer}
                          style={{
                            cursor: "pointer",
                            // display: isOpen ? "block" : "none",
                          }}
                          id="myOverlay"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 col-sm-2 text-left header-logo">
                <div id="logo">
                  <Link href="/">
                    <h4 style={{ color: "var(--main-color)" }}>HKSURANA</h4>
                  </Link>
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
                                backgroundColor: "rgb(33, 37, 41)", // Dark background color
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
                                                color: "var(--main-color)",
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
        <div className="container mt-5">
          <div
            className="row mt-2 mb-3"
            style={{ alignItems: "center", textAlign: "center" }}
          >
            <h1> Demo Pair Details</h1>
          </div>
          <div className="row">
            {/* Solitaire 1 */}
            {solitaires.map((solitaire, solitaireIndex) => (
              <div
                key={solitaire.SolitaireID}
                className={`col-lg-6 col-md-12 ${
                  solitaires.length === 1 ? "col-sm-12" : "col-sm-6" // Adjust column classes based on number of solitaires
                } mb-4`}
              >
                <div className="productbg p-bg">
                  <div className="container">
                    <div className="row">
                      <div
                        className={`col-lg-5 col-md-6 col-xs-12 zoom-left sticky t-50 ${
                          solitaires.length > 1 ? "order-lg-1 order-md-2" : ""
                        }`}
                      >
                        {/* Main Image */}
                        <div className="pro-bg">
                          <div className="image magnific-popup row">
                            <div className="col-md-12 col-sm-12 col-xs-12 big-img">
                              {mainImageUrls[solitaireIndex] ? (
                                <a
                                  href={mainImageUrls[solitaireIndex]}
                                  title={solitaire.SolitaireName}
                                >
                                  {/* Skeleton Overlay */}
                                  {showSkeletons[solitaireIndex] && (
                                    <Skeleton
                                      startColor="brown.300"
                                      endColor="gray.500"
                                      className="img-thumbnail img-fluid"
                                      height="100%"
                                      minWidth={"350px"}
                                      minHeight={"350px"}
                                      opacity={100}
                                      zIndex="5"
                                    />
                                  )}

                                  <img
                                    id={`img_01_${solitaireIndex}`} // Unique ID
                                    src={mainImageUrls[solitaireIndex]}
                                    data-zoom-image={
                                      mainImageUrls[solitaireIndex]
                                    }
                                    title={solitaire.SolitaireName}
                                    alt={solitaire.SolitaireName}
                                    className="img-thumbnail img-fluid"
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      maxWidth: "400px",
                                      display: "block",
                                      boxShadow:
                                        "4px 4px 4px 4px rgb(0,0,0,0.3)",
                                      borderRadius: "20px",
                                      zIndex: "1",
                                    }}
                                  />
                                </a>
                              ) : (
                                <div>Loading image...</div>
                              )}
                            </div>

                            {/* Gallery Images */}
                            <div
                              className="col-md-12 col-sm-12 col-xs-12 mt-3"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div
                                style={{ width: "100%" }}
                                ref={galleryRefs[solitaireIndex]}
                              >
                                <div className="glide">
                                  <div
                                    className="glide__track"
                                    data-glide-el="track"
                                  >
                                    <ul className="glide__slides">
                                      {[
                                        solitaire.Image1,
                                        solitaire.Image2,
                                        solitaire.Image3,
                                        solitaire.Image4,
                                        solitaire.Image5,
                                      ]
                                        .filter(Boolean)
                                        .map((imageUrl, index) => (
                                          <li
                                            key={index}
                                            className="glide__slide"
                                          >
                                            <a
                                              href="#"
                                              title={solitaire.SolitaireName}
                                            >
                                              <img
                                                src={imageUrl}
                                                onClick={() =>
                                                  handleGalleryImageClick(
                                                    solitaireIndex,
                                                    imageUrl
                                                  )
                                                }
                                                alt={`Gallery Image ${
                                                  index + 1
                                                }`}
                                                style={{
                                                  width: "100%",
                                                  height: "auto",
                                                  maxWidth: "100px",
                                                  border: "1px solid #ccc",
                                                  padding: "5px",
                                                  borderRadius: "5px",
                                                }}
                                              />
                                            </a>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                  {/* Navigation Arrows (moved and styled) */}
                                  <div
                                    className="glide__arrows"
                                    data-glide-el="controls"
                                    style={{
                                      position: "absolute",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <button
                                      className="glide__arrow glide__arrow--left"
                                      data-glide-dir="<"
                                      style={{
                                        backgroundColor: "rgb(0,0,0,0.2)",
                                        border: "none",
                                        padding: "10px",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-chevron-left fa-lg text-dark"></i>
                                    </button>
                                    <button
                                      className="glide__arrow glide__arrow--right"
                                      data-glide-dir=">"
                                      style={{
                                        backgroundColor: "rgb(0,0,0,0.2)",
                                        border: "none",
                                        padding: "10px",
                                        borderRadius: "40%",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-chevron-right fa-lg text-dark"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div
                        className={`col-lg-7 col-md-6 col-xs-12 pro-content t-50 ${
                          solitaires.length > 1 ? "order-lg-2 order-md-1" : ""
                        }`}
                      >
                        {/* ... [Your pro-content JSX, using solitaire data] ... */}

                        <h1>{solitaire.SolitaireName}</h1>
                        {/* ... [Your products-specific and product JSX] ... */}
                        <div
                          className="products-specific"
                          style={{ fontFamily: "outfit" }}
                        >
                          <ul className="list-unstyled">
                            <li className="d-flex align-items-center">
                              {/* Use flexbox for alignment */}
                              <i className="fas fa-gem mr-2" />      
                              {/* Icon column - adjust icon class */}
                              <span className="text-decor">Shape:</span>{" "}
                              {solitaire.ShapeName}
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="fas fa-balance-scale-left mr-2" />{" "}
                                  
                              {/* Adjust icon class */}
                              <span className="text-decor">Carat:</span>{" "}
                              {solitaire.Carat}
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="fas fa-palette mr-2" />      
                              {/* Adjust icon class */}
                              <span className="text-decor">Color:</span>{" "}
                              {solitaire.ColorName}
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="fas fa-search-plus mr-2" />      
                              {/* Adjust icon class */}
                              <span className="text-decor">Clarity:</span>{" "}
                              {solitaire.PurityName}
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="fas fa-map-marker-alt mr-2" />      
                              {/* Adjust icon class */}
                              <span className="text-decor">Location:</span>{" "}
                              {solitaire.LocationName}
                            </li>
                          </ul>

                          <ul className="list-unstyled">
                            <li className="d-flex align-items-center">
                              <i className="fas fa-cut mr-2" />      
                              {/* Adjust icon class */}
                              <span className="text-decor">Cut:</span>{" "}
                              {solitaire.CutName}
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="fas fa-flask mr-2" />      
                              {/* Adjust icon class */}
                              <span className="text-decor">Lab:</span>{" "}
                              {solitaire.LabName}
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="fas fa-magic mr-2" />      
                              {/* Adjust icon class */}
                              <span className="text-decor">Polish:</span>{" "}
                              {solitaire.PolishName}
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="fas fa-arrows-alt-h mr-2" />      
                              {/* Adjust icon class */}
                              <span className="text-decor">Symmetry:</span>{" "}
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
                                  disabled={quantities[solitaireIndex] === 1}
                                  onClick={() =>
                                    decreaseQuantity(solitaireIndex)
                                  }
                                >
                                  <span className="fa fa-minus"></span>
                                </button>
                                <input
                                  id={`input-quantity-${solitaireIndex}`}
                                  type="text"
                                  name="quantity"
                                  value={quantities[solitaireIndex]}
                                  size="2"
                                  className="form-control input-number pull-left"
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      solitaireIndex,
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  className="form-control pull-left btn-number btnplus"
                                  onClick={() =>
                                    increaseQuantity(solitaireIndex)
                                  }
                                >
                                  <span className="fa fa-plus"></span>
                                </button>
                                <div
                                  id={`error-quantity-${solitaireIndex}`}
                                  className="form-text"
                                ></div>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="pro-price">
                              <ul className="list-unstyled">
                                <li className="text-decor-bold">
                                  <h2>
                                    <span
                                      className="price-new"
                                      style={{
                                        fontFamily: "outfit",
                                        fontWeight: "200",
                                      }}
                                    >
                                      $999{solitaire.Price}
                                    </span>
                                  </h2>
                                </li>
                              </ul>
                            </div>

                            {/* Add to Cart Button */}
                            <div className="qty-flex">
                              {areSolitairesInCart[solitaireIndex] ? ( // Check if this solitaire is in the cart
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <button
                                    className="btn btn-primary btn-lg btn-block text-success"
                                    style={{
                                      marginRight: "10px",
                                      display: "flex",
                                      alignItems: "center",
                                      scale: "0.7",
                                    }}
                                    disabled
                                  >
                                    Already in cart!
                                  </button>
                                  <Link
                                    href="/cart"
                                    className="btn btn-primary btn-lg btn-block"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      scale: "0.7",
                                    }}
                                  >
                                    Open Cart
                                    <img
                                      alt="stor-bg"
                                      src="image/catalog/stor-bg.svg"
                                      style={{ marginLeft: "5px" }}
                                    />
                                  </Link>
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleAddToCart(solitaireIndex)
                                  }
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
                        {/*  PDF and Video Panels (Dummy Data) */}
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="row">
                        {/* PDF Panel */}
                        <div className="col-md-12">
                          <div className="card">
                            <div
                              className="card-header"
                              style={{
                                color: "var(--main-color)",
                                fontFamily: "outfit",
                                textAlign: "center",
                              }}
                            >
                              Product Certificate (PDF)
                            </div>
                            <div className="card-body embed-responsive embed-responsive-4by3">
                              <iframe
                                src="/pdf/dummy.pdf"
                                title="Product Certificate"
                                className="embed-responsive-item"
                              ></iframe>
                            </div>
                          </div>
                        </div>

                        {/* Video Panel */}
                        <div className="col-md-12">
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
                                color: "var(--main-color)",
                                fontFamily: "outfit",
                                textAlign: "center",
                              }}
                            >
                              Product Video
                            </div>
                            <div
                              className="card-body embed-responsive embed-responsive-16by9"
                              style={{
                                width: "100%",
                                height: "100%",
                                minHeight: "300px",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
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
                  </div>
                </div>

                {/* ... [Your product-reviews and pro-banner JSX - remove jQuery/inline scripts] ...  */}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ... [Your footer JSX - replace jQuery/inline scripts] ... */}
    </div>
  );
};

export default Pair;
