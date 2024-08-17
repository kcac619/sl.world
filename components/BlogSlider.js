// components/BlogSlider.js
import React from "react";
import Slider from "react-slick";

// Import Slick CSS (if not already imported in _document.js)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    arrows: true,
    rows: 1,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1830,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const blogPosts = [
    {
      imageUrl:
        "https://opencart.workdo.io/diamond/image/cache/catalog/blog/5-1000x670.jpg",
      title: "Best bracelet and necklaces",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
      link: "https://opencart.workdo.io/diamond/index.php?route=extension/blogger/information/blogger&blogger_id=5",
      date: "13 Dec, 2022",
    },
    {
      imageUrl:
        "https://opencart.workdo.io/diamond/image/cache/catalog/blog/4-1000x670.jpg",
      title: "Best bracelet and necklaces",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
      link: "https://opencart.workdo.io/diamond/index.php?route=extension/blogger/information/blogger&blogger_id=4",
      date: "13 Dec, 2022",
    },
    {
      imageUrl:
        "https://opencart.workdo.io/diamond/image/cache/catalog/blog/3-1000x670.jpg",
      title: "Best bracelet and necklaces",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
      link: "https://opencart.workdo.io/diamond/index.php?route=extension/blogger/information/blogger&blogger_id=3",
      date: "13 Dec, 2022",
    },
    {
      imageUrl:
        "https://opencart.workdo.io/diamond/image/cache/catalog/blog/2-1000x670.jpg",
      title: "Best bracelet and necklaces",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
      link: "https://opencart.workdo.io/diamond/index.php?route=extension/blogger/information/blogger&blogger_id=2",
      date: "12 Dec, 2022",
    },
    {
      imageUrl:
        "https://opencart.workdo.io/diamond/image/cache/catalog/blog/1-1000x670.jpg",
      title: "Best bracelet and necklaces",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry....",
      link: "https://opencart.workdo.io/diamond/index.php?route=extension/blogger/information/blogger&blogger_id=1",
      date: "12 Dec, 2022",
    },
  ];

  return (
    <div className="wbblog">
      <Slider {...settings}>
        {blogPosts.map((post, index) => (
          <div key={index} className="product-block  cless">
            <div className="blogshadow blog-thumbnail">
              <div className="blog-left">
                <div className="workdo-blog-image">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    title={post.title}
                    className="img-fluid"
                  />
                  <div className="blog-post-image-hover"></div>
                </div>
              </div>
              <div className="blog-right">
                <h4>
                  <a href={post.link}>{post.title}</a>
                </h4>
                {/* <div className="workdo-post-author"></div> */}{" "}
                {/*  Optional - You can add author details */}
                <div className="blog-desc">{post.description}</div>
                <div className="blog-date blog-bottom">
                  <div className="read_link">
                    <a className="btn btn-primary read_more" href={post.link}>
                      read more
                    </a>
                  </div>
                  <div className="date-time blogdt">
                    <span className="date-time">{post.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogSlider;
