// components/WdCategorySlider.js
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
// Import Slick CSS (if not already imported in _document.js)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WdCategorySlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 2, // Show 2 categories at a time
    slidesToScroll: 1,
    rows: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1400,
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
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const [categories, setCategories] = useState([]);
  const [isLoadingSlider, setIsLoadingSlider] = useState(true);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [errorSlider, setErrorSlider] = useState(null);
  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    setIsLoadingSlider(true);
    setErrorSlider(null);

    try {
      const response = await axios.get("/api/categories");
      if (response.status === 200) {
        const shuffled = response.data.data
          .map(a => [Math.random(), a])
          .sort((a, b) => a[0] - b[0])
          .map(a => a[1]);
        setCategories(shuffled.slice(0, 2));
        preloadImages(shuffled.slice(0, 2));
      } else {
        console.error("Error fetching categories:", response.data.error);
        setErrorSlider("Error fetching categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setErrorSlider("An error occurred.");
    } finally {
      setIsLoadingSlider(false);
    }
  };
  const preloadImages = (categories) => {
    const imagePromises = categories.map((category) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = category.imageUrl;
        img.onload = resolve;
        img.onerror = resolve; // Resolve even if there's an error to avoid blocking
      });
    });

    Promise.all(imagePromises).then(() => {
      setAllImagesLoaded(true);
    });
  };

  return (
    <div className="wdcategory">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div key={index} className="wd-item-layout">
            <div className="wd-item-img">
              <a href={category.link}>
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  title={category.name}
                  className="img-fluid"
                />
              </a>
            </div>
            <h4 className="wd-item-title">
              <div className="catbr">
                <p>categories</p>
                <a href={category.link}>{category.name}</a>
              </div>
              <div className="wd-item-caption">
                <a href={category.link} className="btn btn-primary">
                  <span>Go to categories</span>
                  <img alt="stor-bg" src="/image/catalog/stor-bg.svg" />
                </a>
              </div>
            </h4>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WdCategorySlider;
