// pages/index.js
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, resetFilters } from "../filterSlice";
import {
  Box,
  Flex,
  Heading,
  Button,
  SimpleGrid,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  useBreakpointValue,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import Image from "next/image";
import vercel from "../public/next.svg";
import Link from "next/link";
// Components
import Sidebar from "../components/Sidebar";
import DiamondShape from "../components/DiamondShape";
import FilterSection from "../components/FilterSection";
import SearchBar from "@/components/SearchBar";
// Data
import {
  diamondShapes,
  caratOptions,
  fluorOptions,
  cutOptions,
  polishOptions,
  colorOptions,
  clarityOptions,
  labOptions,
  symmOptions,
  locationOptions,
} from "@/lib/dummyData";

const Solitaire = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const filtersFromRedux = useSelector((state) => state.filters); // Get filters from Redux store
  const [shapes, setShapes] = useState([]);
  const [loadingShapes, setLoadingShapes] = useState(true);

  const sidebarWidth = useBreakpointValue({
    base: "60px",
    md: isSidebarOpen ? "200px" : "60px",
  });

  const sidebarContainerRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setSelectedFilters(filtersFromRedux);
  }, [filtersFromRedux]);

  useEffect(() => {
    const fetchShapes = async () => {
      try {
        const res = await fetch("/api/shapes");
        const data = await res.json();
        console.log(data);
        if (data) {
          setShapes(data.shapes);
        }
      } catch (error) {
        console.error("Error fetching shapes:", error);
        // Handle error (e.g., show an error message)
      } finally {
        setLoadingShapes(false);
      }
    };

    fetchShapes();
  }, []);

  useEffect(() => {
    if (sidebarWidth !== "60px") {
      onClose();
    }
  }, [sidebarWidth, onClose]);

  const [selectedFilters, setSelectedFilters] = useState({
    carat: [],
    fluor: [],
    cut: [],
    polish: [],
    color: [],
    clarity: [],
    lab: [],
    symm: [],
    location: [],
    shape: [], // Make sure 'shape' is in your selectedFilters
  });

  const filters = {
    // Define the filters object
    carat: selectedFilters.carat,
    fluor: selectedFilters.fluor,
    cut: selectedFilters.cut,
    polish: selectedFilters.polish,
    color: selectedFilters.color,
    clarity: selectedFilters.clarity,
    lab: selectedFilters.lab,
    symm: selectedFilters.symm,
    location: selectedFilters.location,
    shape: selectedFilters.shape,
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const filterValues = prevFilters[filterType] || [];

      const isValueSelected = filterValues.includes(value);

      const updatedFilterValues = isValueSelected
        ? filterValues.filter((val) => val !== value)
        : [...filterValues, value];

      return {
        ...prevFilters,
        [filterType]: updatedFilterValues,
      };
    });
  };
  useEffect(() => {
    console.log("Selected Filters:", selectedFilters);
  }, [selectedFilters]);

  const handleSearch = () => {
    console.log("Search Filters:", selectedFilters);

    dispatch(
      setFilter({
        filterType: "carat",
        values: selectedFilters.carat,
      })
    );
    dispatch(
      setFilter({
        filterType: "fluor",
        values: selectedFilters.fluor,
      })
    );
    dispatch(
      setFilter({
        filterType: "length",
        values: selectedFilters.length,
      })
    );
    dispatch(
      setFilter({
        filterType: "polish",
        values: selectedFilters.polish,
      })
    );
    dispatch(
      setFilter({
        filterType: "color",
        values: selectedFilters.color,
      })
    );
    dispatch(
      setFilter({
        filterType: "clarity",
        values: selectedFilters.clarity,
      })
    );
    dispatch(
      setFilter({
        filterType: "lab",
        values: selectedFilters.lab,
      })
    );
    dispatch(
      setFilter({
        filterType: "symm",
        values: selectedFilters.symm,
      })
    );
    dispatch(
      setFilter({
        filterType: "location",
        values: selectedFilters.location,
      })
    );
    dispatch(
      setFilter({
        filterType: "shape",
        values: selectedFilters.shape,
      })
    );
    // Add your search logic here
    if (session) {
      // Authenticated user - redirect to the "search results" page
      router.push({
        pathname: "/search", // Or your desired results page
        query: filters, // Pass filters in the query string
      });
    } else {
      // Unauthenticated user - redirect to login with callback URL
      router.push({
        pathname: "/auth/login",
        query: { callbackUrl: router.asPath }, // Pass current URL as callback
      });
    }
  };

  const handleNavigation = () => {
    if (session) {
      if (session.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <Box backgroundColor={"transparent"}>
      {/* Header */}
      {/* <Flex
        backgroundColor="blue.700"
        p={2}
        align="center"
        position={"-webkit-sticky"}
        top={0}
        right={0}
        ml={{ base: 0, md: isSidebarOpen ? "205px" : "50px" }}
        transition="margin-left 0.3s, width 0s"
        overflowX={"hidden"}
        width={{
          base: "100%",
          md: isSidebarOpen ? "calc(100% - 205px)" : "calc(100% - 50px)",
        }}
        zIndex={100}
        // width="100%"
        justifyContent="space-between" // Add justifyContent
      >
        <Flex align="center">
          {" "}
          {/* Wrap HamburgerIcon and Image in a Flex */}
      {/* <HamburgerIcon
            display={{ base: "block", md: "none" }}
            onClick={onOpen}
            color={"white"}
          />
          <Image
            src={vercel}
            alt="Logo"
            width={100}
            height={50}
            style={{ marginLeft: "20px", marginRight: "20px" }}
          />
          <SearchBar />
        </Flex> */}
      {/* {session ? (
          <Button colorScheme={"blackAlpha"} onClick={() => signOut()}>
            Logout
          </Button>
        ) : (
          <Button
            // mr={50}
            colorScheme="whiteAlpha"
            onClick={() => {
              dispatch(
                setFilter({
                  filterType: "carat",
                  values: selectedFilters.carat,
                })
              );
              dispatch(
                setFilter({
                  filterType: "fluor",
                  values: selectedFilters.fluor,
                })
              );
              dispatch(
                setFilter({
                  filterType: "length",
                  values: selectedFilters.length,
                })
              );
              dispatch(
                setFilter({
                  filterType: "polish",
                  values: selectedFilters.polish,
                })
              );
              dispatch(
                setFilter({
                  filterType: "color",
                  values: selectedFilters.color,
                })
              );
              dispatch(
                setFilter({
                  filterType: "clarity",
                  values: selectedFilters.clarity,
                })
              );
              dispatch(
                setFilter({
                  filterType: "lab",
                  values: selectedFilters.lab,
                })
              );
              dispatch(
                setFilter({
                  filterType: "symm",
                  values: selectedFilters.symm,
                })
              );
              dispatch(
                setFilter({
                  filterType: "location",
                  values: selectedFilters.location,
                })
              );
              dispatch(
                setFilter({
                  filterType: "shape",
                  values: selectedFilters.shape,
                })
              );

              router.push({
                pathname: "/auth/login",
                query: { callbackUrl: router.asPath },
              });
            }}
          >
            Login
          </Button>
        )}
      </Flex>  */}
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
                            >
                              <div className="xuser">
                                <img src="image/catalog/hcart.svg" alt="cart" />
                              </div>
                              <span className="cartl">
                                <span className="cartt">0</span>
                                <span className="cartna">cart: items</span>
                                <strong>$0.00usd</strong>
                              </span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-right">
                              <li>
                                <p className="text-center">
                                  Your shopping cart is empty!
                                </p>
                              </li>
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

      <Flex ref={sidebarContainerRef} mt={0}>
        {/* Drawer (Mobile) */}
        {/* <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          size="xs"
          // display={{ base: "block", md: "none", lg: "none" }}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Sidebar isOpen={isOpen} onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer> */}

        {/* Sidebar (Desktop) */}
        {/* <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          onOpen={onOpen}
          top={0}
          width={sidebarWidth}
          display={{ base: "none", md: "block" }}
        /> */}

        {/* Main Content Area */}
        <Box
          flex="1"
          // transform={{
          //   base: "scale(0.9)",
          //   md: "scale(0.9)",
          //   lg: "scale(0.9)",
          // }}
          m={5}
          p={4}
          borderRadius={"20px"}
          backgroundColor={"transparent"}
          ml={{ base: 0, md: isSidebarOpen ? "205px" : "50px" }}
          overflowX="hidden"
          transition="margin-left 0.3s"
          fontFamily="outfit"
        >
          {/* Diamond Shape Section */}
          <Box mb={6}>
            <Heading as="h2" size="md" color="#F2DFCF" mb={5}>
              Shape
            </Heading>
            {loadingShapes ? (
              <Text color="#f2dfcf">Loading shapes...</Text>
            ) : (
              <SimpleGrid columns={{ base: 4, md: 8, lg: 12 }} spacing={4}>
                {shapes ? (
                  shapes.map((shape) => (
                    <DiamondShape
                      key={shape.ShapeID}
                      shape={shape}
                      isSelected={selectedFilters.shape.includes(shape.ShapeID)}
                      onClick={() => {
                        handleFilterChange("shape", shape.ShapeID); // Use handleFilterChange
                      }}
                    />
                  ))
                ) : (
                  <span color="#f2dfcf">error fetching shapes</span>
                )}
              </SimpleGrid>
            )}
          </Box>

          <hr style={{ color: "#f2dfcf" }} />

          {/* Filters Section - Using Grid for two-column layout */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            {/* Column 1 */}
            <GridItem>
              <FilterSection
                label="Carat"
                options={caratOptions}
                selectedValues={selectedFilters.carat}
                onFilterChange={(value) => handleFilterChange("carat", value)}
              />
              <FilterSection
                label="Fluor."
                options={fluorOptions}
                selectedValues={selectedFilters.fluor}
                onFilterChange={(value) => handleFilterChange("fluor", value)}
              />
              <FilterSection
                label="Cut"
                options={cutOptions}
                selectedValues={selectedFilters.cut}
                onFilterChange={(value) => handleFilterChange("cut", value)}
              />
              <FilterSection
                label="Polish"
                options={polishOptions}
                selectedValues={selectedFilters.polish}
                onFilterChange={(value) => handleFilterChange("polish", value)}
              />
            </GridItem>

            {/* Column 2 */}
            <GridItem>
              <Box mb={4}>
                <Text
                  fontWeight="bold"
                  mb={2}
                  fontFamily="Playfair Display"
                  color="#f2dfcf"
                >
                  Color
                </Text>
                <FilterSection
                  options={colorOptions}
                  selectedValues={selectedFilters.color}
                  onFilterChange={(value) => handleFilterChange("color", value)}
                />
              </Box>
              <Box mb={4}>
                <Text
                  fontWeight="bold"
                  mb={2}
                  fontFamily="Playfair Display"
                  color="#f2dfcf"
                >
                  Clarity
                </Text>
                <FilterSection
                  options={clarityOptions}
                  selectedValues={selectedFilters.clarity}
                  onFilterChange={(value) =>
                    handleFilterChange("clarity", value)
                  }
                />
              </Box>
              <Box mb={4}>
                <Text
                  fontWeight="bold"
                  mb={2}
                  fontFamily="Playfair Display"
                  color="#f2dfcf"
                >
                  Lab
                </Text>
                <FilterSection
                  options={labOptions}
                  selectedValues={selectedFilters.lab}
                  onFilterChange={(value) => handleFilterChange("lab", value)}
                />
              </Box>
              <Box mb={4}>
                <Text
                  fontWeight="bold"
                  mb={2}
                  fontFamily="Playfair Display"
                  color="#f2dfcf"
                >
                  Symmerty
                </Text>
                <FilterSection
                  options={symmOptions}
                  selectedValues={selectedFilters.symm}
                  onFilterChange={(value) => handleFilterChange("symm", value)}
                />
              </Box>
              <Box mb={4}>
                <Text
                  fontWeight="bold"
                  mb={2}
                  fontFamily="Playfair Display"
                  color="#f2dfcf"
                >
                  Location
                </Text>
                <FilterSection
                  options={locationOptions}
                  selectedValues={selectedFilters.location}
                  onFilterChange={(value) =>
                    handleFilterChange("location", value)
                  }
                />
              </Box>
            </GridItem>
          </Grid>

          <Button
            backgroundColor="#f2dfcf"
            color="#0d1e1c"
            size="sm"
            mt={4}
            mb={6}
            borderRadius="20px"
            onClick={handleSearch}
          >
            Show Advance Filters
          </Button>

          {/* Search Buttons */}
          <Flex mt={6} justify="flex-end">
            <Button
              backgroundColor="#f2dfcf"
              color="#0d1e1c"
              mr={2}
              borderRadius="20px"
            >
              Cancel
            </Button>
            <Button
              backgroundColor="#f2dfcf"
              color="#0d1e1c"
              mr={2}
              borderRadius="20px"
              onClick={() => {
                dispatch(resetFilters()); // Reset filters in Redux store
              }}
            >
              Reset
            </Button>
            <Button
              backgroundColor="#f2dfcf"
              color="#0d1e1c"
              borderRadius="20px"
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </Button>
            <Button
              backgroundColor="#f2dfcf"
              color="#0d1e1c"
              ml={2}
              borderRadius="20px"
              rightIcon={<ChevronDownIcon />}
              onClick={handleSearch} // Redirect on "Save Search"
            >
              Save Search
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Solitaire;
