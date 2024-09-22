// components/ProductCategory.js
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProductCategory = ({ categories, activeLink }) => {
  const router = useRouter();
  console.log(activeLink);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    console.log("products", products);
  }, [activeLink]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "/api/product/category-products?category=" + activeLink
      );
      console.log("response", response);
      if (response.status === 200) {
        setProducts(response.data.products);
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

  var activeCategory = categories.find(
    (category) => category.link === activeLink
  );
  if (activeCategory) {
    console.log("Active Category:", activeCategory);
  } else {
    activeCategory = {};
  }

  const handleNavigation = (link) => {
    router.push(`${link}`);
  };
  return (
    <div id="product-category">
      <div className="category-page">
        <div className="container">
          <div className="">
            {/* Breadcrumb */}
            <div className="d-flex justify-content-between align-items-center back-page">
              <div className="">
                <div className="back-to-home">
                  <a href="">
                    <img src="/img/back-to-home.svg" alt="Back to home" />{" "}
                    &nbsp; <span> Back to category</span>
                  </a>
                </div>
              </div>
              <div className="">
                <ul className="breadcrumb ">
                  <li className="breadcrumb-item">
                    <a href="https://opencart.workdo.io/diamond/index.php?route=common/home&amp;language=en-gb">
                      <i className="fas fa-home"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="https://opencart.workdo.io/diamond/index.php?route=product/category&amp;language=en-gb&amp;path=67">
                      {activeCategory.name}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Breadcrumb end */}
            <div className="cate-top">
              <h2 className="cat-title"> {activeCategory.name}</h2>
              <div class="cat-desc row">
                <div class="col-sm-12">
                  <p> {activeCategory.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-30">
        <div className="container">
          <div className="row">
            <aside id="column-left" className="col-3 d-none d-md-block">
              <div className="panel-heading cathed">category</div>
              <div className="list-group mb-3">
                {categories.map((category, index) => (
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => handleNavigation("/category/"+category.link)}
                    key={index}
                    className={`list-group-item ${
                      category.link === activeLink ? "active" : ""
                    }`}
                  >
                    {category.name} (1)
                  </a>
                ))}
              </div>
            </aside>
            <div id="content" className="col colright">
            <div className="row panel-default workdo_blog_page rless">
      {products.map((post) => (
        <div key={post.id} className="panel panel-default col-lg-4"   onClick={() => handleNavigation("/product/"+post.link)}>
          <div className="panel-body blog-thumbnail">
            <div className="wbblogimg">
              <div className="workdo-blog-image">
                <div className="blog-post-image-hover"> </div>
                <img src={post.image} alt={post.alt} title={post.title} className="img-thumbnail" />
              </div>
            </div>
            <div className="allcomment">
              <div className="blog_links">
                <span className="blog_comment">
                  {post.comments} Comment
                </span>
                <span className="write-comment">
                  <a href={post.link}>
                    <i className="fa fa-comment"></i>Leave Comments
                  </a>
                </span>
              </div>
              <h4><a href={post.link}>{post.Title}</a></h4>
              <div className="blog-desc">
                <p>{post.description}</p>
              </div>
              <div className="date-time blogdt">
                <span className="blog-date">{post.date}</span>
              </div>
              
              <div className="blog-bottom">
                <div className="read-more">
                  <a href={post.link} className="btn btn-primary"><span
                                >Add to Cart<img
                                  alt="stor-bg"
                                  src="/img/stor-bg.svg"
                              /></span></a>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ))}
    </div>

              <div className="row pagi">
                <div className="col-sm-6 text-start"></div>
                <div className="col-sm-6 text-end tot">
                  Showing 1 to 10 of 10 (1 Pages)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
