// components/BlogSlider.js
import React from "react";
import Slider from "react-slick";
import { Box, Skeleton } from "@chakra-ui/react";

// Import Slick CSS (if not already imported in _document.js)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogSlider = ({ blogs, isLoadingBlogs, errorBlogs }) => {
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

  const blogPosts = blogs;

  return (
    <div className="wbblog">
      {isLoadingBlogs ? (
        <Box>
          <Skeleton height="200px" />
          <Skeleton height="20px" mt="4" />
          <Skeleton height="20px" mt="4" />
        </Box>
      ) : (
        <Slider {...settings} style={{ height: "200px !important" }}>
          {blogPosts?.map((post, index) => (
            <div key={index} className="product-block cless">
              <div className="blogshadow blog-thumbnail">
                <div className="blog-left">
                  <div className="workdo-blog-image">
                    <img
                      src={post.ImageUrl}
                      alt={post.Title}
                      title={post.Title}
                      className="img-fluid"
                    />
                    <div className="blog-post-image-hover"></div>
                  </div>
                </div>
                <div className="blog-right">
                  <h4 style={{ fontFamily: "outfit" }}>
                    <a href={post.Link}>
                      {post.Title.length > 24
                        ? `${post.Title.substring(0, 24)} ...`
                        : post.Title}
                    </a>
                  </h4>
                  <div className="blog-desc">
                    {post.Description.length > 50
                      ? `${post.Description.substring(0, 50)} ...`
                      : post.Description}
                  </div>
                  <div className="blog-date blog-bottom">
                    <div className="read_link">
                      <a className="btn btn-primary read_more" href={post.Link}>
                        read more
                      </a>
                    </div>
                    {/* <div className="date-time blogdt">
                      <span className="date-time">{post.Date}</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default BlogSlider;
