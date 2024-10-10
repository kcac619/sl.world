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
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

const Faq = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/faq");
      console.log("response", response);
      if (response.status === 200) {
        if (response.data.data.length > 0) {
          setFaqs(response.data.data);
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
            <Breadcrumb name={"Faq"} />
          </div>
        </div>
        <div className="information">
          <div id="information-information" className="container">
            <div className="container">
              <div className="row">
                <div id="content" className="col">
                  <h1>FAQ</h1>
                  <div className="row">
                  {faqs.map((item, sectionIndex) => (
                    <div className="col-md-4 col-xs-12" key={sectionIndex}>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id={`heading${sectionIndex}`}>
                          <button
                            aria-controls={`collapse${sectionIndex}`}
                            aria-expanded="false"
                            className="accordion-button collapsed"
                            data-bs-target={`#collapse${sectionIndex}`}
                            data-bs-toggle="collapse"
                            type="button"
                          >
                            {item.title}
                          </button>
                        </h2>
                        <div
                          aria-labelledby={`heading${sectionIndex}`}
                          className="accordion-collapse collapse"
                          data-bs-parent="#faqone"
                          id={`collapse${sectionIndex}`}
                        >
                          <div className="accordion-body">
                          
                            <div  dangerouslySetInnerHTML={{ __html: item.description }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </>
    </div>
  );
};

export default Faq;
