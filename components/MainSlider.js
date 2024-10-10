import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton, Box, Heading, Text, Button } from "@chakra-ui/react";
// Import Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [isLoadingSlider, setIsLoadingSlider] = useState(true);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
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
        preloadImages(response.data.data);
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

  const preloadImages = (slides) => {
    const imagePromises = slides.map((slide) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = slide.imageUrl;
        img.onload = resolve;
        img.onerror = resolve; // Resolve even if there's an error to avoid blocking
      });
    });

    Promise.all(imagePromises).then(() => {
      setAllImagesLoaded(true);
    });
  };

  return (
    <div className="s-panel">
      <div className="imgslider">
        {isLoadingSlider || !allImagesLoaded ? (
          <Slider {...settings}>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="sliderel">
                <div className="container">
                  <div className="slidertext">
                    <div className="slideff">
                      <div className="slidesmall">
                        <Skeleton height="40px" width="60%" mb="4" />
                        <Skeleton height="20px" width="80%" mb="4" />
                        <Skeleton height="20px" width="80%" mb="4" />
                        <Skeleton height="40px" width="40%" />
                      </div>
                    </div>
                  </div>
                </div>
                <Skeleton height="600px" width="100%" />
              </div>
            ))}
          </Slider>
        ) : (
          <Slider {...settings}>
            {sliders?.map((slide, index) => (
              <div key={index} className="sliderel">
                <div className="container">
                  <div className="slidertext">
                    <div className="slideff">
                      <div className="slidesmall">
                        <Heading as="h1">{slide.title}</Heading>
                        <Text>{slide.text}</Text>
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
        )}
      </div>
    </div>
  );
};

export default MainSlider;
