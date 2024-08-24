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
} from "./cartfns";

const SolitaireDetails = () => {
  const router = useRouter();
  const { solitaireId } = router.query;

  const [solitaire, setSolitaire] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

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
        <div className="top-header hidden-xs">
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
                    {/* ... [Adapt links to use Next.js Link component] ...  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ... [The rest of your header JSX - replace jQuery and inline scripts] ... */}
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
                                  <>
                                    <p className="text-success">
                                      Already in cart!
                                    </p>
                                    <Link
                                      href="/cart"
                                      className="btn btn-primary btn-lg btn-block"
                                    >
                                      Open Cart
                                      <img
                                        alt="stor-bg"
                                        src="image/catalog/stor-bg.svg"
                                      />
                                    </Link>
                                  </>
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
