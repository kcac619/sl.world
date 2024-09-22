import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCategory from "../../components/ProductCategory";
import { useRouter } from "next/router";
import axios from "axios";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [isLoadingSlider, setIsLoadingSlider] = useState(true);
  const [errorSlider, setErrorSlider] = useState(null);
  const { query } = useRouter();
  console.log("query", query);
  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    setIsLoadingSlider(true);
    setErrorSlider(null);

    try {
      const response = await axios.get("/api/categories");
      if (response.status === 200) {
        setCategories(response.data.data);
      } else {
        console.error("Error fetching blogs:", response.data.error);
        setErrorSlider("Error fetching blogs.");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setErrorSlider("An error occurred.");
    } finally {
      setIsLoadingSlider(false);
    }
  };

  return (
    <div>
      <>
        <div className="">
          <div id="product-info">
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
                              <a
                                href="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/1-1000x1000.png"
                                title="Crystal Gym &amp; Fitness Glove"
                              >
                                <img
                                  id="img_01"
                                  src="images/1-1000x1000.png"
                                  data-zoom-image="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/1-1000x1000.png"
                                  title="Crystal Gym &amp; Fitness Glove"
                                  alt="Crystal Gym &amp; Fitness Glove"
                                  className="img-thumbnail img-fluid"
                                />
                              </a>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 gal-img">
                              <div id="gal1" className="gallery_img">
                                <a
                                  href="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/1-1000x1000.png"
                                  className="elevatezoom-gallery img-fluid"
                                  title="Crystal Gym &amp; Fitness Glove"
                                  data-update=""
                                  data-image="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/1-1000x1000.png"
                                  data-zoom-image="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/1-1000x1000.png"
                                >
                                  <img
                                    src="images/1-1000x1000.png"
                                    data-zoom-image="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/1-1000x1000.png"
                                    id="img_01"
                                    title="Crystal Gym &amp; Fitness Glove"
                                    alt="Crystal Gym &amp; Fitness Glove"
                                    className="img-thumbnail"
                                  />
                                </a>
                                &nbsp;
                                <a
                                  href="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/2-1000x1000.png"
                                  title="Crystal Gym &amp; Fitness Glove"
                                  data-image="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/2-1000x1000.png"
                                  data-zoom-image="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/2-1000x1000.png"
                                >
                                  <img
                                    src="images/2-1000x1000.png"
                                    title="Crystal Gym &amp; Fitness Glove"
                                    alt="Crystal Gym &amp; Fitness Glove"
                                    className="img-thumbnail elevatezoom-gallery img-fluid"
                                  />
                                </a>
                                &nbsp;
                                <a
                                  href="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/3-1000x1000.png"
                                  title="Crystal Gym &amp; Fitness Glove"
                                  data-image="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/3-1000x1000.png"
                                  data-zoom-image="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/3-1000x1000.png"
                                >
                                  <img
                                    src="images/3-1000x1000.png"
                                    title="Crystal Gym &amp; Fitness Glove"
                                    alt="Crystal Gym &amp; Fitness Glove"
                                    className="img-thumbnail elevatezoom-gallery img-fluid"
                                  />
                                </a>
                                &nbsp;
                                <a
                                  href="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/4-1000x1000.png"
                                  title="Crystal Gym &amp; Fitness Glove"
                                  data-image="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/4-1000x1000.png"
                                  data-zoom-image="https://opencart.workdo.io/diamond/image/cache/catalog/product/11/4-1000x1000.png"
                                >
                                  <img
                                    src="images/4-1000x1000.png"
                                    title="Crystal Gym &amp; Fitness Glove"
                                    alt="Crystal Gym &amp; Fitness Glove"
                                    className="img-thumbnail elevatezoom-gallery img-fluid"
                                  />
                                </a>
                                &nbsp;
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
                                  src="images/back-to-home.svg"
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
                              cloths
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
                                <img src="images/wishlist.svg" alt="wishlist" />
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
                          <h1>Crystal Gym &amp; Fitness Glove</h1>
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
                            <form id="form-product">
                              <div className="web_option">
                                <div className="mb-3 required">
                                  <label className="form-label">Size</label>
                                  <div
                                    id="input-option-361"
                                    className="custom-radio"
                                  >
                                    <div className="form-check">
                                      <label className="color-option">
                                        <input
                                          type="radio"
                                          name="option[361]"
                                          value="347"
                                          id="input-option-value-347"
                                          className="form-check-input"
                                        />
                                        <span> m </span>
                                      </label>
                                    </div>
                                    <div className="form-check">
                                      <label className="color-option">
                                        <input
                                          type="radio"
                                          name="option[361]"
                                          value="348"
                                          id="input-option-value-348"
                                          className="form-check-input"
                                        />
                                        <span> l </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div
                                    id="error-option-361"
                                    className="invalid-feedback"
                                  ></div>
                                </div>
                              </div>
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
                                    disabled="disabled"
                                    data-type="minus"
                                    data-field="quantity"
                                  >
                                    <span className="fa fa-minus"></span>
                                  </button>
                                  <input
                                    id="input-quantity"
                                    type="text"
                                    name="quantity"
                                    value="1"
                                    size="2"
                                    className="form-control input-number pull-left"
                                  />
                                  <button
                                    type="button"
                                    className="form-control pull-left btn-number btnplus"
                                    data-type="plus"
                                    data-field="quantity"
                                  >
                                    <span className="fa fa-plus"></span>
                                  </button>
                                  <div
                                    id="error-quantity"
                                    className="form-text"
                                  ></div>
                                </div>
                              </div>
                              <div className="pro-price">
                                <ul className="list-unstyled">
                                  <li className="text-decor-bold">
                                    <h2>
                                      <span className="price-new">$100.00</span>
                                    </h2>
                                  </li>
                                </ul>
                              </div>
                              <div className="qty-flex">
                                <button
                                  type="submit"
                                  id="button-cart"
                                  className="btn btn-primary btn-lg btn-block"
                                >
                                  Add to Cart
                                  <img alt="stor-bg" src="images/stor-bg.svg" />
                                </button>
                                <input
                                  type="hidden"
                                  name="product_id"
                                  value="30"
                                />
                              </div>
                            </form>
                            {/* AddToAny BEGIN */}
                            <script async src="js/page.js"></script>
                            {/* AddToAny END */}
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
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy.Lorem Ipsum is
                                simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum is simply
                                dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's
                                standard
                              </p>
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
                                  </label> <label
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
                          <div id="error-rating" class="invalid-feedback"></div>
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
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                    <div class="sub-select-scent">
                      <a href="#"
                        >check more products<img
                          alt="stor-bg"
                          src="images/stor-bg.svg"
                      /></a>
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
