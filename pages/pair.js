import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Glide from "@glidejs/glide";

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
  const [solitaires, setSolitaires] = useState([
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
      Image1: "diamond/image/cache/catalog/product/1/1-1000x1000.png",
      Image2: "diamond/image/cache/catalog/product/1/2-1000x1000.png",
      Image3: "diamond/image/cache/catalog/product/2/1-1000x1000.png", // Add a third image
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
      Image1: "diamond/image/cache/catalog/product/11/1-1000x1000.png",
      Image2: "diamond/image/cache/catalog/product/11/2-1000x1000.png",
      Image3: "diamond/image/cache/catalog/product/12/1-1000x1000.png", // Add a third image
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
  const [pairQuantity, setPairQuantity] = useState(1); // Quantity for the pair
  const [cartItems, setCartItems] = useState([]);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [mainImageUrls, setMainImageUrls] = useState([null, null]);
  const [showSkeletons, setShowSkeletons] = useState([false, false]);
  const [isPairInCart, setIsPairInCart] = useState(false);

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

  // Handle quantity changes for the pair
  const handlePairQuantityChange = (newQuantity) => {
    setPairQuantity(parseInt(newQuantity) || 1);
  };

  const increasePairQuantity = () => {
    setPairQuantity(pairQuantity + 1);
  };

  const decreasePairQuantity = () => {
    if (pairQuantity > 1) {
      setPairQuantity(pairQuantity - 1);
    }
  };

  // Check if the pair is already in the cart (using a simple check for now)
  useEffect(() => {
    setIsPairInCart(
      cartItems.some(
        (item) =>
          item.SolitaireID === solitaires[0].SolitaireID ||
          item.SolitaireID === solitaires[1].SolitaireID
      )
    );
  }, [cartItems, solitaires]);

  const handleAddToCart = () => {
    // Add both solitaires to the cart individually
    solitaires.forEach((solitaire) => {
      const solitaireToAdd = { ...solitaire, quantity: pairQuantity };
      addToCart(solitaireToAdd);
    });

    setCartItems(getCartItemsFromLocalStorage());
    setIsPairInCart(true);
  };

  // Calculate subtotal and total
  const subTotal = cartItems.reduce(
    (total, item) => total + item.Price * item.quantity,
    0
  );
  const total = subTotal;

  return (
    <div>
      <Head>
        <title>Pair - Diamond Store</title>
      </Head>

      <main>
        <div className="container mt-5">
          <div className="row">
            {/* Solitaire 1 */}
            {solitaires.map((solitaire, solitaireIndex) => (
              <div
                key={solitaire.SolitaireID}
                className={`col-lg-6 col-md-12 ${
                  solitaires.length === 1 ? "col-sm-12" : "col-sm-6"
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
                                    id={`img_01_${solitaireIndex}`}
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
                      </div>
                    </div>
                  </div>
                </div>

                {/*  PDF and Video Panels (Dummy Data) */}
                <div className="container mt-4">
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
            ))}

            {/* Product Form (modified for pair) */}
            <div className="row">
              <div
                id="product "
                className="clearfix"
                style={{
                  display: "flex !important",
                  flexDirection: "row !important",
                }}
              >
                <form id="form-product" onSubmit={(e) => e.preventDefault()}>
                  {/* ... [Remove web_option if not needed for the pair] ... */}

                  {/* Quantity Input (for the pair) */}
                  <div
                    className="pro-qut"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <label
                      htmlFor="input-quantity"
                      className="form-label text-decorop"
                      style={{
                        color: "var(--main-color)",
                        marginRight: "10px",
                      }}
                    >
                      Qty
                    </label>
                    <div
                      className="op-box qty-plus-minus"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <button
                        type="button"
                        className="form-control pull-left btn-number btnminus"
                        disabled={pairQuantity === 1}
                        onClick={decreasePairQuantity}
                        style={{
                          width: "40px",
                          backgroundColor: "var(--sub-color)",
                          borderRight: "none !important",
                          borderTopRightRadius: "0",
                          borderBottomRightRadius: "0",
                        }}
                      >
                        <span className="fa fa-minus"></span>
                      </button>
                      <input
                        id="input-quantity-pair"
                        type="text"
                        name="quantity"
                        value={pairQuantity}
                        size="2"
                        className="form-control input-number pull-left"
                        onChange={(e) =>
                          handlePairQuantityChange(e.target.value)
                        }
                        style={{
                          borderTopLeftRadius: "0",
                          borderBottomLeftRadius: "0",
                          borderTopRightRadius: "0",
                          borderBottomRightRadius: "0",
                        }}
                      />
                      <button
                        type="button"
                        className="form-control pull-left btn-number btnplus"
                        onClick={increasePairQuantity}
                        style={{
                          width: "40px",
                          backgroundColor: "var(--sub-color)",
                          borderLeft: "none !important",
                          borderTopLeftRadius: "0",
                          borderBottomLeftRadius: "0",
                        }}
                      >
                        <span className="fa fa-plus"></span>
                      </button>
                      <div id="error-quantity-pair" className="form-text"></div>
                    </div>
                  </div>

                  {/* Price (for the pair) */}
                  <div className="pro-price">
                    <ul className="list-unstyled">
                      <li className="text-decor-bold">
                        <h2>
                          <span
                            className="price-new"
                            style={{
                              fontFamily: "outfit",
                              fontWeight: "200",
                              color: "var(--main-color)",
                            }}
                          >
                            $
                            {(
                              solitaires[0].Price + solitaires[1].Price
                            ).toFixed(2)}
                          </span>
                        </h2>
                      </li>
                    </ul>
                  </div>

                  {/* Add to Cart Button (for the pair) */}
                  <div className="qty-flex">
                    {isPairInCart ? (
                      // Display a message if already in cart
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
                            // scale: "0.7",
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
                            // scale: "0.7",
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
                        onClick={handleAddToCart}
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Add Pair to Cart
                        <img alt="stor-bg" src="image/catalog/stor-bg.svg" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ... [Your footer JSX - replace jQuery/inline scripts] ... */}
    </div>
  );
};

export default Pair;
