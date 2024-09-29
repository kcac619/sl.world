"use client";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import ProductCategory from "../../components/ProductCategory";
import { useRouter } from "next/router";
import axios from "axios";
import Glide from "@glidejs/glide";

// Import Glide CSS
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import { Skeleton } from "@chakra-ui/react";
import {
  getCartItemsFromLocalStorage,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../../utils/cartfns";

const Product = () => {
  const router = useRouter();
  const { productSlug } = router.query;
  const galleryRef = useRef(null);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const handleGalleryImageClick = (imageUrl) => {
    setShowSkeleton(true); // Show Skeleton before image change
    setTimeout(() => {
      setMainImageUrl(imageUrl);
      setShowSkeleton(false); // Hide Skeleton after image loads
    }, 300); // Adjust delay as needed
  };
  const [mainImageUrl, setMainImageUrl] = useState(
    "https://opencart.workdo.io/diamond/image/cache/catalog/product/9/5-1000x1000.png"
  );
  const [isLoadingSlider, setIsLoadingSlider] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorSlider, setErrorSlider] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const { query } = useRouter();
  const solitaire = {};
  console.log("query", query);
  useEffect(() => {
    //fetchSliders();
  }, []);

  useEffect(() => {
    if (galleryRef.current) {
      new Glide(galleryRef.current, {
        type: "carousel",
        perView: 4,
        gap: 10,
        rewind: false,
      }).mount();
      const slides = galleryRef.current.querySelectorAll(".glide__slide");
      slides.forEach((slide) => {
        slide.addEventListener("click", (event) => {
          event.preventDefault();
          const imageUrl = slide.querySelector("img").src;
          handleGalleryImageClick(imageUrl);
        });
      });
    }
  }, []);

  const galleryImages = [
    "https://opencart.workdo.io/diamond/image/cache/catalog/product/9/1-1000x1000.png",
    "https://opencart.workdo.io/diamond/image/cache/catalog/product/9/2-1000x1000.png",
    "https://opencart.workdo.io/diamond/image/cache/catalog/product/9/3-1000x1000.png",
    "https://opencart.workdo.io/diamond/image/cache/catalog/product/9/1-1000x1000.png",
    "https://opencart.workdo.io/diamond/image/cache/catalog/product/9/2-1000x1000.png",
    "https://opencart.workdo.io/diamond/image/cache/catalog/product/9/3-1000x1000.png",
    "https://opencart.workdo.io/diamond/image/cache/catalog/product/9/5-1000x1000.png",
  ];

  useEffect(() => {
    fetchProducts();
  }, [productSlug]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "/api/product/products-details?product=" + productSlug
      );
      console.log("response", response);
      if (response.status === 200) {
        if (response.data.products.length > 0) {
          setProduct(response.data.products[0]);
        }
      } else {
        console.error("Error fetching products:", response.data.error);
        setError("Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Update cartItems state whenever local storage changes
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

  // Check if this product is already in the cart
  const isInCart = cartItems.some((item) => item.link === product.link);
  console.log("isInCart", isInCart);
  console.log("cartItems", cartItems);
  console.log("product", product);

  const handleAddToCart = () => {
    console.log("quantity", quantity);
    addToCart({ ...product, quantity: quantity });
    setCartItems(getCartItemsFromLocalStorage());
  };

  // Quantity handling
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value) || 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <>
        <div className="">
          <div id="product-info" className="mb-4">
            <div className="">
              <div id="content" className="col">
                <div className="productbg p-bg">
                  <div className="container">
                    <div className="row">
                      {/* Breadcrumb */}
                      {/* Breadcrumb end */}

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
                                      <i className="fas fa-chevron-right fa-lg text-dark"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-7 col-md-6 col-xs-12 pro-content t-50">
                        <div className="d-flex justify-content-between align-items-center back-page">
                          <div className="">
                            <div className="back-to-home">
                              <a href="">
                                <img
                                  src="/img/back-to-home.svg"
                                  alt="Back to home"
                                />
                                &nbsp; <span> Back to category</span>
                              </a>
                            </div>
                          </div>
                          <div className="">
                            <ul className="breadcrumb">
                              <li className="breadcrumb-item">
                                <a href="https://opencart.workdo.io/diamond/index.php?route=common/home&amp;language=en-gb">
                                  <i className="fas fa-home"></i>
                                </a>
                              </li>
                              <li className="breadcrumb-item">
                                <a href="https://opencart.workdo.io/diamond/index.php?route=product/product&amp;language=en-gb&amp;product_id=30">
                                  Crystal Gym &amp; Fitness Glove
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="prsubdec">
                          <div className="rating">
                            <li>
                              <span className="fa-stack">
                                <i className="fa-regular fa-star fa-stack-1x"></i>
                              </span>
                              <span className="fa-stack">
                                <i className="fa-regular fa-star fa-stack-1x"></i>
                              </span>
                              <span className="fa-stack">
                                <i className="fa-regular fa-star fa-stack-1x"></i>
                              </span>
                              <span className="fa-stack">
                                <i className="fa-regular fa-star fa-stack-1x"></i>
                              </span>
                              <span className="fa-stack">
                                <i className="fa-regular fa-star fa-stack-1x"></i>
                              </span>
                            </li>
                            <li className="proreview">
                              <a
                                id="ratecount"
                                href=""
                                onClick={() => {
                                  document
                                    .querySelector('a[href="#tab-review"]')
                                    .click();
                                  return false;
                                }}
                              >
                                0 reviews
                              </a>
                            </li>
                            <li>
                              <a
                                id="ratep"
                                href="#rt"
                                onClick={() => {
                                  document
                                    .querySelector('a[href="#tab-review"]')
                                    .click();
                                  return false;
                                }}
                              >
                                Write a review
                              </a>
                            </li>
                          </div>
                          <div className="pro-btn">
                            <a
                              className="product-name"
                              href="https://opencart.workdo.io/diamond/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=9"
                            >
                              {product.category}
                            </a>
                            <form
                              method="post"
                              data-oc-toggle="ajax"
                              className="d-inline-flex wc-btn"
                            >
                              <button
                                type="submit"
                                formaction="https://opencart.workdo.io/diamond/index.php?route=account/wishlist|add&amp;language=en-gb"
                                data-bs-toggle="tooltip"
                                className="btn pcrt wish"
                                title="Add to Wish List"
                                onClick={() => wishlist.add("30")}
                              >
                                <img src="/img/wishlist.svg" alt="wishlist" />
                              </button>
                              <button
                                type="submit"
                                formaction="https://opencart.workdo.io/diamond/index.php?route=product/compare|add&amp;language=en-gb"
                                data-bs-toggle="tooltip"
                                className="btn pcrt compare"
                                title="Add to Compare"
                                onClick={() => compare.add("30")}
                              >
                                <svg width="16px" height="16px">
                                  <use xlinkHref="#compare"></use>
                                </svg>
                              </button>
                              <input
                                type="hidden"
                                name="product_id"
                                value="30"
                              />
                            </form>
                          </div>
                          <h1> {product.Title}</h1>
                          <div className="products-specific">
                            <span className="products-details">
                              Products Details:
                            </span>
                            <ul className="list-unstyled">
                              <li>
                                <span className="text-decor">Brand:</span>
                                <a href="https://opencart.workdo.io/diamond/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=9">
                                  cloths
                                </a>
                              </li>
                              <li>
                                <span className="text-decor">
                                  Product Code:
                                </span>
                                Product 3
                              </li>
                            </ul>
                            <ul className="list-unstyled">
                              <li>
                                <span className="text-decor">
                                  Reward Points:
                                </span>
                                200
                              </li>
                              <li>
                                <span className="text-decor">
                                  Availability:
                                </span>
                                In Stock
                              </li>
                            </ul>
                            <ul className="list-unstyled">
                              <li>Ex Tax: $100.00</li>
                            </ul>
                          </div>
                          <div id="product" className="clearfix">
                            <form
                              id="form-product"
                              onSubmit={(e) => e.preventDefault()}
                            >
                              {/* ... [Your web_option JSX if needed] ... */}

                              {/* Quantity Input (for the product) */}
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
                                    id="input-quantity-product"
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

                              {/* ... [Your existing pro-price JSX] ... */}

                              {/* Add to Cart Button and Message */}
                              <div className="qty-flex">
                                {isInCart ? (
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
                                  value="30"
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-reviews">
                  <div className="container">
                    <div className="row"></div>
                    <div className="product-tab">
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a
                            href="#tab-description"
                            id="description-tab"
                            className="nav-link active"
                            data-bs-toggle="tab"
                          >
                            Description
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#tab-review"
                            id="review-tab"
                            className="nav-link"
                            data-bs-toggle="tab"
                          >
                            Reviews (0)
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div
                          id="tab-description"
                          className="tab-pane fade show active"
                          role="tabpanel"
                          aria-labelledby="description-tab"
                        >
                          <div className="row">
                            <div className="col-md-6 col-xs-12 tab-dec">
                              <p>{product.Description}</p>
                            </div>
                            <div className="col-md-6 col-xs-12 dec-testi">
                              <div className="item">
                                <div className="testi-img">
                                  <img alt="1" src="images/1.png" />
                                </div>
                                <div className="testi-dec">
                                  <h4>Excellent</h4>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's dummy.
                                  </p>
                                  <div className="testdec-ctn">
                                    <h5>Mr. Onsequat Developer</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="tab-review" className="tab-pane fade">
                          <form id="form-review">
                            <div id="review">
                              <p>There are no reviews for this product.</p>
                            </div>
                            <h2>Write a review</h2>
                            <div className="mb-3 required">
                              <label
                                htmlFor="input-name"
                                className="form-label"
                              >
                                Your Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                value=""
                                id="input-name"
                                className="form-control"
                              />
                              <div
                                id="error-name"
                                className="invalid-feedback"
                              ></div>
                            </div>
                            <div className="mb-3 required">
                              <label
                                htmlFor="input-text"
                                className="form-label"
                              >
                                Your Review
                              </label>
                              <textarea
                                name="text"
                                rows="5"
                                id="input-text"
                                className="form-control"
                              ></textarea>
                              <div
                                id="error-text"
                                className="invalid-feedback"
                              ></div>
                              <div className="invalid-feedback">
                                <span className="text-danger">Note:</span> HTML
                                is not translated!
                              </div>
                            </div>
                            <div className="mb-3 required radi">
                              <label className="form-label">Rating</label>
                              <div className="form-rating">
                                <div className="form-rating-container pull-left">
                                  <input
                                    id="rating-5"
                                    type="radio"
                                    name="rating"
                                    value="5"
                                  />
                                  <label
                                    className="fa fa-stack pull-right"
                                    htmlFor="rating-5"
                                  >
                                    <i className="fa fa-star fa-stack-1x"></i>
                                    <i className="fa fa-star-o fa-stack-1x"></i>
                                  </label>
                                  <input
                                    id="rating-4"
                                    type="radio"
                                    name="rating"
                                    value="4"
                                  />
                                  <label
                                    className="fa fa-stack pull-right"
                                    htmlFor="rating-4"
                                  >
                                    <i className="fa fa-star fa-stack-1x"></i>
                                    <i className="fa fa-star-o fa-stack-1x"></i>
                                  </label>{" "}
                                  <label
                                    class="fa fa-stack pull-right"
                                    for="rating-4"
                                  >
                                    <i class="fa fa-star fa-stack-1x"></i>
                                    <i class="fa fa-star-o fa-stack-1x"></i>
                                  </label>
                                  <input
                                    id="rating-3"
                                    type="radio"
                                    name="rating"
                                    value="3"
                                  />
                                  <label
                                    class="fa fa-stack pull-right"
                                    for="rating-3"
                                  >
                                    <i class="fa fa-star fa-stack-1x"></i>
                                    <i class="fa fa-star-o fa-stack-1x"></i>
                                  </label>
                                  <input
                                    id="rating-2"
                                    type="radio"
                                    name="rating"
                                    value="2"
                                  />
                                  <label
                                    class="fa fa-stack pull-right"
                                    for="rating-2"
                                  >
                                    <i class="fa fa-star fa-stack-1x"></i>
                                    <i class="fa fa-star-o fa-stack-1x"></i>
                                  </label>
                                  <input
                                    id="rating-1"
                                    type="radio"
                                    name="rating"
                                    value="1"
                                  />
                                  <label
                                    class="fa fa-stack pull-right"
                                    for="rating-1"
                                  >
                                    <i class="fa fa-star fa-stack-1x"></i>
                                    <i class="fa fa-star-o fa-stack-1x"></i>
                                  </label>
                                </div>
                              </div>
                              <div
                                id="error-rating"
                                class="invalid-feedback"
                              ></div>
                            </div>

                            <div class="d-inline-block pt-2 pd-2 w-100">
                              <div class="float-end">
                                <button
                                  type="submit"
                                  id="button-review"
                                  class="btn btn-primary"
                                >
                                  Continue
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pro-banner">
                <div class="container">
                  <div class="row custom-banner">
                    <div class="col-md-6 col-xs-12 custom-img">
                      <img
                        src="images/product-banner.png"
                        alt="product-banner"
                        class="img-fluid"
                      />
                    </div>
                    <div class="col-md-6 col-xs-12 custom-ctn offerdesc">
                      <div class="part-1">
                        <h1>Jewellery &amp; Diamonds</h1>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </p>
                        <div class="sub-select-scent">
                          <a href="#">
                            check more products
                            <img alt="stor-bg" src="/img/stor-bg.svg" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Product;
