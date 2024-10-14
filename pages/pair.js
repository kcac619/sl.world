"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, resetFilters } from "../filterSlice";
import {
  Box,
  Flex,
  Heading,
  Button,
  SimpleGrid,
  useDisclosure,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";

import DiamondShape from "../components/DiamondShape";
import FilterSection from "../components/FilterSection";
import { getCartItemsFromLocalStorage, addToCart } from "../utils/cartfns";
import useCartStore from "../lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@chakra-ui/react";
import PairSearchResults from "@/components/PairSearchResults";

const PairSearch = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const [shapes, setShapes] = useState([]);
  const [loadingShapes, setLoadingShapes] = useState(true);
  const [carats, setCarats] = useState([]);
  const [colors, setColors] = useState([]);
  const [flours, setFlours] = useState([]);
  const [purities, setPurities] = useState([]);
  const [cuts, setCuts] = useState([]);
  const [labs, setLabs] = useState([]);
  const [polishs, setPolishs] = useState([]);
  const [symmetries, setSymmetries] = useState([]);
  const [locations, setLocations] = useState([]);

  const [pairs, setPairs] = useState([]); // State for pair data
  const [isLoadingPairs, setIsLoadingPairs] = useState(false); // Loading state for pairs
  const [errorPairs, setErrorPairs] = useState(null); // Error state for pairs

  const [selectedFilters, setSelectedFilters] = useState({
    carat: [],
    fluor: [],
    cut: [],
    polish: [],
    color: [],
    clarity: [],
    lab: [],
    symm: [],
    location: [],
    shape: [],
  });

  // Fetch all filter data
  useEffect(() => {
    fetchAllFilterData();
  }, []);

  const fetchAllFilterData = async () => {
    setLoadingShapes(true);

    try {
      const response = await axios.get("/api/solitaire");
      if (response.status === 200) {
        setShapes(response.data.shapes);
        setCarats(response.data.carats);
        setColors(response.data.colors);
        setFlours(response.data.flours);
        setPurities(response.data.purities);
        setCuts(response.data.cuts);
        setLabs(response.data.labs);
        setPolishs(response.data.polishs);
        setSymmetries(response.data.symmetries);
        setLocations(response.data.locations);
      } else {
        console.error("Error fetching filter data:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching all filter data:", error);
    } finally {
      setLoadingShapes(false);
    }
  };

  // Fetch pair data based on selected filters
  useEffect(() => {
    fetchPairs();
  }, [selectedFilters]);

  const fetchPairs = async () => {
    setIsLoadingPairs(true);
    setErrorPairs(null);

    try {
      const response = await axios.get("/api/pairs");

      if (response.status === 200) {
        setPairs(response.data.pairs);
      } else {
        console.error("Error fetching pairs:", response.data.error);
        setErrorPairs("Error fetching pairs.");
      }
    } catch (error) {
      console.error("Error fetching pairs:", error);
      setErrorPairs("An error occurred.");
    } finally {
      setIsLoadingPairs(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const filterValues = prevFilters[filterType] || [];

      const isValueSelected = filterValues.includes(value);

      const updatedFilterValues = isValueSelected
        ? filterValues.filter((val) => val !== value)
        : [...filterValues, value];

      return {
        ...prevFilters,
        [filterType]: updatedFilterValues,
      };
    });
  };
  useEffect(() => {
    console.log("Selected Filters:", selectedFilters);
  }, [selectedFilters]);

  const handleSearch = () => {
    console.log("Search Filters:", selectedFilters);
    //move the search results div into focus
    document
      .getElementById("search-results")
      .scrollIntoView({ behavior: "smooth" });

    // Helper function to get the name from an ID
    const getNameFromId = (filterType, id) => {
      switch (filterType) {
        case "carat":
          return carats.find((c) => c.CaratID === id)?.HighLimit; // Return the high limit of the carat range
        case "fluor":
          return flours.find((f) => f.FluorID === id)?.FluorName;
        case "cut":
          return cuts.find((c) => c.CutID === id)?.CutName;
        case "polish":
          return polishs.find((p) => p.PolishID === id)?.PolishName;
        case "color":
          return colors.find((c) => c.ColorID === id)?.ColorName;
        case "clarity":
          return purities.find((p) => p.PurityID === id)?.PurityName;
        case "lab":
          return labs.find((l) => l.LabID === id)?.LabName;
        case "symm":
          return symmetries.find((s) => s.SymmetryID === id)?.SymmetryName;
        case "location":
          return locations.find((l) => l.LocationID === id)?.LocationName;
        case "shape":
          return shapes.find((s) => s.ShapeID === id)?.ShapeName;
        default:
          return null;
      }
    };

    // Dispatch filter names to Redux
    dispatch(
      setFilter({
        filterType: "carat",
        values: selectedFilters.carat.map((id) => getNameFromId("carat", id)),
      })
    );
    dispatch(
      setFilter({
        filterType: "fluor",
        values: selectedFilters.fluor.map((id) => getNameFromId("fluor", id)),
      })
    );
    dispatch(
      setFilter({
        filterType: "cut",
        values: selectedFilters.cut.map((id) => getNameFromId("cut", id)),
      })
    );
    dispatch(
      setFilter({
        filterType: "polish",
        values: selectedFilters.polish.map((id) => getNameFromId("polish", id)),
      })
    );
    dispatch(
      setFilter({
        filterType: "color",
        values: selectedFilters.color.map((id) => getNameFromId("color", id)),
      })
    );
    dispatch(
      setFilter({
        filterType: "clarity",
        values: selectedFilters.clarity.map((id) =>
          getNameFromId("clarity", id)
        ),
      })
    );
    dispatch(
      setFilter({
        filterType: "lab",
        values: selectedFilters.lab.map((id) => getNameFromId("lab", id)),
      })
    );
    dispatch(
      setFilter({
        filterType: "symm",
        values: selectedFilters.symm.map((id) => getNameFromId("symm", id)),
      })
    );
    dispatch(
      setFilter({
        filterType: "location",
        values: selectedFilters.location.map((id) =>
          getNameFromId("location", id)
        ),
      })
    );
    dispatch(
      setFilter({
        filterType: "shape",
        values: selectedFilters.shape.map((id) => getNameFromId("shape", id)),
      })
    );
    // Refresh the pair data
    fetchPairs();
  };

  const isPairMatch = (pair) => {
    return (
      isSolitaireMatch(pair, "Solitaire1") ||
      isSolitaireMatch(pair, "Solitaire2")
    );
  };

  const isSolitaireMatch = (pair, solitairePrefix) => {
    // Carat Range Matching
    const caratMatch = filters.carat.some((caratValue) => {
      if (typeof caratValue === "number") {
        return pair[`${solitairePrefix}Carat`] <= caratValue;
      }
      return false;
    });

    // 2. Ignore "undefined" filter values
    const validFilters = Object.fromEntries(
      Object.entries(filters).map(([key, values]) => [
        key,
        Array.isArray(values) && values.length > 0
          ? values.filter((value) => value !== undefined)
          : values, // Keep the original value if not an array or empty
      ])
    );

    // 3. Other Filter Matching (using validFilters - Corrected)
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

  const matchedPairs = pairs.filter(isPairMatch);

  return (
    <div style={{ width: "100vw" }}>
      <Box
        backgroundColor={"transparent"}
        // backgroundImage="url('/img/cream-bg.jpg')"
      >
        <Flex mt={0} backgroundColor={"var(--main-color)"} opacity={0.9}>
          <Box
            flex="1"
            m={5}
            p={4}
            borderRadius={"20px"}
            backgroundColor={"transparent"}
            overflowX="hidden"
            transition="margin-left 0.3s"
            fontFamily="outfit"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
          >
            {/* Diamond Shape Section */}
            <Box mb={6}>
              <Heading as="h2" size="md" color="var(--black)" mb={5}>
                Shape
              </Heading>
              {loadingShapes ? (
                <Text color="var(--main-color)">Loading shapes...</Text>
              ) : (
                <SimpleGrid columns={{ base: 4, md: 8, lg: 10 }} spacing={6}>
                  {shapes ? (
                    shapes.map((shape) => (
                      <DiamondShape
                        key={shape.ShapeID}
                        shape={shape}
                        isSelected={selectedFilters.shape.includes(
                          shape.ShapeID
                        )}
                        onClick={() => {
                          handleFilterChange("shape", shape.ShapeID);
                        }}
                      />
                    ))
                  ) : (
                    <span color="var(--main-color)">error fetching shapes</span>
                  )}
                </SimpleGrid>
              )}
            </Box>

            <hr style={{ color: "var(--sub-color)", margin: "2px" }} />
            <hr
              style={{
                color: "var(--sub-color)",
                margin: "2px",
                marginBottom: "16px",
              }}
            />

            {/* Filters Section - Using Grid for two-column layout */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              {/* Column 1 */}
              <GridItem>
                <FilterSection
                  label="Carat"
                  options={carats.map((carat) => ({
                    label: `${carat.LowLimit} - ${carat.HighLimit}`,
                    value: carat.CaratID,
                  }))}
                  selectedValues={selectedFilters.carat}
                  onFilterChange={(value) => handleFilterChange("carat", value)}
                />
                <FilterSection
                  label="Fluor."
                  options={flours.map((fluor) => ({
                    label: fluor.FluorName,
                    value: fluor.FluorID,
                  }))}
                  selectedValues={selectedFilters.fluor}
                  onFilterChange={(value) => handleFilterChange("fluor", value)}
                />
                <FilterSection
                  label="Cut"
                  options={cuts.map((cut) => ({
                    label: cut.CutName,
                    value: cut.CutID,
                  }))}
                  selectedValues={selectedFilters.cut}
                  onFilterChange={(value) => handleFilterChange("cut", value)}
                />
                <FilterSection
                  label="Polish"
                  options={polishs.map((polish) => ({
                    // Assuming 'polishs' is the correct state variable
                    label: polish.PolishName,
                    value: polish.PolishID,
                  }))}
                  selectedValues={selectedFilters.polish}
                  onFilterChange={(value) =>
                    handleFilterChange("polish", value)
                  }
                />
              </GridItem>

              {/* Column 2 */}
              <GridItem>
                <Box mb={4}>
                  <Text
                    fontWeight="bold"
                    mb={2}
                    // fontFamily="Playfair Display"
                    color="var(--sub-color)"
                  >
                    Color
                  </Text>
                  <FilterSection
                    options={colors.map((color) => ({
                      label: color.ColorName,
                      value: color.ColorID,
                    }))}
                    selectedValues={selectedFilters.color}
                    onFilterChange={(value) =>
                      handleFilterChange("color", value)
                    }
                  />
                </Box>
                <Box mb={4}>
                  <Text
                    fontWeight="bold"
                    mb={2}
                    // fontFamily="Playfair Display"
                    color="var(--sub-color)"
                  >
                    Purity
                  </Text>
                  <FilterSection
                    options={purities.map((purity) => ({
                      label: purity.PurityName,
                      value: purity.PurityID,
                    }))}
                    selectedValues={selectedFilters.clarity}
                    onFilterChange={(value) =>
                      handleFilterChange("clarity", value)
                    }
                  />
                </Box>
                <Box mb={4}>
                  <Text
                    fontWeight="bold"
                    mb={2}
                    // fontFamily="Playfair Display"
                    color="var(--sub-color)"
                  >
                    Lab
                  </Text>
                  <FilterSection
                    options={labs.map((lab) => ({
                      label: lab.LabName,
                      value: lab.LabID,
                    }))}
                    selectedValues={selectedFilters.lab}
                    onFilterChange={(value) => handleFilterChange("lab", value)}
                  />
                </Box>
                <Box mb={4}>
                  <Text
                    fontWeight="bold"
                    mb={2}
                    // fontFamily="Playfair Display"
                    color="var(--sub-color)"
                  >
                    Symmerty
                  </Text>
                  <FilterSection
                    options={symmetries.map((symm) => ({
                      label: symm.SymmetryName,
                      value: symm.SymmetryID,
                    }))}
                    selectedValues={selectedFilters.symm}
                    onFilterChange={(value) =>
                      handleFilterChange("symm", value)
                    }
                  />
                </Box>
                <Box mb={4}>
                  <Text
                    fontWeight="bold"
                    mb={2}
                    // fontFamily="Playfair Display"
                    color="var(--sub-color)"
                  >
                    Location
                  </Text>
                  <FilterSection
                    options={locations.map((location) => ({
                      label: location.LocationName,
                      value: location.LocationID,
                    }))}
                    selectedValues={selectedFilters.location}
                    onFilterChange={(value) =>
                      handleFilterChange("location", value)
                    }
                  />
                </Box>
              </GridItem>
            </Grid>

            <Button
              backgroundColor="black"
              color="var(--main-color)"
              size="sm"
              mt={4}
              mb={6}
              borderRadius="20px"
              onClick={handleSearch}
              sx={{
                "&:hover": {
                  backgroundColor: "var(--main-color)",
                  color: "black",
                  border: "1px solid var(--sub-color)",
                },
              }}
            >
              Show Advance Filters
            </Button>

            {/* Search Buttons */}
            <Flex mt={6} justify="flex-end">
              <Button
                backgroundColor="black"
                color="var(--main-color)"
                mr={2}
                borderRadius="20px"
                sx={{
                  "&:hover": {
                    backgroundColor: "var(--main-color)",
                    color: "black",
                    border: "1px solid var(--sub-color)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                backgroundColor="black"
                color="var(--main-color)"
                mr={2}
                borderRadius="20px"
                onClick={() => {
                  dispatch(resetFilters()); // Reset filters in Redux store
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "var(--main-color)",
                    color: "black",
                    border: "1px solid var(--sub-color)",
                  },
                }}
              >
                Reset
              </Button>
              <Button
                backgroundColor="black"
                color="var(--main-color)"
                borderRadius="20px"
                onClick={() => {
                  handleSearch();
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "var(--main-color)",
                    color: "black",
                    border: "1px solid var(--sub-color)",
                  },
                }}
              >
                Search
              </Button>
            </Flex>
          </Box>
        </Flex>

        {/* Pair Search Results Section */}
        <div
          id="search-results"
          className="container-fluid pt-5"
          style={{
            minHeight: "80vh",
            maxWidth: "90%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "var(--sub-color)",
            justifyContent: "top",
            padding: "0px",
          }}
        >
          <h1
            className="mb-4 "
            style={{
              textAlign: "center",
              color: "var(--main-color) !important",
            }}
          >
            Pair Search Results
          </h1>
          {/* Display PairSearchResults */}
          {/* isLoadingPairs || errorPairs  ? (
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
          ): ( */}
          <PairSearchResults
            pairs={matchedPairs}
            isLoading={isLoadingPairs}
            error={errorPairs}
          />
          {/* // ) */}
          {/* Display "No Matching Pairs" message if needed */}
          {!isLoadingPairs && pairs.length === 0 && (
            <div className="col-md-12">
              <p className="alert alert-warning">NO MATCHING PAIRS FOUND</p>
            </div>
          )}
        </div>
      </Box>
      <Footer />
    </div>
  );
};

export default PairSearch;
