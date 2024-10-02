// components/CategorySlider.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { Skeleton } from "@chakra-ui/react";
// Import Slick CSS (if not already imported in _document.js)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Category = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isLoadingSlider, setIsLoadingSlider] = useState(true);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [errorSlider, setErrorSlider] = useState(null);

  const settings = {
    dots: false,
    infinite: false,
    autoplay: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1410,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

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
        preloadImages(response.data.data);
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

  const handleNavigation = (link) => {
    router.push(`/category/${link}`);
  };

  return (
    <div className="category-bg">
      <div className="container top-category">
        <div className="row">
          <div className="col-md-12 select-ctn text-center">
            <h5>Jewellery & diamonds</h5>
          </div>
          <div className="col-md-12 col-xs-12">
            <div className="wdcategory">
              {isLoadingSlider || !allImagesLoaded ? (
                <Slider {...settings}>
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="wd-item-layout">
                      <div className="wd-item-img">
                        <Skeleton height="335px" width="270px" mb={4} />
                      </div>
                      <h4 className="wd-item-title">
                        <Skeleton height="20px" width="80%" mb="4" />
                        <Skeleton height="20px" width="60%" />
                      </h4>
                    </div>
                  ))}
                </Slider>
              ) : (
                <Slider {...settings}>
                  {categories?.map((category, index) => (
                    <div key={index} className="wd-item-layout">
                      <div className="wd-item-img">
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => handleNavigation(category.link)}
                          key={index}
                        >
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
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => handleNavigation(category.link)}
                            key={index}
                          >
                            {category.name}
                          </a>
                        </div>
                        <div className="wd-item-caption">
                          <a
                            onClick={() => handleNavigation(category.link)}
                            key={index}
                            style={{ cursor: "pointer" }}
                            className="btn btn-primary"
                          >
                            <span>Go to categories</span>
                            <img
                              alt="stor-bg"
                              src="/image/catalog/stor-bg.svg"
                            />
                          </a>
                        </div>
                      </h4>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
