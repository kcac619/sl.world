// components/CategorySlider.js
import React from "react";
import Slider from "react-slick";

// Import Slick CSS (if not already imported in _document.js)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategorySlider = () => {
  const settings = {
    dots: false,
    infinite: false,
    autoplay: false,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1410,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
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

  const categories = [
    {
      imageUrl: "diamond/image/cache/catalog/category/1-270x335.jpg",
      name: "bracelet",
      link: "diamond/index.php?route=product/category&path=57",
    },
    {
      imageUrl: "diamond/image/cache/catalog/category/2-270x335.jpg",
      name: "necklace",
      link: "diamond/index.php?route=product/category&path=25",
    },
    {
      imageUrl: "diamond/image/cache/catalog/category/3-270x335.jpg",
      name: "ring",
      link: "diamond/index.php?route=product/category&path=20",
    },
    {
      imageUrl: "diamond/image/cache/catalog/category/4-270x335.jpg",
      name: "bead",
      link: "diamond/index.php?route=product/category&path=17",
    },
  ];

  return (
    <div className="category-bg">
      <div className="container top-category">
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <div className="category_secheading">
              <h3>Jewellery & Diamonds</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard
                dummy.Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy.
              </p>
              <a className="btn btn-primary btn-section" href="#" tabIndex={0}>
                <span>
                  check more product
                  <img alt="stor-bg" src="image/catalog/stor-bg.svg" />
                </span>
              </a>
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
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
                          <img alt="stor-bg" src="image/catalog/stor-bg.svg" />
                        </a>
                      </div>
                    </h4>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
