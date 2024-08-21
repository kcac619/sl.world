import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

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
  const solitairesPerPage = 15;

  const fetchSolitaires = async (pageNumber = currentPage) => {
    setIsLoading(true);
    setShowLoading(true);
    try {
      const response = await axios.get("/api/searchsolitaire", {
        params: {
          pageNumber: pageNumber,
          pageSize: solitairesPerPage,
        },
      });
      console.log("response", response);
      if (response.data.statusid === 1) {
        console.log("solitaires", response.data.solitaires);
        setSolitaires((prevSolitaires) => [
          ...prevSolitaires,
          ...response.data.solitaires,
        ]);
        console.log("after set solitaires", solitaires);
        setTotalPages(Math.ceil(response.data.totalCount / solitairesPerPage));
      }
    } catch (error) {
      console.error("Error fetching solitaires:", error);
      setError("Error fetching solitaires. Please try again later.");
    } finally {
      setIsLoading(false);
      setShowLoading(false);
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

  useEffect(() => {
    fetchSolitaires();
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

  const fetchNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchSolitaires(currentPage + 1);
    }
  };

  // Scroll to bottom listener for lazy loading
  const scrollRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (
        scrollRef.current &&
        scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
          scrollRef.current.scrollHeight
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, totalPages]);

  console.log(" matched  solitaires", matchedSolitaires);
  return (
    <div
      className="container mt-5"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <h1 className="mb-4 text-white" style={{ textAlign: "center" }}>
        Search Results
      </h1>
      {isLoading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      <div ref={scrollRef} className="row" style={{ overflowY: "auto" }}>
        {/* Skeleton While Loading */}
        {showLoading && (
          <div className="row">
            {[...Array(solitairesPerPage)].map((_, index) => (
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
        )}
        {!showLoading &&
          matchedSolitaires.map((solitaire) => (
            <div key={solitaire.SolitaireID} className="col-md-4 mb-4">
              <div className="product-block cless">
                <div className="blogshadow blog-thumbnail">
                  <div className="blog-left">
                    <div className="workdo-blog-image">
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
                        <a href="#" className="btn btn-primary read_more">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* "No Results" Message */}
      {!showLoading && solitaires.length === 0 && (
        <div className="col-md-12">
          <p className="alert alert-warning">NO MATCHING SOLITAIRE FOUND</p>
        </div>
      )}
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
            {showAllSolitaires ? "Hide All Solitaires" : "View All Solitaires"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
