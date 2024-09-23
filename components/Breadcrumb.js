
import Link from "next/link";


const Breadcrumb = ({ name, description }) => {
 

  return (
    <div className="">
    {/* Breadcrumb */}
    <div className="d-flex justify-content-between align-items-center back-page">
      <div className="">
        <div className="back-to-home">
          <a href="">
            <img src="/img/back-to-home.svg" alt="Back to home" />{" "}
            &nbsp; <span> Back to category</span>
          </a>
        </div>
      </div>
      <div className="">
        <ul className="breadcrumb ">
          <li className="breadcrumb-item">
            <a href="https://opencart.workdo.io/diamond/index.php?route=common/home&amp;language=en-gb">
              <i className="fas fa-home"></i>
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href="https://opencart.workdo.io/diamond/index.php?route=product/category&amp;language=en-gb&amp;path=67">
              {name}
            </a>
          </li>
        </ul>
      </div>
    </div>
    {/* Breadcrumb end */}
    <div className="cate-top">
      <h2 className="cat-title"> {name}</h2>
      <div class="cat-desc row">
        <div class="col-sm-12">
          <p> {description}</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Breadcrumb;
