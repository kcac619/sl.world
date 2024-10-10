"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

import useCartStore from "../../utils/cartStore";

const PairDetails = () => {
  const router = useRouter();
  const { pairSlug } = router.query;

  const [pair, setPair] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Zustand store
  const { cartItems, addToCart, removeFromCart } = useCartStore();
  const [isPairInCart, setIsPairInCart] = useState(false);

  useEffect(() => {
    if (pairSlug) {
      fetchPairDetails(pairSlug);
    }
  }, [pairSlug]);

  // Check if this pair is in the cart
  useEffect(() => {
    if (pair) {
      const pairIdentifier = `${pair.solitaires[0]?.SolitaireID}-${pair.solitaires[1]?.SolitaireID}`;
      setIsPairInCart(
        cartItems.some((item) => item.pairIdentifier === pairIdentifier)
      );
    }
  }, [cartItems, pair]);

  const fetchPairDetails = async (slug) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/pair/${slug}`);

      if (response.status === 200) {
        setPair(response.data.pair);
      } else {
        console.error("Error fetching pair details:", response.data.error);
        setError("Error fetching pair details.");
      }
    } catch (error) {
      console.error("Error fetching pair details:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value) || 1);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    pair.solitaires.forEach((solitaire) => {
      addToCart({ ...solitaire, quantity });
    });
    setIsPairInCart(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pair) {
    return <div>Pair not found.</div>;
  }

  return (
    <div>
      <Head>
        <title>{pair.PairName} - Diamond Store</title>
      </Head>

      <main className="bg-sub-color text-main-color py-4">
        <div className="container">
          <div className="row">
            {pair.solitaires.map((solitaire, index) => (
              <div key={index} className="col-12 col-md-6 mb-4">
                <div
                  className="card h-100 bg-main-color text-sub-color"
                  style={{
                    //if index == 0 then border right is main color 2px
                    borderRight:
                      index === 0 ? "2px solid var(--main-color)" : "none",
                    paddingRight: "5px",
                  }}
                >
                  <div className="card-body d-flex flex-column">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                        height: "250px", // Fixed height for the image container
                      }}
                    >
                      <img
                        src={solitaire.Image1}
                        alt={solitaire.SolitaireName}
                        className="img-fluid"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "contain",
                          backgroundColor: "var(--white)",
                          border: "2px solid var(--main-color)",
                          borderRadius: "10px",
                          padding: "0px",
                        }}
                      />
                    </div>
                    <h5
                      style={{ color: "var(--main-color)" }}
                      className="card-title text-center mb-3"
                    >
                      {solitaire.SolitaireName}
                    </h5>
                    <div className="row">
                      {[
                        {
                          icon: "fas fa-gem",
                          label: "Shape",
                          value: solitaire.ShapeName,
                        },
                        {
                          icon: "fas fa-balance-scale-left",
                          label: "Carat",
                          value: solitaire.Carat,
                        },
                        {
                          icon: "fas fa-palette",
                          label: "Color",
                          value: solitaire.ColorName,
                        },
                        {
                          icon: "fas fa-search-plus",
                          label: "Clarity",
                          value: solitaire.PurityName,
                        },
                        {
                          icon: "fas fa-cut",
                          label: "Cut",
                          value: solitaire.CutName,
                        },
                        {
                          icon: "fas fa-flask",
                          label: "Lab",
                          value: solitaire.LabName,
                        },
                        {
                          icon: "fas fa-magic",
                          label: "Polish",
                          value: solitaire.PolishName,
                        },
                        {
                          icon: "fas fa-arrows-alt-h",
                          label: "Symmetry",
                          value: solitaire.SymmetryName,
                        },
                        {
                          icon: "fas fa-map-marker-alt",
                          label: "Location",
                          value: solitaire.LocationName,
                        },
                      ].map((item, i) => (
                        <div key={i} className="col-6 mb-2">
                          <div className="d-flex align-items-center">
                            <i
                              className={`${item.icon} me-2`}
                              style={{ width: "20px", textAlign: "center" }}
                            ></i>
                            <span className="me-1">{item.label}:</span>
                            <span className="ms-auto">{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* {if index == 0 insert a vertical line of main color} */}
                {/* {index === 0 && (
                  <div
                    className="d-flex flex-column align-items-center"
                    style={{
                      position: "absolute",
                      top: "40%",
                      left: "50%",

                      transform: "translate(-50%, -50%)",
                      width: "2px",
                      height: "40%",
                      backgroundColor: "var(--main-color)",
                    }}
                  ></div>
                )} */}
              </div>
            ))}
          </div>

          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-12 col-sm-6 col-md-4 mb-2">
              <Link href={"/certificate"} className="btn btn-primary w-100">
                View Certificate
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-2">
              <Link href={`/video`} className="btn btn-primary w-100">
                View Video
              </Link>
            </div>
          </div>

          <div className="row justify-content-center align-items-center mt-4">
            <div className="col-12 col-sm-auto mb-2">
              <label htmlFor="input-quantity" className="me-2">
                Qty
              </label>
              <div className="input-group">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  disabled={quantity === 1}
                  onClick={decreaseQuantity}
                >
                  <span className="fa fa-minus"></span>
                </button>
                <input
                  id="input-quantity-pair"
                  type="text"
                  name="quantity"
                  value={quantity}
                  className="form-control text-center"
                  style={{ width: "50px" }}
                  onChange={handleQuantityChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={increaseQuantity}
                >
                  <span className="fa fa-plus"></span>
                </button>
              </div>
            </div>
            <div className="col-12 col-sm-auto mb-2">
              {isPairInCart ? (
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  <button className="btn btn-secondary me-2 mb-2" disabled>
                    Already in cart!
                  </button>
                  <Link href="/cart" className="btn btn-primary mb-2">
                    Open Cart
                    <i className="fas fa-store ms-2"></i>
                  </Link>
                </div>
              ) : (
                <button onClick={handleAddToCart} className="btn btn-primary">
                  Add Pair to Cart
                  <i className="fas fa-store ms-2"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PairDetails;
