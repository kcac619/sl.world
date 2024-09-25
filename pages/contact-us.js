import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import MainSlider from "@/components/MainSlider";
import Breadcrumb from "../components/Breadcrumb";
import BlogSlider from "@/components/BlogSlider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Category from "../components/Category";
import axios from "axios";

const Contact = () => {
  const [isLoadingSlider, setIsLoadingSlider] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorSlider, setErrorSlider] = useState(null);
  const [page, setPage] = useState({});
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "/api/pages?slug=privacy-policy"
      );
      console.log("response", response);
      if (response.status === 200) {
        if(response.data.data.length>0){
          setPage(response.data.data[0]);
        }
       
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
    <div>
      <>
      
        <div className="contact-top-bg pb-30">
          <div className="container">
            <Breadcrumb name={"Contact Us"} />
          </div>
        </div>
        <div id="information-contact" className="container">
      <div className="row">
        <div id="content" className="col">
          <div className="row">
            <div className="col-md-6 col-xs-12 wbcntleft">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 col-xs-12">
                      <div className="contact-store-information">
                        <h4>Telephone</h4>
                        <div className="store-inf">610-403-403</div>
                      </div>
                      <div className="contact-store-information">
                        <h4>Email</h4>
                        <div className="store-inf">shop@company.com</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-xs-12 store-add">
                      <div className="contact-store-information">
                        <h4>Address</h4>
                        <div className="store-inf">
                          diamond
                          <address>
                            9070 Green Lake Drive Chevy Chase, MD 20815, USA
                          </address>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <strong></strong>
                    <br />
                    <br />
                    <br />
                  </div>
                  <div className="col-sm-3"></div>
                </div>
              </div>
            </div>
            <div className="contact col-md-6 col-xs-12">
              <h3 className="other-title">Contact Form</h3>
              <form
                id="form-contact"
                action="https://opencart.workdo.io/diamond/index.php?route=information/contact|send&amp;language=en-gb"
                method="post"
                data-oc-toggle="ajax"
              >
                <fieldset>
                  <div className="mb-3 required">
                    <label htmlFor="input-name" className="col-form-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="input-name"
                      className="form-control"
                    />
                    <div id="error-name" className="invalid-feedback"></div>
                  </div>
                  <div className="mb-3 required">
                    <label htmlFor="input-email" className="col-form-label">
                      E-Mail Address
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="input-email"
                      className="form-control"
                    />
                    <div id="error-email" className="invalid-feedback"></div>
                  </div>
                  <div className="mb-3 required">
                    <label htmlFor="input-enquiry" className="col-form-label">
                      Enquiry
                    </label>
                    <textarea
                      name="enquiry"
                      rows="10"
                      id="input-enquiry"
                      className="form-control"
                    ></textarea>
                    <div id="error-enquiry" className="invalid-feedback"></div>
                  </div>
                </fieldset>
                <div className="d-inline-block pt-2 pd-2 w-100">
                  <div className="text-end">
                    <button style={{ minWidth: "100%" }}   type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      
      </>
    </div>
  );
};

export default Contact;
