// components/TestimonialSlider.js
import React from "react";
import Slider from "react-slick";
import { Box, Skeleton } from "@chakra-ui/react";
import axios from "axios";

// Import Slick CSS (if not already imported in _document.js)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialSlider = ({
  testimonials,
  isLoadingTestimonials,
  errorTestimonials,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    arrows: true,
    rows: 1,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // const testimonials = [
  //   {
  //     imageUrl:
  //       "https://opencart.workdo.io/diamond/image/catalog/testimonial/1.png",
  //     quote:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's dummy.",
  //     author: "mr. onsequat developer",
  //     title: "Excellent",
  //   },
  //   {
  //     imageUrl:
  //       "https://opencart.workdo.io/diamond/image/catalog/testimonial/2.png",
  //     quote:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's dummy.",
  //     author: "mr. onsequat developer",
  //     title: "Excellent",
  //   },
  //   {
  //     imageUrl:
  //       "https://opencart.workdo.io/diamond/image/catalog/testimonial/1.png",
  //     quote:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's dummy.",
  //     author: "mr. onsequat developer",
  //     title: "Excellent",
  //   },
  //   {
  //     imageUrl:
  //       "https://opencart.workdo.io/diamond/image/catalog/testimonial/2.png",
  //     quote:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's dummy.",
  //     author: "mr. onsequat developer",
  //     title: "Excellent",
  //   },
  // ];

  return (
    <div className="wbtesti">
      {/* {console.log(
        "in testimonial slider, tesimonials, isLoadingTestimonials",
        testimonials,
        isLoadingTestimonials
      )} */}
      {isLoadingTestimonials ? (
        <Box>
          <Skeleton height="200px" />
          <Skeleton height="20px" mt="4" />
          <Skeleton height="20px" mt="4" />
        </Box>
      ) : (
        testimonials &&
        testimonials.length > 0 && (
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testi-spc">
                <div className="item">
                  <div className="testi-img">
                    <img
                      src={testimonial.ImageUrl}
                      alt={testimonial.Author}
                      className="img-fluid"
                    />
                  </div>
                  <div className="testi-dec">
                    <h4>{testimonial.Title}</h4>
                    <p>{testimonial.Quote}</p>
                    <div className="testdec-ctn">
                      <h4>{testimonial.Author}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )
      )}
    </div>
  );
};

export default TestimonialSlider;
