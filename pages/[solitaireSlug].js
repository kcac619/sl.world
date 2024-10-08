import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Link from "next/link"; // For routing
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
import Header from "@/components/Header";

const SolitaireDetails = () => {
  const router = useRouter();
  const { solitaireSlug } = router.query;

  const [solitaire, setSolitaire] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [mainImageUrl, setMainImageUrl] = useState(
    solitaire ? solitaire.Image1 : null
  ); // State to manage main image URL
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleGalleryImageClick = (imageUrl) => {
    setShowSkeleton(true); // Show Skeleton before image change
    setTimeout(() => {
      setMainImageUrl(imageUrl);
      setShowSkeleton(false); // Hide Skeleton after image loads
    }, 300); // Adjust delay as needed
  };
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
  const galleryRef = useRef(null);
  useEffect(() => {
    if (galleryRef.current && solitaire) {
      // Initialize Glide after the component renders and data is fetched
      new Glide(galleryRef.current, {
        type: "carousel",
        perView: 4, // Number of slides to show per view
        gap: 10, // Spacing between slides
        rewind: false, // Prevent looping to the beginning
        // ... [Add other Glide options as needed] ...
      }).mount();
    }
  }, [solitaire]);

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
    if (solitaireSlug) {
      fetchSolitaireDetails(solitaireSlug);
    }
  }, [solitaireSlug]);
  useEffect(() => {
    if (solitaire) {
      setMainImageUrl(solitaire.Image1); // Set main image after solitaire data is fetched
    }

    if (galleryRef.current) {
      const slides = galleryRef.current.querySelectorAll(".glide__slide");
      slides.forEach((slide) => {
        slide.addEventListener("click", (event) => {
          // Find the image URL from the clicked slide
          const clickedImageUrl = event.currentTarget.querySelector("img").src;
          handleGalleryImageClick(clickedImageUrl);
        });
      });
    }
  }, [solitaire]);

  const fetchSolitaireDetails = async (slug) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/solitairebySlug/${slug}`);

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
    return <div style={{ color: "#20C997" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "#20C997" }}>Error: {error}</div>;
  }

  if (!solitaire) {
    return <div style={{ color: "#20C997" }}>Solitaire not found.</div>;
  }
  const gallerySettings = {
    dots: false,
    infinite: false, // Don't repeat if only a few images
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true, // Center the active image
    responsive: [
      // ... [Your responsive settings if needed] ...
    ],
  };

  // Collect image URLs from solitaire data
  const galleryImages = [
    solitaire.Image1,
    solitaire.Image2,
    solitaire.Image3,
    solitaire.Image4,
    solitaire.Image5,
  ].filter(Boolean);

  return (
    <div>
      <Head>
        <title>{solitaire.SolitaireName}</title>
        {/* ... [Add other meta tags] ... */}
      </Head>

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
                              {/* Main Image (Dynamically Updated) */}
                              {mainImageUrl && ( // Only render image when URL is available
                                <a
                                  href={mainImageUrl}
                                  title={solitaire.ProductName}
                                >
                                  {/* Skeleton Overlay */}
                                  {showSkeleton ? (
                                    <Skeleton
                                      startColor="brown.300"
                                      endColor="gray.500"
                                      className="img-thumbnail img-fluid"
                                      height="100%"
                                      minWidth={"350px"}
                                      minHeight={"350px"}
                                      opacity={100}
                                      zIndex="5" // Ensure Skeleton is on top
                                    />
                                  ) : (
                                    <img
                                      id="img_01"
                                      src={mainImageUrl}
                                      data-zoom-image={mainImageUrl}
                                      title={solitaire.ProductName}
                                      alt={solitaire.ProductName}
                                      className="img-thumbnail img-fluid"
                                      style={{
                                        width: "100%",
                                        height: "auto",
                                        maxWidth: "400px", // Set a maximum width for the image
                                        display: "block", // Make sure the image is a block element
                                        boxShadow:
                                          "4px 4px 4px 4px rgb(0,0,0,0.3)",
                                        borderRadius: "20px",
                                        zIndex: "1",
                                      }}
                                    />
                                  )}
                                </a>
                              )}
                            </div>
                            {/*  Smaller Gallery Images (using CSS Grid)  */}
                            <div
                              className="col-md-12 col-sm-12 col-xs-12 mt-3"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div style={{ width: "100%" }} ref={galleryRef}>
                                {" "}
                                {/* Attach the ref to the container */}
                                <div className="glide">
                                  <div
                                    className="glide__track"
                                    data-glide-el="track"
                                  >
                                    <ul className="glide__slides">
                                      {galleryImages.map((imageUrl, index) => (
                                        <li
                                          key={index}
                                          className="glide__slide"
                                        >
                                          <a
                                            href="#"
                                            title={solitaire.ProductName}
                                          >
                                            <img
                                              src={imageUrl}
                                              onClick={() =>
                                                handleGalleryImageClick(
                                                  imageUrl
                                                )
                                              }
                                              alt={`Gallery Image ${index + 1}`}
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
                                      top: "110%",
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
                                        backgroundColor: "#f38585",
                                        border: "none",
                                        padding: "10px",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-chevron-left fa-lg text-dark"></i>
                                      <i className="fas fa-chevron-left fa-lg text-dark"></i>
                                    </button>
                                    <button
                                      className="glide__arrow glide__arrow--right"
                                      data-glide-dir=">"
                                      style={{
                                        backgroundColor: "#f38585",
                                        border: "none",
                                        padding: "10px",
                                        borderRadius: "40%",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-chevron-right fa-lg text-dark"></i>
                                      <i className="fas fa-chevron-right fa-lg text-dark"></i>
                                    </button>
                                  </div>
                                </div>
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
                                <Link href="#">{solitaire.SolitaireName}</Link>
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
                                  justifyItems: "center",
                                }}
                              >
                                <i
                                  className="fas fa-heart"
                                  style={{ fontSize: "16px" }}
                                ></i>
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
                                <i
                                  className="fas fa-exchange-alt"
                                  style={{ fontSize: "16px" }}
                                ></i>
                              </button>
                            </form>
                          </div>

                          <h1>{solitaire.SolitaireName}</h1>

                          <div
                            className="products-specific"
                            style={{ fontFamily: "outfit" }}
                          >
                            <ul className="list-unstyled">
                            <li className="d-flex align-items-center justify-content-between">
  <div className="d-flex align-items-center">
    <span className="text-decor">Style No:</span> {solitaire.SolitaireID}
  </div>
  {/* Add a "View Details" link on the same line */}
  <Link
    href={`/${solitaire.Slug}`}
    className="btn btn-primary read_more"
    style={{ marginLeft: '10px' }}  // Optional margin for spacing
  >
    View Details
  </Link>
</li>
<hr />
<li className="d-flex align-items-center justify-content-between">
  <div className="d-flex align-items-center">
    <span className="text-decor">Price:</span>     ₹ {solitaire.Price}
    <span style={{ borderLeft: '1px solid #ccc', height: '20px', marginLeft: '10px', paddingLeft: '10px' }}>
  Shipped by: {solitaire.ShippedBy}</span>
  </div>
</li>
<hr />
<li className="d-flex align-items-center justify-content-between">
  <div className="d-flex align-items-center">
    <h1 className="text-decor">{solitaire.SolitaireName} Overview</h1>
  </div>
</li>
<hr />



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
                          <li className="d-flex align-items-center justify-content-between">
  <div className="d-flex align-items-center">
    <h1 className="text-decor">{solitaire.SolitaireName} Certificate</h1>
  </div>
</li>
<hr />

<li className="d-flex align-items-center">
                                {" "}
                                {/* Use flexbox for alignment */}
                               
                                {/* Icon column - adjust icon class */}
                                <div className="d-flex align-items-center">

                                <span className="text-decor">Certificate Number:</span>{" "}
                                {solitaire.CertificateNumber}
                                </div>
                                <Link
href="/certificate"
    className="btn btn-primary read_more"
    style={{ padding: '10px 20px', fontSize: '16px', width: 'auto', height: 'auto',marginLeft:'25px' }}
    >
    View Certificate
  </Link>
                              </li>

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
                              {/* <div className="pro-price">
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
                                        ₹ {solitaire.Price}
                                      </span>
                                    </h2>
                                  </li>
                                </ul>
                              </div> */}

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
                                    <button
                                      className="btn btn-primary btn-lg btn-block text-success"
                                      style={{
                                        marginRight: "10px",
                                        display: "flex",
                                        alignItems: "center",
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
                {/* {product Information} */}
                <div style={{ textAlign: 'center' }}>
  <h1>Product Information</h1>
  <hr />
  <div className="information" style={{marginBottom:''}}>
  <div id="information-information" className="container">
  {/* <div className="container" style={{ maxheight: '200px' }}> */}
        <div id="content1" className="col">
          <div className="row">
            <div className="col-8">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading0">
                  <button
                    aria-controls="collapse0"
                    aria-expanded="false"
                    className="accordion-button collapsed"
                    data-bs-target="#collapse0"
                    data-bs-toggle="collapse"
                    type="button"
                  >
                    Overview
                  </button>
                </h2>
                <div
  aria-labelledby="heading0"
  className="accordion-collapse collapse"
  data-bs-parent="#faqone"
  id="collapse0"
>
  <div className="accordion-body" style={{ padding: '20px' }}>
    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Style No:</span>
        <span>{solitaire.SolitaireID}</span>
      </li>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Certificate:</span>
        <span>{solitaire.Certificate}</span>
      </li>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Certificate No:</span>
        <span>{solitaire.CertificateNumber}</span>
      </li>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Measurements:</span>
        <span>{""}</span>
      </li>
    </ul>
  </div>
</div>


              </div>
            </div>

            <div className="col-8">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading1">
                  <button
                    aria-controls="collapse1"
                    aria-expanded="false"
                    className="accordion-button collapsed"
                    data-bs-target="#collapse1"
                    data-bs-toggle="collapse"
                    type="button"
                  >
                    {solitaire.SolitaireName} Details
                    </button>
                </h2>
                
                  <div
  aria-labelledby="heading1"
  className="accordion-collapse collapse"
  data-bs-parent="#faqone"
  id="collapse1"
>
  <div className="accordion-body" style={{ padding: '20px' }}>
    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Total Weight:</span>
        <span>{""}</span>
      </li>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Clarity	:</span>
        <span>{solitaire.PurityName}</span>
      </li>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Color:</span>
        <span>{solitaire.ColorName}</span>
      </li>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Cut:</span>
        <span>{solitaire.CutName}</span>
      </li>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Depth:</span>
        <span>{}</span>
      </li>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Width:</span>
        <span>{}</span>
      </li>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Polish:</span>
        <span>{""}</span>
      </li>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Symmetry:</span>
        <span>{solitaire.SymmetryName}</span>
      </li>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Fluorescence:</span>
        <span>{solitaire.FluorName}</span>
      </li>
      <li className="d-flex align-items-center mb-2" style={{ justifyContent: 'space-between' }}>
        <span className="text-decor">Culet:</span>
        <span>{solitaire.Carat}</span>
      </li>
    </ul>
  </div>
</div>
              </div>
            </div>

          
          </div>

          {/* WhatsApp Image in Bottom Right Corner */}
          <div style={{ position: 'relative' }}>
            <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer">
              <img 
                src="path-to-your-whatsapp-image.png" 
                alt="Contact us on WhatsApp"
                style={{
                  position: 'absolute',
                  bottom: '20px',   // Adjust the vertical positioning
                  right: '20px',    // Adjust the horizontal positioning
                  width: '60px',    // Adjust image size as needed
                  zIndex: '1000'    // Ensure it stays on top
                }} 
              />
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>







                {/*  PDF and Video Panels  */}
                <div className="container " >
                  <div className="row">
                    {/* PDF Panel */}
                    <div className="col-md-6">
                      <div className="card">
                        <div
                          className="card-header"
                          style={{
                            color: "#20C997",
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
                            color: "#20C997",
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
    </div>
  );
};

export default SolitaireDetails;
