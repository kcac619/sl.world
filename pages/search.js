// pages/search.js
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector

const SearchResults = () => {
  const router = useRouter();
  const filters = useSelector((state) => state.filters); // Access filters from Redux store
  const [solitaires, setSolitaires] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllSolitaires, setShowAllSolitaires] = useState(false);
  const [error, setError] = useState(null);

  const fetchSolitaires = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/searchsolitaire");
      console.log("fetch solitaires response:", response);
      console.log("filters from useSelector :", filters);
      if (response.data.statusid === 1) {
        setSolitaires(response.data.solitaires);
      }
    } catch (error) {
      console.error("Error fetching solitaire s:", error);
      setError("Error fetching solitaires. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

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
    // console.log("Solitaires fetche  d : ", solitaires);
  }, []);

  const isSolitaireMatch = (solitaire) => {
    // 1. Carat Range Matching
    const caratMatch = filters.carat.some((caratValue) => {
      if (typeof caratValue === "number") {
        return solitaire.Carat <= caratValue;
      }
      return false;
    });

    // 2.  Ignore "undefined" filter values
    const validFilters = Object.fromEntries(
      Object.entries(filters).map(([key, values]) => [
        key,
        // Only filter if values is an array and not empty
        Array.isArray(values) && values.length > 0
          ? values.filter((value) => value !== undefined)
          : values, // Keep the original value if not an array or empty
      ])
    );
    console.log("Valid filters:", validFilters);
    // 3.  Other Filter Matching (ignoring "undefined")
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
      validFilters.clarity.includes(solitaire.PurityName); // Assuming "PurityName" in solitaire data
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

    // 4. Return true if any filter matches or carat is in range
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

  const matchedSolitaires = solitaires.filter(isSolitaireMatch);
  console.log("Matched solitaires:", matchedSolitaires);

  return (
    <div className="container mt-5" style={{ color: "white" }}>
      {" "}
      {/* Add container for spacing */}
      <h1 className="mb-4">Search Results</h1>
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {/* Display matching solitaires or "No Results" message */}
      <div className="row">
        <div className="col-md-8">
          {matchedSolitaires.length > 0 ? (
            <ul className="list-group" style={{ fontFamily: "outfit" }}>
              {matchedSolitaires.map((solitaire) => (
                <li key={solitaire.SolitaireID} className="list-group-item">
                  Solitaire ID: {solitaire.SolitaireID} , {solitaire.ShapeName}{" "}
                  , {solitaire.Carat} , {solitaire.ColorName} ,{" "}
                  {solitaire.FluorName} , {solitaire.PurityName} ,{" "}
                  {solitaire.CutName} , {solitaire.LabName} ,{" "}
                  {solitaire.PolishName} , {solitaire.SymmetryName} ,{" "}
                  {solitaire.LocationName}
                  {/* ... (You can add more solitaire details here) ... */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="alert alert-warning">NO MATCHING SOLITAIRE FOUND</p>
          )}
        </div>
      </div>
      {/* Toggle Button */}
      <div className="row mt-3">
        <div className="col-md-4">
          <button
            onClick={() => setShowAllSolitaires(!showAllSolitaires)}
            className="btn btn-secondary btn-block"
          >
            {showAllSolitaires ? "Hide All Solitaires" : "View All Solitaires"}
          </button>
        </div>
      </div>
      {/* Display all solitaires when the button is toggled */}
      {showAllSolitaires && (
        <div className="row mt-4">
          <div className="col-md-8">
            <h2>All Solitaires</h2>
            <ul
              className="list-group"
              style={{
                fontFamily: "outfit",
              }}
            >
              {solitaires.map((solitaire) => (
                <li key={solitaire.SolitaireID} className="list-group-item">
                  Solitaire ID: {solitaire.SolitaireID} , {solitaire.ShapeName}{" "}
                  , {solitaire.Carat} , {solitaire.ColorName} ,{" "}
                  {solitaire.FluorName} , {solitaire.PurityName} ,{" "}
                  {solitaire.CutName} , {solitaire.LabName} ,{" "}
                  {solitaire.PolishName} , {solitaire.SymmetryName} ,{" "}
                  {solitaire.LocationName}
                  {/* ... (You can add more solitaire details here) ... */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
