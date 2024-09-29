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

import Image from 'next/image';

const AboutUs = () => {
  return (
    <div>
      <>
    <div className="contact-top-bg pb-30">
    <div className="container">
      <Breadcrumb name={"About Us"} />
    </div>
  </div>
    <div className="information">
      <div id="information-information" className="container">
        {/* Breadcrumb */}
        {/* Breadcrumb end */}
        <div className="row">
          <div id="content" className="col">
            <h1>About Us</h1>
            <div className="about-us">
              <div className="row about-one">
                <h3>About our shop</h3>
                <div className="col-md-6 col-xs-12">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
                <div className="col-md-6 col-xs-12">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
              <div className="row about-two">
                <h3 className="text-center">About our shop</h3>
                <div className="col-md-6 col-xs-12">
                  <h4>About our shop</h4>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem
                  </p>
                  <p>
                    Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
                  </p>
                </div>
                <div className="col-md-6 col-xs-12">
                  <Image alt="about" className="img img-fluid center-block" src="/images/about-2.jpg" width={500} height={300} />
                </div>
              </div>
              <div className="row about-three">
                <div className="col-md-6 col-xs-12">
                  <Image alt="about" className="img img-fluid center-block" src="/images/about-1.jpg" width={500} height={300} />
                </div>
                <div className="col-md-6 col-xs-12">
                  <h4>About our shop</h4>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem
                  </p>
                  <p>
                    Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
                  </p>
                </div>
              </div>
              <div className="row about-bottom">
                <h3>About our shop</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                </p>
                <div className="col-md-4">
                  <div className="about-sup">
                    <h4>Fast delivery</h4>
                    <Image alt="icon" src="/images/icon1.svg" width={50} height={50} />
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="about-sup">
                    <h4>Many offers</h4>
                    <Image alt="icon" src="/images/icon2.svg" width={50} height={50} />
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="about-sup">
                    <h4>24/7 support</h4>
                    <Image alt="icon" src="/images/icon3.svg" width={50} height={50} />
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                  </div>
                </div>
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

export default AboutUs;
