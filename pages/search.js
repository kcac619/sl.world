import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import {
  getCartItemsFromLocalStorage,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../utils/cartfns";

const SearchResults = () => {
  const router = useRouter();
  const filters = useSelector((state) => state.filters);
  const [solitaires, setSolitaires] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllSolitaires, setShowAllSolitaires] = useState(false);
  const [error, setError] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // To track total pages
  const [isFetching, setIsFetching] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const solitairesPerPage = 15;
  const [cartItems, setCartItems] = useState([]);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false); // For dropdown
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
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

  const handleAddToCart = (solitaire) => {
    addToCart({ ...solitaire, quantity: 1 });
    setCartItems(getCartItemsFromLocalStorage());
  };

  const fetchSolitaires = async (pageNumber = currentPage) => {
    // if (isFetching) return;
    setIsLoading(true);
    setShowLoading(true);
    // setIsFetching(true);
    try {
      const response = await axios.get("/api/searchsolitaire", {
        params: {
          pageNumber: pageNumber,
          pageSize: solitairesPerPage,
        },
      });
      // console.log("response", response);
      if (response.data.statusid === 1) {
        console.log("solitaires", response.data.solitaires);
        setSolitaires((prevSolitaires) => [
          ...prevSolitaires,
          ...response.data.solitaires,
        ]);
        // console.log("after set solitaires", solitaires);
        // setTotalPages(
        //   Math.ceil(Number(response.data.totalcount) / solitairesPerPage)
        // );
      }
    } catch (error) {
      console.error("Error fetching solitaires:", error);
      setError("Error fetching solitaires. Please try again later.");
    } finally {
      setIsLoading(false);
      setShowLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setShowLoading(true);
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPage, showAllSolitaires]);

  useEffect(() => {
    // Clear callbackUrl from query parameters
    if (router.query.callbackUrl) {
      router.replace(
        {
          pathname: router.pathname,
          query: {}, // Remove all query parameters
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router]); // Run this effect when the router changes

  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    // if (!hasFetchedData) {
    // Only fetch if data hasn't been fetched yet
    fetchSolitaires();
    // setHasFetchedData(true);
    // }
  }, []);

  const isSolitaireMatch = (solitaire) => {
    const caratMatch = filters.carat.some((caratValue) => {
      if (typeof caratValue === "number") {
        return solitaire.Carat <= caratValue;
      }
      return false;
    });

    const validFilters = Object.fromEntries(
      Object.entries(filters).map(([key, values]) => [
        key,
        Array.isArray(values) && values.length > 0
          ? values.filter((value) => value !== undefined)
          : values,
      ])
    );

    const shapeMatch =
      validFilters.shape.length > 0 &&
      validFilters.shape.includes(solitaire.ShapeName);
    const colorMatch =
      validFilters.color.length > 0 &&
      validFilters.color.includes(solitaire.ColorName);
    const fluorMatch =
      validFilters.fluor.length > 0 &&
      validFilters.fluor.includes(solitaire.FluorName);
    const clarityMatch =
      validFilters.clarity.length > 0 &&
      validFilters.clarity.includes(solitaire.PurityName);
    const cutMatch =
      validFilters.cut.length > 0 &&
      validFilters.cut.includes(solitaire.CutName);
    const labMatch =
      validFilters.lab.length > 0 &&
      validFilters.lab.includes(solitaire.LabName);
    const polishMatch =
      validFilters.polish.length > 0 &&
      validFilters.polish.includes(solitaire.PolishName);
    const symmMatch =
      validFilters.symm.length > 0 &&
      validFilters.symm.includes(solitaire.SymmetryName);
    const locationMatch =
      validFilters.location.length > 0 &&
      validFilters.location.includes(solitaire.LocationName);

    return (
      caratMatch ||
      shapeMatch ||
      colorMatch ||
      fluorMatch ||
      clarityMatch ||
      cutMatch ||
      labMatch ||
      polishMatch ||
      symmMatch ||
      locationMatch
    );
  };

  // Filter solitaires after fetching
  const matchedSolitaires = solitaires.filter(isSolitaireMatch);
  const indexOfLastSolitaire = currentPage * solitairesPerPage;
  const indexOfFirstSolitaire = indexOfLastSolitaire - solitairesPerPage;
  const currentSolitaires = showAllSolitaires
    ? solitaires.slice(indexOfFirstSolitaire, indexOfLastSolitaire)
    : matchedSolitaires.slice(indexOfFirstSolitaire, indexOfLastSolitaire);

  const handleSort = (column) => {
    // ... [Your existing sorting logic] ...
  };

  // const fetchNextPage = () => {
  //   if (currentPage < totalPages && hasFetchedData && !isFetching) {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //     fetchSolitaires(currentPage + 1);
  //   }
  // };

  // // Scroll to bottom listener for lazy loading
  // const scrollRef = useRef(null);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (scrollRef.current) {
  //       const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;

  //       console.log("Scroll Top:", scrollTop);
  //       console.log("Client Height:", clientHeight);
  //       console.log("Scroll Height:", scrollHeight);

  //       // Check if the user has scrolled within a certain distance from the bottom
  //       const threshold = 10; // Adjust this threshold as needed

  //       // Set the isNearBottom flag when near the bottom
  //       if (scrollHeight - scrollTop - clientHeight <= threshold) {
  //         setIsNearBottom(true);
  //         setTotalPages((prevTotalPages) => prevTotalPages + 1);
  //       } else {
  //         setIsNearBottom(false);
  //       }
  //     }
  //   };

  //   if (scrollRef.current) {
  //     scrollRef.current.addEventListener("scroll", handleScroll);

  //     return () => {
  //       if (scrollRef.current) {
  //         scrollRef.current.removeEventListener("scroll", handleScroll);
  //       }
  //     };
  //   }
  // }, []); // No dependencies needed here

  // useEffect for fetching next page
  // useEffect(() => {
  //   if (
  //     isNearBottom &&
  //     currentPage < totalPages &&
  //     hasFetchedData &&
  //     !isFetching
  //   ) {
  //     console.log("Reached the bottom! Fetching next page...");
  //     fetchNextPage();
  //   }
  // }, [isNearBottom]);

  const uniqueSolitaires = matchedSolitaires.reduce((acc, solitaire) => {
    if (!acc.some((item) => item.SolitaireID === solitaire.SolitaireID)) {
      acc.push(solitaire);
    }
    return acc;
  }, []);

  const uniqueAllSolitaires = solitaires.reduce((acc, solitaire) => {
    if (!acc.some((item) => item.SolitaireID === solitaire.SolitaireID)) {
      acc.push(solitaire);
    }
    return acc;
  }, []);

  const handleMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchSolitaires(currentPage + 1);
  };

  // console.log(" matched  solitaires", matchedSolitaires);
  return (
    <div style={{ width: "100vw" }}>
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
                              style={{ color: "#20C997" }}
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
                                  style={{ color: "#20C997" }}
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
                                                color: "#20C997",
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
      <div
        className="container mt-5"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0px",
        }}
      >
        <h1 className="mb-4 text-white" style={{ textAlign: "center" }}>
          Search Results
        </h1>
        {isLoading && <p className="text-center text-white">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row" style={{ overflowY: "auto" }}>
          {/* Skeleton While Loading */}
          {showLoading && (
            <div className="row">
              {[...Array(solitairesPerPage)].map((_, index) => (
                <div key={index} className="col-md-3 col-lg-2 mb-4">
                  <div className="product-block cless">
                    <div className="blogshadow blog-thumbnail">
                      <div className="card-body">
                        <Skeleton height="150px" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!showLoading &&
            (showAllSolitaires ? uniqueAllSolitaires : uniqueSolitaires).map(
              (solitaire) => (
                <div
                  key={solitaire.SolitaireID}
                  className="col-6 col-sm-6 col-md-3 col-lg-3 mb-4"
                >
                  <div className="product-block cless">
                    <div className="blogshadow blog-thumbnail">
                      <div className="blog-left">
                        <div
                          className="workdo-blog-image"
                          style={{
                            height: "201px",
                            display: "flex",
                            overflow: "hidden",
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px",
                            backgroundColor: "#ffffff",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {solitaire.Image1 && (
                            <img
                              src={solitaire.Image1}
                              alt={`Solitaire  ${solitaire.SolitaireID}`}
                              className="img-fluid"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          )}
                          <div className="blog-post-image-hover"></div>
                        </div>
                      </div>
                      <div className="blog-right">
                        <h4>
                          <a href="#">Shape: {solitaire.ShapeName}</a>
                        </h4>
                        <div className="blog-desc">
                          {/* <p className="card-text">Shape: {solitaire.ShapeName}</p> */}
                          <p className="card-text">Carat: {solitaire.Carat}</p>
                          <p className="card-text">
                            Description: Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.
                          </p>
                        </div>
                        <div className="blog-date blog-bottom">
                          <div className="read_link">
                            <Link
                              href={`/${solitaire.Slug}`}
                              className="btn btn-primary read_more"
                            >
                              Get Details
                            </Link>
                          </div>
                          {/*  Add to Cart Button with isInCart Logic  */}
                          {/* {cartItems.some(
                            (item) => item.SolitaireID === solitaire.SolitaireID
                          ) ? (
                            <button
                              className="btn btn-primary"
                              disabled
                              style={{ fontSize: "0.7rem" }}
                            >
                              Added to Cart
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={() => handleAddToCart(solitaire)}
                            >
                              Add to Cart
                            </button>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          {console.log("current page", currentPage, "total pages", totalPages)}
          {!showLoading &&
            currentPage === totalPages &&
            solitaires.length > 0 && (
              <div className="col-md-12 text-center mt-4">
                <p
                  className="text-muted small"
                  style={{ fontFamily: "outfit" }}
                >
                  No more solitaires to show.
                </p>
              </div>
            )}
        </div>
        {/* "No Results" Message */}

        {!showLoading && solitaires.length === 0 && (
          <div className="col-md-12">
            <p className="alert alert-warning">NO MATCHING SOLITAIRE FOUND</p>
          </div>
        )}
        {/* "More" Button */}
        {
          <div className="row mt-3">
            <div className="col-md-12 text-center">
              <button
                onClick={handleMoreClick}
                style={{
                  backgroundColor: "#20C997",
                  color: "#f2dfcf",
                  borderRadius: "20px",
                  fontFamily: "Outfit, sans-serif",
                }}
                className="btn btn-secondary"
              >
                More <ChevronDownIcon />
              </button>
            </div>
          </div>
        }
        {/* Toggle Button (Removed Pagination) */}
        <div className="row mt-3">
          <div className="col-md-4">
            <button
              onClick={() => setShowAllSolitaires(!showAllSolitaires)}
              className="btn btn-secondary btn-block"
              style={{
                backgroundColor: "#20C997",
                color: "#f2dfcf",
                borderRadius: "20px",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              {showAllSolitaires
                ? "Hide All Solitaires"
                : "View All Solitaires"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
