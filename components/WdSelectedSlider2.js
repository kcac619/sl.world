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
    autoplay: false,
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
      imageUrl1:
        "https://img.freepik.com/free-photo/precious-necklace-decorated-with-gemstones-lights-isolated_181624-28431.jpg",
      imageUrl2:
        "https://img.freepik.com/free-photo/precious-necklace-decorated-with-gemstones-lights-isolated_181624-28431.jpg",
      name: "Abigail Moon & Stars Ring",
      brand: "shoes", // Assuming brand is the manufacturer name
      price: "$1.00",
      link: "diamond/index.php?route=product/product&language=en-gb&product_id=28",
      // ... other product properties
    },
    {
      imageUrl1:
        "https://img.freepik.com/free-photo/beautiful-luxury-necklace-jewelry-stand-neck_1339-7953.jpg",
      imageUrl2:
        "https://img.freepik.com/free-photo/beautiful-luxury-necklace-jewelry-stand-neck_1339-7953.jpg",
      name: "Abigail Moon & Stars Ring",
      brand: "shoes", // Assuming brand is the manufacturer name
      price: "$1.00",
      link: "diamond/index.php?route=product/product&language=en-gb&product_id=28",
      // ... other product properties
    },
    {
      imageUrl1:
        "https://img.freepik.com/free-photo/precious-necklace-decorated-with-gemstones-lights-isolated_181624-28431.jpg",
      imageUrl2:
        "https://img.freepik.com/free-photo/precious-necklace-decorated-with-gemstones-lights-isolated_181624-28431.jpg",
      name: "Abigail Moon & Stars Ring",
      brand: "shoes", // Assuming brand is the manufacturer name
      price: "$1.00",
      link: "diamond/index.php?route=product/product&language=en-gb&product_id=28",
      // ... other product properties
    },
    {
      imageUrl1:
        "https://img.freepik.com/free-photo/beautiful-luxury-necklace-jewelry-stand-neck_1339-7953.jpg",
      imageUrl2:
        "https://img.freepik.com/free-photo/beautiful-luxury-necklace-jewelry-stand-neck_1339-7953.jpg",
      name: "Abigail Moon & Stars Ring",
      brand: "shoes", // Assuming brand is the manufacturer name
      price: "$1.00",
      link: "diamond/index.php?route=product/product&language=en-gb&product_id=28",
      // ... other product properties
    },
    {
      imageUrl1:
        "https://img.freepik.com/free-photo/precious-necklace-decorated-with-gemstones-lights-isolated_181624-28431.jpg",
      imageUrl2:
        "https://img.freepik.com/free-photo/precious-necklace-decorated-with-gemstones-lights-isolated_181624-28431.jpg",
      name: "Abigail Moon & Stars Ring",
      brand: "shoes", // Assuming brand is the manufacturer name
      price: "$1.00",
      link: "diamond/index.php?route=product/product&language=en-gb&product_id=28",
      // ... other product properties
    },
    {
      imageUrl1:
        "https://img.freepik.com/free-photo/beautiful-luxury-necklace-jewelry-stand-neck_1339-7953.jpg",
      imageUrl2:
        "https://img.freepik.com/free-photo/beautiful-luxury-necklace-jewelry-stand-neck_1339-7953.jpg",
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
                    <div className="image-container">
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
