// components/WdSelectedSlider.js
import React from "react";
import Slider from "react-slick";

// Import Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WdSelectedSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1700,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
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

  // Replace this with your actual product data
  const products = [
    {
      imageUrl1: "/image/cache/catalog/product/1/1-1000x1000.png",
      imageUrl2: "/image/cache/catalog/product/1/2-1000x1000.png",
      name: "Abigail Moon & Stars Ring",
      brand: "shoes", // Assuming brand is the manufacturer name
      price: "$1.00",
      link: "diamond/index.php?route=product/product&language=en-gb&product_id=28",
      // ... other product properties
    },
    {
      imageUrl1: "/image/cache/catalog/product/2/1-1000x1000.png",
      imageUrl2: "/image/cache/catalog/product/2/2-1000x1000.png",
      name: "Abigail Moon & Stars Ring",
      brand: "shoes", // Assuming brand is the manufacturer name
      price: "$1.00",
      link: "diamond/index.php?route=product/product&language=en-gb&product_id=28",
      // ... other product properties
    },
    {
      imageUrl1: "/image/cache/catalog/product/3/1-1000x1000.png",
      imageUrl2: "/image/cache/catalog/product/3/2-1000x1000.png",
      name: "Abigail Moon & Stars Ring",
      brand: "shoes", // Assuming brand is the manufacturer name
      price: "$1.00",
      link: "diamond/index.php?route=product/product&language=en-gb&product_id=28",
      // ... other product properties
    },
    {
      imageUrl1: "/image/cache/catalog/product/4/1-1000x1000.png",
      imageUrl2: "/image/cache/catalog/product/4/2-1000x1000.png",
      name: "Abigail Moon & Stars Ring",
      brand: "shoes", // Assuming brand is the manufacturer name
      price: "$1.00",
      link: "diamond/index.php?route=product/product&language=en-gb&product_id=28",
      // ... other product properties
    },
    {
      imageUrl1: "/image/cache/catalog/product/5/1-1000x1000.png",
      imageUrl2: "/image/cache/catalog/product/5/2-1000x1000.png",
      name: "Abigail Moon & Stars Ring",
      brand: "shoes", // Assuming brand is the manufacturer name
      price: "$1.00",
      link: "diamond/index.php?route=product/product&language=en-gb&product_id=28",
      // ... other product properties
    },
    {
      imageUrl1: "/image/cache/catalog/product/6/1-1000x1000.png",
      imageUrl2: "/image/cache/catalog/product/6/2-1000x1000.png",
      name: "Abigail Moon & Stars Ring",
      brand: "shoes", // Assuming brand is the manufacturer name
      price: "$1.00",
      link: "diamond/index.php?route=product/product&language=en-gb&product_id=28",
      // ... other product properties
    },
  ];

  return (
    <div className="wdselected" style={{ display: "block" }}>
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index} className="col cless">
            <form>
              {/* ... (Your form code, removing PHP and data-oc attributes) ... */}
              <div className="product-thumb">
                <div className="product-bg">
                  <div className="image">
                    <a href={product.link}>
                      <div className="second-image">
                        <img
                          src={product.imageUrl1}
                          title="Product"
                          alt="Product"
                          className="img-fluid"
                        />
                      </div>
                      <div className="second-image">
                        <img
                          src={product.imageUrl2}
                          title="Product"
                          alt="Product"
                          className="img-fluid"
                        />
                      </div>
                    </a>
                  </div>
                  {/* ... [Your product details, removing PHP and data-oc attributes] ... */}
                </div>
              </div>
              {/* ... [Rest of your form code] ... */}
            </form>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WdSelectedSlider;
