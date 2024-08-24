import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import {
  getCartItemsFromLocalStorage,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../utils/cartfns";

const SearchResults = () => {
  const router = useRouter();
  const filters = useSelector((state) => state.filters);
  const [solitaires, setSolitaires] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllSolitaires, setShowAllSolitaires] = useState(false);
  const [error, setError] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // To track total pages
  const [isFetching, setIsFetching] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const solitairesPerPage = 15;

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const updateCart = () => {
      setCartItems(getCartItemsFromLocalStorage());
    };

    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  useEffect(() => {
    // Fetch cart items from localStorage when the component mounts
    setCartItems(getCartItemsFromLocalStorage());
  }, []);

  const handleAddToCart = (solitaire) => {
    addToCart({ ...solitaire, quantity: 1 });
    setCartItems(getCartItemsFromLocalStorage());
  };

  const fetchSolitaires = async (pageNumber = currentPage) => {
    // if (isFetching) return;
    setIsLoading(true);
    setShowLoading(true);
    // setIsFetching(true);
    try {
      const response = await axios.get("/api/searchsolitaire", {
        params: {
          pageNumber: pageNumber,
          pageSize: solitairesPerPage,
        },
      });
      // console.log("response", response);
      if (response.data.statusid === 1) {
        console.log("solitaires", response.data.solitaires);
        setSolitaires((prevSolitaires) => [
          ...prevSolitaires,
          ...response.data.solitaires,
        ]);
        // console.log("after set solitaires", solitaires);
        // setTotalPages(
        //   Math.ceil(Number(response.data.totalcount) / solitairesPerPage)
        // );
      }
    } catch (error) {
      console.error("Error fetching solitaires:", error);
      setError("Error fetching solitaires. Please try again later.");
    } finally {
      setIsLoading(false);
      setShowLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setShowLoading(true);
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPage, showAllSolitaires]);

  useEffect(() => {
    // Clear callbackUrl from query parameters
    if (router.query.callbackUrl) {
      router.replace(
        {
          pathname: router.pathname,
          query: {}, // Remove all query parameters
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router]); // Run this effect when the router changes

  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    // if (!hasFetchedData) {
    // Only fetch if data hasn't been fetched yet
    fetchSolitaires();
    // setHasFetchedData(true);
    // }
  }, []);

  const isSolitaireMatch = (solitaire) => {
    const caratMatch = filters.carat.some((caratValue) => {
      if (typeof caratValue === "number") {
        return solitaire.Carat <= caratValue;
      }
      return false;
    });

    const validFilters = Object.fromEntries(
      Object.entries(filters).map(([key, values]) => [
        key,
        Array.isArray(values) && values.length > 0
          ? values.filter((value) => value !== undefined)
          : values,
      ])
    );

    const shapeMatch =
      validFilters.shape.length > 0 &&
      validFilters.shape.includes(solitaire.ShapeName);
    const colorMatch =
      validFilters.color.length > 0 &&
      validFilters.color.includes(solitaire.ColorName);
    const fluorMatch =
      validFilters.fluor.length > 0 &&
      validFilters.fluor.includes(solitaire.FluorName);
    const clarityMatch =
      validFilters.clarity.length > 0 &&
      validFilters.clarity.includes(solitaire.PurityName);
    const cutMatch =
      validFilters.cut.length > 0 &&
      validFilters.cut.includes(solitaire.CutName);
    const labMatch =
      validFilters.lab.length > 0 &&
      validFilters.lab.includes(solitaire.LabName);
    const polishMatch =
      validFilters.polish.length > 0 &&
      validFilters.polish.includes(solitaire.PolishName);
    const symmMatch =
      validFilters.symm.length > 0 &&
      validFilters.symm.includes(solitaire.SymmetryName);
    const locationMatch =
      validFilters.location.length > 0 &&
      validFilters.location.includes(solitaire.LocationName);

    return (
      caratMatch ||
      shapeMatch ||
      colorMatch ||
      fluorMatch ||
      clarityMatch ||
      cutMatch ||
      labMatch ||
      polishMatch ||
      symmMatch ||
      locationMatch
    );
  };

  // Filter solitaires after fetching
  const matchedSolitaires = solitaires.filter(isSolitaireMatch);
  const indexOfLastSolitaire = currentPage * solitairesPerPage;
  const indexOfFirstSolitaire = indexOfLastSolitaire - solitairesPerPage;
  const currentSolitaires = showAllSolitaires
    ? solitaires.slice(indexOfFirstSolitaire, indexOfLastSolitaire)
    : matchedSolitaires.slice(indexOfFirstSolitaire, indexOfLastSolitaire);

  const handleSort = (column) => {
    // ... [Your existing sorting logic] ...
  };

  // const fetchNextPage = () => {
  //   if (currentPage < totalPages && hasFetchedData && !isFetching) {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //     fetchSolitaires(currentPage + 1);
  //   }
  // };

  // // Scroll to bottom listener for lazy loading
  // const scrollRef = useRef(null);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (scrollRef.current) {
  //       const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;

  //       console.log("Scroll Top:", scrollTop);
  //       console.log("Client Height:", clientHeight);
  //       console.log("Scroll Height:", scrollHeight);

  //       // Check if the user has scrolled within a certain distance from the bottom
  //       const threshold = 10; // Adjust this threshold as needed

  //       // Set the isNearBottom flag when near the bottom
  //       if (scrollHeight - scrollTop - clientHeight <= threshold) {
  //         setIsNearBottom(true);
  //         setTotalPages((prevTotalPages) => prevTotalPages + 1);
  //       } else {
  //         setIsNearBottom(false);
  //       }
  //     }
  //   };

  //   if (scrollRef.current) {
  //     scrollRef.current.addEventListener("scroll", handleScroll);

  //     return () => {
  //       if (scrollRef.current) {
  //         scrollRef.current.removeEventListener("scroll", handleScroll);
  //       }
  //     };
  //   }
  // }, []); // No dependencies needed here

  // useEffect for fetching next page
  // useEffect(() => {
  //   if (
  //     isNearBottom &&
  //     currentPage < totalPages &&
  //     hasFetchedData &&
  //     !isFetching
  //   ) {
  //     console.log("Reached the bottom! Fetching next page...");
  //     fetchNextPage();
  //   }
  // }, [isNearBottom]);

  const uniqueSolitaires = matchedSolitaires.reduce((acc, solitaire) => {
    if (!acc.some((item) => item.SolitaireID === solitaire.SolitaireID)) {
      acc.push(solitaire);
    }
    return acc;
  }, []);

  const uniqueAllSolitaires = solitaires.reduce((acc, solitaire) => {
    if (!acc.some((item) => item.SolitaireID === solitaire.SolitaireID)) {
      acc.push(solitaire);
    }
    return acc;
  }, []);

  const handleMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchSolitaires(currentPage + 1);
  };

  // console.log(" matched  solitaires", matchedSolitaires);
  return (
    <div style={{ width: "100vw" }}>
      <div
        className="container mt-5"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0px",
        }}
      >
        <h1 className="mb-4 text-white" style={{ textAlign: "center" }}>
          Search Results
        </h1>
        {isLoading && <p className="text-center text-white">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row" style={{ overflowY: "auto" }}>
          {/* Skeleton While Loading */}
          {showLoading && (
            <div className="row">
              {[...Array(solitairesPerPage)].map((_, index) => (
                <div key={index} className="col-md-3 col-lg-2 mb-4">
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
          )}
          {!showLoading &&
            (showAllSolitaires ? uniqueAllSolitaires : uniqueSolitaires).map(
              (solitaire) => (
                <div
                  key={solitaire.SolitaireID}
                  className="col-6 col-sm-6 col-md-3 col-lg-3 mb-4"
                >
                  <div className="product-block cless">
                    <div className="blogshadow blog-thumbnail">
                      <div className="blog-left">
                        <div
                          className="workdo-blog-image"
                          style={{
                            height: "201px",
                            display: "flex",
                            overflow: "hidden",
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px",
                            backgroundColor: "#ffffff",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {solitaire.Image1 && (
                            <img
                              src={solitaire.Image1}
                              alt={`Solitaire  ${solitaire.SolitaireID}`}
                              className="img-fluid"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          )}
                          <div className="blog-post-image-hover"></div>
                        </div>
                      </div>
                      <div className="blog-right">
                        <h4>
                          <a href="#">Shape: {solitaire.ShapeName}</a>
                        </h4>
                        <div className="blog-desc">
                          {/* <p className="card-text">Shape: {solitaire.ShapeName}</p> */}
                          <p className="card-text">Carat: {solitaire.Carat}</p>
                          <p className="card-text">
                            Description: Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.
                          </p>
                        </div>
                        <div className="blog-date blog-bottom">
                          <div className="read_link">
                            <Link
                              href={`/${solitaire.SolitaireID}`}
                              className="btn btn-primary read_more"
                            >
                              Get Details
                            </Link>
                          </div>
                          {/*  Add to Cart Button with isInCart Logic  */}
                          {cartItems.some(
                            (item) => item.SolitaireID === solitaire.SolitaireID
                          ) ? (
                            <button
                              className="btn btn-primary"
                              disabled
                              style={{ fontSize: "0.7rem" }}
                            >
                              Added to Cart
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={() => handleAddToCart(solitaire)}
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          {console.log("current page", currentPage, "total pages", totalPages)}
          {!showLoading &&
            currentPage === totalPages &&
            solitaires.length > 0 && (
              <div className="col-md-12 text-center mt-4">
                <p
                  className="text-muted small"
                  style={{ fontFamily: "outfit" }}
                >
                  No more solitaires to show.
                </p>
              </div>
            )}
        </div>
        {/* "No Results" Message */}

        {!showLoading && solitaires.length === 0 && (
          <div className="col-md-12">
            <p className="alert alert-warning">NO MATCHING SOLITAIRE FOUND</p>
          </div>
        )}
        {/* "More" Button */}
        {
          <div className="row mt-3">
            <div className="col-md-12 text-center">
              <button
                onClick={handleMoreClick}
                style={{
                  backgroundColor: "#f2dfcf",
                  color: "#0d1e1c",
                  borderRadius: "20px",
                  fontFamily: "Outfit, sans-serif",
                }}
                className="btn btn-secondary"
              >
                More <ChevronDownIcon />
              </button>
            </div>
          </div>
        }
        {/* Toggle Button (Removed Pagination) */}
        <div className="row mt-3">
          <div className="col-md-4">
            <button
              onClick={() => setShowAllSolitaires(!showAllSolitaires)}
              className="btn btn-secondary btn-block"
              style={{
                backgroundColor: "#f2dfcf",
                color: "#0d1e1c",
                borderRadius: "20px",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              {showAllSolitaires
                ? "Hide All Solitaires"
                : "View All Solitaires"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
