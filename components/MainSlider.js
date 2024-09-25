import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import axios from "axios";
// Import Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [isLoadingSlider, setIsLoadingSlider] = useState(true);
  const [errorSlider, setErrorSlider] = useState(null);

  const settings = {
    customPaging: (i) => <span>{i + 1}</span>,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    dots: true,
    autoplaySpeed: 3500,
  };
  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    setIsLoadingSlider(true);
    setErrorSlider(null);

    try {
      const response = await axios.get("/api/sliders");
      if (response.status === 200) {
        setSliders(response.data.data);
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
      title: "Explore the Sale!!",
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
          {sliders?.map((slide, index) => (
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
                            {slide.buttonText}
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
