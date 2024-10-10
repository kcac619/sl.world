"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import useFilterStore from "../lib/store";
import PairSearchResults from "../components/PairSearchResults";

const PairSearch = () => {
  const router = useRouter();
  const filters = useSelector((state) => state.filters);
  const [pairs, setPairs] = useState([]);
  const storeFilters = useFilterStore((state) => state.filters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    const keyToLoad = "solitaire";
    if (storeFilters.hasOwnProperty(keyToLoad)) {
      setSelectedFilters(filters[keyToLoad]);
      fetchPairs();
    } else {
      setSelectedFilters({});
    }
  }, [storeFilters]);

  const fetchPairs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/pairs");

      if (response.status === 200) {
        setPairs(response.data.pairs);
      } else {
        console.error("Error fetching pairs:", response.data.error);
        setError("Error fetching pairs.");
      }
    } catch (error) {
      console.error("Error fetching pairs:", error);
      setError("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPairs();
  }, []);

  useEffect(() => {
    if (router.query.callbackUrl) {
      router.replace(
        {
          pathname: router.pathname,
          query: {},
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router]);

  const isPairMatch = (pair) => {
    // Adapt isSolitaireMatch for pair filtering
    return (
      isSolitaireMatch(pair, "Solitaire1") ||
      isSolitaireMatch(pair, "Solitaire2")
    );
  };

  const isSolitaireMatch = (pair, solitairePrefix) => {
    const caratMatch = filters.carat.some((caratValue) => {
      if (typeof caratValue === "number") {
        return pair[`${solitairePrefix}Carat`] <= caratValue;
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
      validFilters.shape.includes(pair[`${solitairePrefix}ShapeName`]);
    const colorMatch =
      validFilters.color.length > 0 &&
      validFilters.color.includes(pair[`${solitairePrefix}ColorName`]);
    const fluorMatch =
      validFilters.fluor.length > 0 &&
      validFilters.fluor.includes(pair[`${solitairePrefix}FluorName`]);
    const clarityMatch =
      validFilters.clarity.length > 0 &&
      validFilters.clarity.includes(pair[`${solitairePrefix}PurityName`]);
    const cutMatch =
      validFilters.cut.length > 0 &&
      validFilters.cut.includes(pair[`${solitairePrefix}CutName`]);
    const labMatch =
      validFilters.lab.length > 0 &&
      validFilters.lab.includes(pair[`${solitairePrefix}LabName`]);
    const polishMatch =
      validFilters.polish.length > 0 &&
      validFilters.polish.includes(pair[`${solitairePrefix}PolishName`]);
    const symmMatch =
      validFilters.symm.length > 0 &&
      validFilters.symm.includes(pair[`${solitairePrefix}SymmetryName`]);
    const locationMatch =
      validFilters.location.length > 0 &&
      validFilters.location.includes(pair[`${solitairePrefix}LocationName`]);

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

  const matchedPairs = pairs.filter(isPairMatch);

  return (
    <div style={{ width: "100vw" }}>
      <div
        className="container-fluid mt-0"
        style={{
          minHeight: "80vh",
          maxWidth: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "top",
          padding: "0px",
        }}
      >
        <h1
          className="mb-4 "
          style={{ textAlign: "center", color: "var(--main-color) !important" }}
        >
          Pair Search Results
        </h1>

        {/* Display PairSearchResults */}
        <PairSearchResults
          pairs={matchedPairs}
          isLoading={isLoading}
          error={error}
        />

        {/* Display "No Matching Pairs" message if needed */}
        {!isLoading && pairs.length === 0 && (
          <div className="col-md-12">
            <p className="alert alert-warning">NO MATCHING PAIRS FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PairSearch;
