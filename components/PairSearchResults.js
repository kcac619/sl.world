"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Skeleton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import useCartStore from "../utils/cartStore";

const PairSearchResults = ({ pairs, isLoading, error }) => {
  const [selectedPair, setSelectedPair] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePreview = (pair) => {
    setSelectedPair(pair);
    onOpen();
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="table-responsive">
      <table
        className="table table-striped table-hover"
        style={{
          fontFamily: "Outfit, Roboto, sans-serif",
          backgroundColor: "var(--main-color)",
          color: "var(--sub-color)",
          borderCollapse: "separate",
          borderSpacing: "0 10px",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "var(--main-color)",
              color: "var(--sub-color)",
              borderRadius: "8px",
            }}
          >
            <th style={{ padding: "12px 15px", color: "var(--sub-color)" }}>
              Pair ID <i className="fas fa-sort"></i>
            </th>
            <th style={{ padding: "12px 15px", color: "var(--sub-color)" }}>
              Pair Name <i className="fas fa-sort"></i>
            </th>
            <th style={{ padding: "12px 15px", color: "var(--sub-color)" }}>
              Solitaire 1 <i className="fas fa-sort"></i>
            </th>
            <th style={{ padding: "12px 15px", color: "var(--sub-color)" }}>
              Solitaire 2 <i className="fas fa-sort"></i>
            </th>
            <th style={{ padding: "12px 15px", color: "var(--sub-color)" }}>
              Action <i className="fas fa-sort"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? [...Array(5)].map((_, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: "var(--main-color)",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <td style={{ padding: "12px 15px" }}>
                    <Skeleton height="20px" width="100%" />
                  </td>
                  <td style={{ padding: "12px 15px" }}>
                    <Skeleton height="20px" width="100%" />
                  </td>
                  <td style={{ padding: "12px 15px" }}>
                    <Skeleton height="20px" width="100%" />
                  </td>
                  <td style={{ padding: "12px 15px" }}>
                    <Skeleton height="20px" width="100%" />
                  </td>
                  <td style={{ padding: "12px 15px" }}>
                    <Skeleton height="20px" width="100%" />
                  </td>
                </tr>
              ))
            : pairs.map((pair) => (
                <tr
                  key={pair.PairID}
                  style={{
                    backgroundColor: "var(--main-color)",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--sub-color)";
                    e.currentTarget.style.color = "var(--main-color)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--main-color)";
                    e.currentTarget.style.color = "black";
                  }}
                >
                  <td style={{ padding: "12px 15px" }}>{pair.PairID}</td>
                  <td style={{ padding: "12px 15px" }}>{pair.PairName}</td>
                  <td style={{ padding: "12px 15px" }}>
                    {pair.Solitaire1Name}
                  </td>
                  <td style={{ padding: "12px 15px" }}>
                    {pair.Solitaire2Name}
                  </td>
                  <td style={{ padding: "12px 15px" }}>
                    <span style={{}}>
                      <span
                        style={{
                          cursor: "pointer",
                          fontStyle: "bold",
                          textDecoration: "underline",
                        }}
                        onClick={() => handlePreview(pair)}
                      >
                        Preview
                      </span>{" "}
                      |{" "}
                      <Link href={`/pair/${pair.Slug}`}>
                        <span
                          style={{
                            fontStyle: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Details
                        </span>
                      </Link>
                    </span>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={{ base: "full", md: "md", lg: "lg" }}
      >
        <DrawerOverlay />
        <DrawerContent maxWidth={{ base: "100%", md: "50%", lg: "50%" }}>
          <DrawerCloseButton />
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor="var(--main-color)"
            textAlign="center"
          >
            Pair Preview
          </DrawerHeader>

          <DrawerBody bg="var(--sub-color)" color="var(--main-color)">
            {selectedPair && (
              <div>
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    color: "var(--main-color)",
                  }}
                >
                  {selectedPair.PairName}
                </h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <h4
                      style={{
                        marginBottom: "10px",
                        color: "var(--main-color)",
                      }}
                    >
                      {selectedPair.Solitaire1Name}
                    </h4>
                    <img
                      src={selectedPair.Solitaire1Image1}
                      alt={selectedPair.Solitaire1Name}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "8px",
                        border: "2px solid var(--main-color)",
                        display: "block",
                        margin: "40px auto",
                      }}
                    />
                    <p style={{ fontSize: "14px", marginTop: "30px" }}>
                      Carat: {selectedPair.Solitaire1Carat}
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      Color: {selectedPair.Solitaire1ColorName}
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      Shape: {selectedPair.Solitaire1ShapeName}
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <h4
                      style={{
                        marginBottom: "10px",
                        color: "var(--main-color)",
                      }}
                    >
                      {selectedPair.Solitaire2Name}
                    </h4>
                    <img
                      src={selectedPair.Solitaire2Image1}
                      alt={selectedPair.Solitaire2Name}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "8px",
                        border: "2px solid var(--main-color)",
                        display: "block",
                        margin: "40px auto",
                      }}
                    />
                    <p style={{ fontSize: "14px", marginTop: "30px" }}>
                      Carat: {selectedPair.Solitaire2Carat}
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      Color: {selectedPair.Solitaire2ColorName}
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      Shape: {selectedPair.Solitaire2ShapeName}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PairSearchResults;
