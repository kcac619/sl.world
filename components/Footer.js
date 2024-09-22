
import Link from "next/link";
import OfferBannerSlider from "@/components/OfferBannerSlider";

const Footer = () => {
 

  return (
    <footer>
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="offer-banner">
                  <div className="container">
                    <div className="row">
                      <div className="offer_ctn heading">
                        <span>Subscribe our channel</span>
                      </div>
                      <OfferBannerSlider />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="middle-footer">
              <div className="row frist_row">
                <div className="col-md-9 col-xs-12">
                  <div className="foottop-link">
                    <a href="#">ring</a>
                    <a href="#">engagement</a>
                    <a href="#">watches</a>
                    <a href="#">necklace</a>
                  </div>
                </div>
                <div className="col-md-3 col-xs-12">
                  <div id="logo">
                    <Link href="/">
                      <h4 style={{ color: "var(--main-color)" }}>HKSURANA</h4>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-12 news-lborder">
                  <aside id="column-left1">
                    <div className="newsletter">
                      <div className="container news">
                        <div className="row">
                          <div className="col-xs-12 news-ctn">
                            <div
                              className="workdo-newsletter  workdo-newsletter"
                              id="newsletter_1722830721"
                              data-mode="default"
                            >
                              <form
                                id="formNewLestter"
                                method="post"
                                action="https://opencart.workdo.io/diamond/index.php?route=extension/Workdonewsletter/module/workdonewsletter|subscribe"
                                className="formNewLestter newsletter-bg"
                              >
                                <div className="inner">
                                  <div className="news-txt">
                                    <h2>
                                      <b>Subscribe newsletter and </b> get -20%
                                      off
                                    </h2>
                                    <div className="news-p">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry. Lorem
                                      Ipsum has been the industry's standard
                                      dummy.
                                    </div>
                                  </div>
                                  <div className="new-from">
                                    <div className="field">
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          className="form-control input-md inputNew"
                                          onblur="javascript:if(this.value=='')this.value='Type your address email...';"
                                          onfocus="javascript:if(this.value=='Type your address email...')this.value='';"
                                          defaultValue="Type your address email..."
                                          size={18}
                                          name="email"
                                        />
                                      </div>
                                      <div className="button-submit">
                                        <button
                                          type="submit"
                                          name="submitNewsletter"
                                          className="btn btn-danger newsbtn"
                                        >
                                          <i className="fa fa-angle-double-right" />
                                        </button>
                                      </div>
                                    </div>
                                    <input
                                      type="hidden"
                                      defaultValue={1}
                                      name="action"
                                    />
                                    <div className="valid" />
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
                <div className="col-md-3 col-sm-12 lborder">
                  <h5>
                    Shop
                    <button
                      type="button"
                      className="btn toggle collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#info"
                    />
                  </h5>
                  <div id="info" className="collapse footer-collapse">
                    <ul className="list-unstyled">
                      <li>
                        <a href="https://opencart.workdo.io/diamond/index.php?route=information/information&language=en-gb&information_id=5">
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a href="https://opencart.workdo.io/diamond/index.php?route=information/information&language=en-gb&information_id=2">
                          Terms &amp; Conditions
                        </a>
                      </li>
                      <li>
                        <a href="https://opencart.workdo.io/diamond/index.php?route=information/information&language=en-gb&information_id=4">
                          Delivery Information
                        </a>
                      </li>
                      <li>
                        <a href="https://opencart.workdo.io/diamond/index.php?route=information/information&language=en-gb&information_id=1">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="https://opencart.workdo.io/diamond/index.php?route=information/information&language=en-gb&information_id=3">
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href="https://opencart.workdo.io/diamond/index.php?route=product/manufacturer&language=en-gb">
                          Brands
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 lborder">
                  <h5>
                    Account
                    <button
                      type="button"
                      className="btn toggle collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#account"
                    />
                  </h5>
                  <div id="account" className="collapse footer-collapse">
                    <ul className="list-unstyled">
                      <li>
                        <a href="https://opencart.workdo.io/diamond/index.php?route=account/account&language=en-gb">
                          Account
                        </a>
                      </li>
                      <li>
                        <a href="https://opencart.workdo.io/diamond/index.php?route=account/order&language=en-gb">
                          Order History
                        </a>
                      </li>
                      <li>
                        <a href="https://opencart.workdo.io/diamond/index.php?route=account/wishlist&language=en-gb">
                          Wish List
                        </a>
                      </li>
                      <li>
                        <a href="https://opencart.workdo.io/diamond/index.php?route=account/newsletter&language=en-gb">
                          Newsletter
                        </a>
                      </li>
                      <li>
                        <a href="https://opencart.workdo.io/diamond/index.php?route=product/special&language=en-gb">
                          Specials
                        </a>
                      </li>
                      <li>
                        <a href="https://opencart.workdo.io/diamond/index.php?route=information/contact&language=en-gb">
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-sm-12 lborder">
                  <aside id="column-left" className="d-md-block">
                    <div>
                      <h5>share</h5>
                      <ul className="list-unstyled fsocial list-inline text-left social-media">
                        <li className="youtube">
                          <a href="#">
                            <svg>
                              <use xlinkHref="#youtube" />
                            </svg>
                          </a>
                        </li>
                        <li className="massage">
                          <a href="#">
                            <svg>
                              <use xlinkHref="#massage" />
                            </svg>
                          </a>
                        </li>
                        <li className="instagram">
                          <a href="#">
                            <svg>
                              <use xlinkHref="#instagram" />
                            </svg>
                          </a>
                        </li>
                        <li className="twitter">
                          <a href="#">
                            <svg>
                              <use xlinkHref="#twitter" />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
          <div className="foot-bot">
            <div className="container">
              <div className="row">
                <div className="col-md-6 copy text-start">
                  <p>
                    Powered By <a href="#">OpenCart</a> diamond © 2024
                  </p>
                </div>
                <div className="col-md-6 text-end">
                  <div className="foot-link">
                    <a href="#">about us</a>
                    <a href="#">career</a>
                    <a href="#">support</a>
                    <a href="#">information</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*
OpenCart is open source software and you are free to remove the powered by OpenCart if you want, but its generally accepted practise to make a small donation.
Please donate via PayPal to donate@opencart.com
//*/}
        </footer>
  );
};

export default Footer;
