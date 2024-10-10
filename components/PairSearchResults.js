"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { addToCart } from "../utils/cartfns";
import { Skeleton } from "@chakra-ui/react";
import useCartStore from "../utils/cartStore";

const PairSearchResults = ({ pairs, isLoading, error }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCartFromStore = useCartStore((state) => state.addToCart);

  const handleAddToCart = (pair) => {
    pair.solitaires.forEach((solitaire) => {
      addToCartFromStore({ ...solitaire, quantity: pair.quantity });
    });
  };
  console.log(pairs);

  if (isLoading) {
    return (
      <div className="row">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="product-block cless">
              <div className="blogshadow blog-thumbnail">
                <div className="card-body">
                  <Skeleton height="150px" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="table-responsive">
      <table
        className="table table-striped table-hover table-dark"
        style={{
          fontFamily: "Outfit, Roboto, sans-serif",
          borderCollapse: "separate",
          borderSpacing: "0 10px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#343a40", borderRadius: "8px" }}>
            <th style={{ padding: "12px 15px" }}>
              Pair ID <i className="fas fa-sort"></i>
            </th>
            <th style={{ padding: "12px 15px" }}>
              Pair Name <i className="fas fa-sort"></i>
            </th>
            <th style={{ padding: "12px 15px" }}>
              Solitaire 1 <i className="fas fa-sort"></i>
            </th>
            <th style={{ padding: "12px 15px" }}>
              Solitaire 2 <i className="fas fa-sort"></i>
            </th>
            <th style={{ padding: "12px 15px" }}>
              Action <i className="fas fa-sort"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((pair) => (
            <tr
              key={pair.PairID}
              style={{
                backgroundColor: "#212529",
                borderRadius: "8px",
                marginBottom: "10px",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#343a40")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#212529")
              }
            >
              <td style={{ padding: "12px 15px" }}>{pair.PairID}</td>
              <td style={{ padding: "12px 15px" }}>{pair.PairName}</td>
              <td style={{ padding: "12px 15px" }}>{pair.Solitaire1Name}</td>
              <td style={{ padding: "12px 15px" }}>{pair.Solitaire2Name}</td>
              <td style={{ padding: "12px 15px" }}>
                <Link href={`/pair/${pair.Slug}`}>
                  <div className="btn btn-primary">View Details</div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PairSearchResults;
