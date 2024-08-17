// components/OfferBannerSlider.js
import React from "react";
import Slider from "react-slick";

// Import Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OfferBannerSlider = () => {
  const settings = {
    dots: false,
    arrows: false, // Disable arrows for this slider
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
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

  const banners = [
    {
      imageUrl: "/image/cache/catalog/offerbanner/1-260x260.jpg",
      link: "#",
    },
    {
      imageUrl: "/image/cache/catalog/offerbanner/2-260x260.jpg",
      link: "#",
    },
    {
      imageUrl: "/image/cache/catalog/offerbanner/3-260x260.jpg",
      link: "#",
    },
    {
      imageUrl: "/image/cache/catalog/offerbanner/4-260x260.jpg",
      link: "#",
    },
    {
      imageUrl: "/image/cache/catalog/offerbanner/5-260x260.jpg",
      link: "#",
    },
    {
      imageUrl: "/image/cache/catalog/offerbanner/6-260x260.jpg",
      link: "#",
    },
  ];

  return (
    <div className="offer_bnr">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="beffect">
            <a href={banner.link}>
              <img
                src={banner.imageUrl}
                alt={`Offer Banner ${index + 1}`}
                className="mx-auto img-fluid"
              />
            </a>
            {/* <div className="offerdesc"></div> */}{" "}
            {/* You can remove or style this as needed */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OfferBannerSlider;
