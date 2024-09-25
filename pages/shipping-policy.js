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

const ShippingPolicy = () => {
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
        "/api/pages?slug=shipping-policy"
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
            <Breadcrumb name={"Privacy Policy"} />
          </div>
        </div>
        <div className="information">
          <div id="information-information" className="container">
            {/* Breadcrumb */}
            {/* Breadcrumb end */}
            <div className="row">
              <div id="content" className="col">
                <h1>{page.title}</h1>
                
                <div className="row" dangerouslySetInnerHTML={{ __html: page.description }}></div>
              </div>
            </div>
          </div>
        </div>
       
      </>
    </div>
  );
};

export default ShippingPolicy;
