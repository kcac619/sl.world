import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import MainSlider from "@/components/MainSlider";
import WbSpecialSlider from "@/components/WbSpecialSlider";
import WdSelectedSlider from "@/components/WdSelectedSlider";
import OnsaleSlider from "@/components/OnsaleSlider";
import WdCategorySlider from "@/components/WdCategorySlider";
import TestimonialSlider from "@/components/TestimonialSlider";
import BlogSlider from "@/components/BlogSlider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Category from "../components/Category";
import axios from "axios";
import {
  getCartItemsFromLocalStorage,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../utils/cartfns";

const Index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false); // For dropdown
  // Testimonials
  const [testimonials, setTestimonials] = useState([]);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);
  const [errorTestimonials, setErrorTestimonials] = useState(null);

  // Blogs
  const [blogs, setBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [errorBlogs, setErrorBlogs] = useState(null);
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
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoadingTestimonials(true);
    console.log("loading testimonials true");
    setErrorTestimonials(null);

    try {
      const response = await axios.get("/api/testimonials");
      console.log("testimoinals response", response);
      if (response.status === 200) {
        setTestimonials(response.data.testimonials);
      } else {
        console.error("Error fetching testimonials:", response.data.error);
        setErrorTestimonials("Error fetching testimonials.");
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setErrorTestimonials("An error occurred.");
    } finally {
      setIsLoadingTestimonials(false);
      console.log("testimonials finnaly clause reached ");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoadingBlogs(true);
    setErrorBlogs(null);

    try {
      const response = await axios.get("/api/blogs");
      if (response.status === 200) {
        setBlogs(response.data.blogs);
      } else {
        console.error("Error fetching blogs:", response.data.error);
        setErrorBlogs("Error fetching blogs.");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setErrorBlogs("An error occurred.");
    } finally {
      setIsLoadingBlogs(false);
    }
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
  const total = subTotal; // For now, total is the same as subtotal
  return (
    <div>
      <>
        <div id="common-home" className="container-fluid">
          <div className="row">
            <div id="content" className="col">
              <div className="col-xs-12">
                <MainSlider />
              </div>
              <div className="wbimg">
                <Category />
              </div>
              <div>
                <div className="dinfo">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 service">
                        <div className="home-sup">
                          <img alt="icon" src="/image/catalog/support.svg" />
                          <div className="home-sup-ctn">
                            <h4>Finished Products</h4>
                            <p>products and gift wrapping</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 service">
                        <div className="home-sup">
                          <img alt="icon" src="/image/catalog/pay.svg" />
                          <div className="home-sup-ctn">
                            <h4>Large And Frequent</h4>
                            <p>Promotions With Numerous Discounts</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 service">
                        <div className="home-sup">
                          <img alt="icon" src="/image/catalog/ship.svg" />
                          <div className="home-sup-ctn">
                            <h4>Free Shipping</h4>
                            <p>On Any Order From $ 150</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="special-section ">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 col-xs-12">
                      <div className="special_secheading">
                        <h1 className="heading text-left">
                          <span>Jewellery &amp; Diamonds</span>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industrys standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </h1>
                        <a
                          className="btn btn-primary btn-section"
                          href="#"
                          tabIndex={0}
                        >
                          <span>
                            check more product
                            <img
                              alt="stor-bg"
                              src="/image/catalog/stor-bg.svg"
                            />
                          </span>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6 col-xs-12">
                      <div className="beffect">
                        <a href="#">
                          <img
                            src="https://woodesy.s3.ap-south-1.amazonaws.com/banner1.jpg"
                            alt="left-banner"
                            className="mx-auto img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="selected_bg">
                <div className="container">
                  <div className="row">
                    <div className="select-ctn">
                      <h4>Jewellery &amp; diamonds</h4>
                    </div>
                    <div className="col-xs-12 selected_pro">
                      <WdSelectedSlider />
                    </div>
                  </div>
                </div>
              </div>

              <div className="specialbanner">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 col-xs-12">
                      <div className="spe-text">
                        <h3>Jewellery &amp; diamonds</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy.Lorem Ipsum is simply dummy
                          text of the printing and typesetting industry. Lorem
                          Ipsum has been the industry's standard dummy.
                        </p>
                        <p>
                          <a
                            className="btn btn-primary btn-section"
                            href="#"
                            tabIndex={0}
                          >
                            <span>
                              check more product
                              <img
                                alt="stor-bg"
                                src="/image/catalog/stor-bg.svg"
                              />
                            </span>
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 col-xs-12">
                      <div className="beffect">
                        <a href="#">
                          <img
                            src="https://woodesy.s3.ap-south-1.amazonaws.com/banner2.png"
                            alt="special-banner"
                            className="mx-auto img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Rings Section */}
              {/* <div className="selected_bg">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="secheading">
                        <h1 className="heading">
                          <span>Necklaces</span>
                        </h1>
                        <p>
                          Explore our stunning collection of diamond rings, from
                          classic solitaires to intricate designs, perfect for
                          every occasion.
                        </p>
                      </div>
                    </div>
                    <div className="col-xs-12 selected_pro">
                      <WdSelectedSlider2 />
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="category-bg">
                <div className="container top-category">
                  <div className="row">
                    <div className="col-md-6 col-xs-12">
                      <div className="category_secheading">
                        <h3>Jewellery &amp; diamonds</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy.Lorem Ipsum is simply dummy
                          text of the printing and typesetting industry. Lorem
                          Ipsum has been the industry's standard dummy.
                        </p>
                        <a
                          className="btn btn-primary btn-section"
                          href="#"
                          tabIndex={0}
                        >
                          <span>
                            check more product
                            <img
                              alt="stor-bg"
                              src="/image/catalog/stor-bg.svg"
                            />
                          </span>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6 col-xs-12">
                      <WdCategorySlider />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="test-pad">
                  <div className="container parallex">
                    <div className="secheading">
                      <h1 className="heading">
                        <span>Testimonials</span>
                      </h1>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 testi">
                        <TestimonialSlider
                          testimonials={testimonials}
                          isLoadingTestimonials={isLoadingTestimonials}
                          errorTestimonials={errorTestimonials}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blog-bg">
                <div className="container">
                  <div className="secheading">
                    <h1 className="heading text-left">
                      <span>From Our Blog</span>
                    </h1>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 box-content">
                      <div className="box-product">
                        <BlogSlider
                          blogs={blogs}
                          isLoadingBlogs={isLoadingBlogs}
                          errorBlogs={errorBlogs}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          href=""
          id="scroll"
          title="Scroll to Top"
          style={{ display: "none" }}
        >
          <i className="fa fa-angle-double-up" />
        </a>
        {/* product qty + - */}
      </>
    </div>
  );
};

export default Index;
