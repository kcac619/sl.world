// components/WdCategorySlider.js
import React from "react";
import Slider from "react-slick";

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

  const categories = [
    {
      imageUrl:
        "https://opencart.workdo.io/diamond/image/cache/catalog/category/1-270x335.jpg",
      name: "bracelet",
      link: "https://opencart.workdo.io/diamond/index.php?route=product/category&path=57",
      description: "A beautiful collection of bracelets for every occasion.",
    },
    {
      imageUrl:
        "https://opencart.workdo.io/diamond/image/cache/catalog/category/2-270x335.jpg",
      name: "necklace",
      link: "https://opencart.workdo.io/diamond/index.php?route=product/category&path=25",
      description:
        "Explore our stunning range of necklaces, from classic to modern.",
    },
    {
      imageUrl:
        "https://opencart.workdo.io/diamond/image/cache/catalog/category/3-270x335.jpg",
      name: "ring",
      link: "https://opencart.workdo.io/diamond/index.php?route=product/category&path=20",
      description:
        "Find the perfect ring for any occasion - engagement, wedding, or everyday wear.",
    },
    {
      imageUrl:
        "https://opencart.workdo.io/diamond/image/cache/catalog/category/4-270x335.jpg",
      name: "bead",
      link: "https://opencart.workdo.io/diamond/index.php?route=product/category&path=17",
      description:
        "Browse our collection of beautiful beads for jewelry making and crafting.",
    },
    // ... add more categories
  ];

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
                  <img alt="stor-bg" src="image/catalog/stor-bg.svg" />
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
