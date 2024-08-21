// components/WbSpecialSlider.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
// Import Slick CSS (you might already have this in _document.js)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WbSpecialSlider = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 1,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1600,
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
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    console.log("products", products);
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/products");
      console.log("response", response);
      if (response.status === 200) {
        setProducts(response.data.products);
      } else {
        console.error("Error fetching products:", response.data.error);
        setError("Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wbspecial">
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index} className="col cless">
            <form>
              {/* ... (Your form code, removing any PHP and data-oc attributes) ... */}
              <div className="product-thumb">
                <div className="product-bg">
                  <div className="image">
                    {/* ... [discount % display logic] ... */}
                    {/* {product.DiscountPercentage > 0 && (
                      <span className="discount-onprice">
                        {product.DiscountPercentage}%
                      </span>
                    )} */}
                    <a href={product.Link}>
                      <div className="second-image">
                        <img
                          src={product.Image1Url}
                          title="Specials"
                          alt="Specials"
                          className="img-fluid"
                        />
                      </div>
                      <div className="second-image">
                        <img
                          src={product.Image2Url}
                          title="Specials"
                          alt="Specials"
                          className="img-fluid"
                        />
                      </div>
                    </a>
                  </div>
                  <div className="product-caption">
                    <div className="bran">
                      <span>
                        <a href="" className="textdeb">
                          {product.BrandName}
                        </a>
                      </span>
                    </div>
                    <h4 className="protitle">
                      <a href={product.Link}>{product.ProductName}</a>
                    </h4>
                  </div>
                  {/* ... [Rest of your caption and product details, removing PHP and data-oc attributes] ... */}
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

export default WbSpecialSlider;

// const products = [
//   {
//     imageUrl1: "/image/cache/catalog/product/9/1-1000x1000.png",
//     imageUrl2: "/image/cache/catalog/product/9/2-1000x1000.png",
//     name: "Abigail Moon & Stars Ring",
//     brand: "sunglass",
//     priceNew: "$150.00",
//     priceOld: "$3.00",
//     discount: "46%",
//     link: "https://opencart.workdo.io/diamond/index.php?route=product/product&language=en-gb&product_id=29",
//     sizes: ["xl", "xxl", "xxxl"], // Add size options if needed
//     // ... other product properties
//   },
//   {
//     imageUrl1: "/image/cache/catalog/product/11/1-1000x1000.png",
//     imageUrl2: "/image/cache/catalog/product/11/2-1000x1000.png",
//     name: "Abigail Moon & Stars Ring",
//     brand: "sunglass",
//     priceNew: "$150.00",
//     priceOld: "$3.00",
//     discount: "46%",
//     link: "https://opencart.workdo.io/diamond/index.php?route=product/product&language=en-gb&product_id=29",
//     sizes: ["xl", "xxl", "xxxl"], // Add size options if needed
//     // ... other product properties
//   },
//   {
//     imageUrl1: "/image/cache/catalog/product/7/1-1000x1000.png",
//     imageUrl2: "/image/cache/catalog/product/7/2-1000x1000.png",
//     name: "Abigail Moon & Stars Ring",
//     brand: "sunglass",
//     priceNew: "$150.00",
//     priceOld: "$3.00",
//     discount: "46%",
//     link: "https://opencart.workdo.io/diamond/index.php?route=product/product&language=en-gb&product_id=29",
//     sizes: ["xl", "xxl", "xxxl"], // Add size options if needed
//     // ... other product properties
//   },
//   {
//     imageUrl1: "/image/cache/catalog/product/8/1-1000x1000.png",
//     imageUrl2: "/image/cache/catalog/product/8/2-1000x1000.png",
//     name: "Abigail Moon & Stars Ring",
//     brand: "sunglass",
//     priceNew: "$150.00",
//     priceOld: "$3.00",
//     discount: "46%",
//     link: "https://opencart.workdo.io/diamond/index.php?route=product/product&language=en-gb&product_id=29",
//     sizes: ["xl", "xxl", "xxxl"], // Add size options if needed
//     // ... other product properties
//   },
//   {
//     imageUrl1: "/image/cache/catalog/product/9/1-1000x1000.png",
//     imageUrl2: "/image/cache/catalog/product/9/2-1000x1000.png",
//     name: "Abigail Moon & Stars Ring",
//     brand: "sunglass",
//     priceNew: "$150.00",
//     priceOld: "$3.00",
//     discount: "46%",
//     link: "https://opencart.workdo.io/diamond/index.php?route=product/product&language=en-gb&product_id=29",
//     sizes: ["xl", "xxl", "xxxl"], // Add size options if needed
//     // ... other product properties
//   },
// ];
