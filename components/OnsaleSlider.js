// components/OnsaleSlider.js
import React from "react";
import Slider from "react-slick";

// Import Slick CSS (if not already imported in _document.js)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OnsaleSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
        },
      },
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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

  const products = [
    {
      imageUrl1:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/2/1-1000x1000.png",
      imageUrl2:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/2/2-1000x1000.png",
      brand: "bag",
      name: "heart design pandal chain",
      price: "$1.00",
      description:
        "The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed specifically for the creative professional, this display provides more space for easier access to all the...",
      link: "https://opencart.workdo.io/diamond/index.php?route=product/product&language=en-gb&product_id=42",
      sizes: ["m", "s"],
    },
    {
      imageUrl1:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/11/1-1000x1000.png",
      imageUrl2:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/11/2-1000x1000.png",
      brand: "cloths",
      name: "Crystal Gym & Fitness Glove",
      price: "$1.00",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
      link: "https://opencart.workdo.io/diamond/index.php?route=product/product&language=en-gb&product_id=30",
      sizes: ["l", "m"],
    },
    {
      imageUrl1:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/1/1-1000x1000.png",
      imageUrl2:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/1/2-1000x1000.png",
      brand: "shoes",
      name: "Abigail Moon & Stars Ring",
      price: "$1.00",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
      link: "https://opencart.workdo.io/diamond/index.php?route=product/product&language=en-gb&product_id=28",
      sizes: ["m", "s", "l"],
    },
    {
      imageUrl1:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/13/1-1000x1000.png",
      imageUrl2:
        "https://opencart.workdo.io/diamond/image/cache/catalog/product/13/2-1000x1000.png",
      brand: "bag",
      name: "golden ring",
      price: "$1.00",
      description:
        "Born to be worn. Clip on the worlds most wearable music player and take up to 240 songs with you anywhere. Choose from five colors including four new hues to make your musical fashion statement. R..",
      link: "https://opencart.workdo.io/diamond/index.php?route=product/product&language=en-gb&product_id=34",
      sizes: ["xl", "xxl"],
    },
    // ... Add more product data
  ];

  return (
    <div className="wdonsale" style={{ display: "block" }}>
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index} className="col cless">
            <form>
              {/* ... [Your form code, removing PHP and data-oc attributes] ... */}
              <div className="product-thumb">
                <div className="product-bg">
                  <div className="image">
                    {/* ... [Your discount logic (if any)] ... */}
                    <a href={product.link}>
                      <div className="second-image">
                        <img
                          src={product.imageUrl1}
                          alt={product.name}
                          className="img-fluid"
                        />
                      </div>
                      <div className="second-image">
                        <img
                          src={product.imageUrl2}
                          alt={product.name}
                          className="img-fluid"
                        />
                      </div>
                    </a>
                  </div>
                  {/* ... [Your product details, removing PHP and data-oc attributes] ... */}
                  <div className="caption">
                    {/* ...  */}
                    <div className="price">
                      <span className="price-new">{product.price}</span>
                    </div>
                    <p className="catlist-des">{product.description}</p>
                    {/* ... [Your size options logic (if any)] ... */}
                    {/* ...  */}
                  </div>
                  {/* ... [Rest of your product details] ... */}
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

export default OnsaleSlider;
