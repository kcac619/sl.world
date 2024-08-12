import React from "react";
import Slider from "react-slick";

// Import Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainSlider = () => {
  const settings = {
    customPaging: (i) => <span>{i + 1}</span>,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    dots: true,
    autoplaySpeed: 3500,
  };

  const slides = [
    {
      imageUrl: "/image/cache/catalog/slider/1-1920x750.png", // Keep the image URL for reference or background
      title: "Jewellery & diamonds",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy...",
      buttonText: "Check more product",
      buttonLink: "#",
    },

    {
      imageUrl: "/image/cache/catalog/slider/2-1920x750.png", // Keep the image URL for reference or background
      title: "asdkljfalksdnfkljhklndf",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy...",
      buttonText: "Check more product",
      buttonLink: "#",
    },
    // ... add other slides ...
  ];

  return (
    <div className="s-panel">
      <div className="imgslider">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="sliderel">
              <div className="container">
                <div className="slidertext">
                  <div className="slideff">
                    <div className="slidesmall">
                      <h1>{slide.title}</h1>
                      <p>{slide.text}</p>
                      <div className="slider-btn">
                        <a className="btn btn-primary btn-section" href="#">
                          <span>
                            check more product
                            <img
                              alt="stor-bg"
                              src="image/catalog/stor-bg.svg"
                            />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#">
                <img
                  src={slide.imageUrl}
                  alt="slider"
                  className="mx-auto img-fluid"
                />
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MainSlider;
