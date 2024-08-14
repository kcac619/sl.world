// pages/search.js
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const SearchResults = () => {
  const router = useRouter();
  const filters = useSelector((state) => state.filters); // Access filters from Redux store
  const [solitaires, setSolitaires] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllSolitaires, setShowAllSolitaires] = useState(false);
  const [error, setError] = useState(null);
  const [showLoading, setShowLoading] = useState(true); // For Skeleton
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [sortBy, setSortBy] = useState(null); // Column to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const solitairesPerPage = 4; // Number of solitaires to show per page

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
    // Show Skeleton for 1 second when the page changes
    setShowLoading(true);
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Clear the timer on unmount
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

  // Get current solitaires for pagination
  const indexOfLastSolitaire = currentPage * solitairesPerPage;
  const indexOfFirstSolitaire = indexOfLastSolitaire - solitairesPerPage;
  // const currentSolitaires = showAllSolitaires
  //   ? solitaires.slice(indexOfFirstSolitaire, indexOfLastSolitaire)
  //   : matchedSolitaires.slice(indexOfFirstSolitaire, indexOfLastSolitaire);

  const currentSolitaires = showAllSolitaires
    ? [...solitaires] // Create a copy for sorting
    : [...matchedSolitaires]; // Create a copy for sorting

  // *** APPLY SORTING TO currentSolitaires ***
  if (sortBy) {
    currentSolitaires.sort((a, b) => {
      const fieldA = a[sortBy]; // Get the value of the field to sort by from object 'a'
      const fieldB = b[sortBy]; // Get the value of the field to sort by from object 'b'

      if (typeof fieldA === "number" && typeof fieldB === "number") {
        // Sort numerically if both fields are numbers
        return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
      } else {
        // Sort alphabetically if fields are strings or mixed types
        const valueA = String(fieldA).toLowerCase();
        const valueB = String(fieldB).toLowerCase();
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    });
  }

  // *** SLICE FOR PAGINATION AFTER SORTING ***
  const displayedSolitaires = currentSolitaires.slice(
    indexOfFirstSolitaire,
    indexOfLastSolitaire
  );

  // *** HANDLE COLUMN HEADER CLICKS FOR SORTING ***
  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle sort order if clicking the same column
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort column and default to ascending order
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      {/* Skeleton While Loading */}
      {showLoading && (
        <div className="table-responsive" style={{ borderRadius: "10px" }}>
          <table
            className="table table-striped table-hover table-dark"
            style={{
              fontFamily: "Outfit, Roboto, sans-serif",
              borderCollapse: "separate",

              borderSpacing: "0 0px",
              // overflow: "hidden",
            }}
          >
            <thead>{/* ... [Your table header] ... */}</thead>
            <tbody>
              {/* Generate Skeleton rows */}
              {[...Array(solitairesPerPage)].map((_, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <SkeletonCircle size="10" />
                  </td>
                  {/* ... Add SkeletonText components for other columns ...  */}
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <SkeletonText mt="4" noOfLines={2} spacing="4" />
                  </td>
                  {/* ... Repeat for other columns ... */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Table */}
      {!showLoading && (
        <div className="table-responsive" style={{ borderRadius: "10px" }}>
          {/* For responsiveness */}
          <table
            className="table table-striped table-hover table-dark"
            style={{
              fontFamily: "Outfit, Roboto, sans-serif",
              borderCollapse: "separate",
              borderSpacing: "0 0px",
              borderRadius: "10px",
              // paddingBottom: "50px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#343a40", borderRadius: "20px" }}>
                <th
                  style={{
                    padding: "5px 5px",
                    justifyItems: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  Image <i className="fas fa-sort"></i>
                </th>
                {/* *** SORTABLE HEADERS *** */}
                <th
                  style={{
                    padding: "5px 5px",
                    justifyItems: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSort("SolitaireID")}
                >
                  Solitaire ID{" "}
                  <i
                    className={`fas fa-sort${
                      sortBy === "SolitaireID" ? "-" + sortOrder : ""
                    }`}
                  ></i>
                </th>
                <th
                  style={{ padding: "12px 15px", cursor: "pointer" }}
                  onClick={() => handleSort("ShapeName")}
                >
                  Shape{" "}
                  <i
                    className={`fas fa-sort${
                      sortBy === "ShapeName" ? "-" + sortOrder : ""
                    }`}
                  ></i>
                </th>
                <th
                  style={{ padding: "12px 15px", cursor: "pointer" }}
                  onClick={() => handleSort("Carat")}
                >
                  Carat{" "}
                  <i
                    className={`fas fa-sort${
                      sortBy === "Carat" ? "-" + sortOrder : ""
                    }`}
                  ></i>
                </th>
                <th
                  style={{ padding: "12px 15px", cursor: "pointer" }}
                  onClick={() => handleSort("ColorName")}
                >
                  Color{" "}
                  <i
                    className={`fas fa-sort${
                      sortBy === "ColorName" ? "-" + sortOrder : ""
                    }`}
                  ></i>
                </th>
                <th
                  style={{ padding: "12px 15px", cursor: "pointer" }}
                  onClick={() => handleSort("FluorName")}
                >
                  Fluor{" "}
                  <i
                    className={`fas fa-sort${
                      sortBy === "FluorName" ? "-" + sortOrder : ""
                    }`}
                  ></i>
                </th>
                <th
                  style={{ padding: "12px 15px", cursor: "pointer" }}
                  onClick={() => handleSort("PurityName")}
                >
                  Purity{" "}
                  <i
                    className={`fas fa-sort${
                      sortBy === "PurityName" ? "-" + sortOrder : ""
                    }`}
                  ></i>
                </th>
                <th
                  style={{ padding: "12px 15px", cursor: "pointer" }}
                  onClick={() => handleSort("CutName")}
                >
                  Cut{" "}
                  <i
                    className={`fas fa-sort${
                      sortBy === "CutName" ? "-" + sortOrder : ""
                    }`}
                  ></i>
                </th>
                <th
                  style={{ padding: "12px 15px", cursor: "pointer" }}
                  onClick={() => handleSort("LabName")}
                >
                  Lab{" "}
                  <i
                    className={`fas fa-sort${
                      sortBy === "LabName" ? "-" + sortOrder : ""
                    }`}
                  ></i>
                </th>
                <th
                  style={{ padding: "12px 15px", cursor: "pointer" }}
                  onClick={() => handleSort("PolishName")}
                >
                  Polish{" "}
                  <i
                    className={`fas fa-sort${
                      sortBy === "PolishName" ? "-" + sortOrder : ""
                    }`}
                  ></i>
                </th>
                <th
                  style={{ padding: "12px 15px", cursor: "pointer" }}
                  onClick={() => handleSort("SymmetryName")}
                >
                  Symmetry{" "}
                  <i
                    className={`fas fa-sort${
                      sortBy === "SymmetryName" ? "-" + sortOrder : ""
                    }`}
                  ></i>
                </th>
                <th
                  style={{ padding: "12px 15px", cursor: "pointer" }}
                  onClick={() => handleSort("LocationName")}
                >
                  Location{" "}
                  <i
                    className={`fas fa-sort${
                      sortBy === "LocationName" ? "-" + sortOrder : ""
                    }`}
                  ></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* *** TABLE BODY USING displayedSolitaires *** */}
              {displayedSolitaires.map((solitaire) => (
                <tr
                  key={solitaire.SolitaireID}
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
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {/* Assuming solitaire.Image1 contains the image URL */}
                    {solitaire.Image1 && (
                      <img
                        src={solitaire.Image1}
                        alt={`Solitaire ${solitaire.SolitaireID}`}
                        style={{
                          width: "50px",
                          height: "45px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          objectFit: "cover",
                          transition: "transform 0.2s",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    )}
                  </td>
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {solitaire.SolitaireID}
                  </td>
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {solitaire.ShapeName}
                  </td>
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {solitaire.Carat}
                  </td>
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {solitaire.ColorName}
                  </td>
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {solitaire.FluorName}
                  </td>
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {solitaire.PurityName}
                  </td>
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {solitaire.CutName}
                  </td>
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {solitaire.LabName}
                  </td>
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {solitaire.PolishName}
                  </td>
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {solitaire.SymmetryName}
                  </td>
                  <td
                    style={{
                      padding: "5px 5px",
                      justifyItems: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {solitaire.LocationName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <nav style={{ marginTop: "20px" }}>
        <ul className="pagination justify-content-center">
          {Array(
            Math.ceil(
              (showAllSolitaires
                ? solitaires.length
                : matchedSolitaires.length) / solitairesPerPage
            )
          )
            .fill()
            .map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <a
                  onClick={() => paginate(index + 1)}
                  href="#"
                  className="page-link"
                >
                  {index + 1}
                </a>
              </li>
            ))}
        </ul>
      </nav>

      {/* Toggle Button */}
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
