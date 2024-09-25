// pages/index.js
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, resetFilters } from "../filterSlice";
import {
  Box,
  Flex,
  Heading,
  Button,
  SimpleGrid,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  useBreakpointValue,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import Image from "next/image";
import vercel from "../public/next.svg";
import Link from "next/link";
// Components
import Sidebar from "../components/Sidebar";
import DiamondShape from "../components/DiamondShape";
import FilterSection from "../components/FilterSection";
import {
  getCartItemsFromLocalStorage,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../utils/cartfns";
import SearchBar from "@/components/SearchBar";

import axios from "axios";

const Solitaire = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const filtersFromRedux = useSelector((state) => state.filters); // Get filters from Redux store
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
  const [totalCount, setTotalCount] = useState(0); // New state for total count
  const [cartItems, setCartItems] = useState([]);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false); // For dropdown
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const updateCart = () => {
      setCartItems(getCartItemsFromLocalStorage());
    };

    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  useEffect(() => {
    setCartItems(getCartItemsFromLocalStorage());
  }, []);

  // Function to remove item from cart and update state
  const handleRemoveFromCart = (solitaireId) => {
    removeFromCart(solitaireId);
    setCartItems(getCartItemsFromLocalStorage());
  };

  // Toggle the cart dropdown
  const toggleCartDropdown = () => {
    setCartDropdownOpen(!cartDropdownOpen);
  };
  // Calculate subtotal and total
  const subTotal = cartItems.reduce(
    (total, item) => total + item.Price * item.quantity,
    0
  );
  const total = subTotal;

  const sidebarWidth = useBreakpointValue({
    base: "60px",
    md: isSidebarOpen ? "200px" : "60px",
  });

  const sidebarContainerRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setSelectedFilters(filtersFromRedux);
  }, [filtersFromRedux]);

  useEffect(() => {
    fetchAllFilterData();
  }, []);

  const fetchAllFilterData = async () => {
    setLoadingShapes(true);
    // setError(null); // Reset error state

    try {
      const response = await axios.get("/api/solitaire");
      // console.log("fetch all filter data response:", response);
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
        setTotalCount(response.data.totalCount);
      } else {
        console.error("Error fetching filter data:", response.data.error);
        // setError("Error fetching filter data.");
      }
    } catch (error) {
      console.error("Error fetching all filter data:", error);
      // setError("An error occurred. Please try again.");
    } finally {
      setLoadingShapes(false);
    }
  };

  // useEffect(() => {
  //   if (sidebarWidth !== "60px") {
  //     onClose();
  //   }
  // }, [sidebarWidth, onClose]);

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
    shape: [], // Make sure 'shape' is in your selectedFilters
  });

  const filters = {
    // Define the filters object
    carat: selectedFilters.carat,
    fluor: selectedFilters.fluor,
    cut: selectedFilters.cut,
    polish: selectedFilters.polish,
    color: selectedFilters.color,
    clarity: selectedFilters.clarity,
    lab: selectedFilters.lab,
    symm: selectedFilters.symm,
    location: selectedFilters.location,
    shape: selectedFilters.shape,
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
    // Add your search logic here
    // if (session) {
    //   // Authenticated user - redirect to the "search results" page
    //   router.push({
    //     pathname: "/search", // Or your desired results page
    //     query: filters, // Pass filters in the query string
    //   });
    // } else {
    //   // Unauthenticated user - redirect to login with callback URL
    //   router.push({
    //     pathname: "/auth/login",
    //     query: { callbackUrl: router.asPath }, // Pass current URL as callback
    //   });
    // }
    router.push({
      pathname: "/search", // Or your desired results page
      // query: filters, // Pass filters in the query string
    });
  };

  const handleNavigation = () => {
    if (session) {
      if (session.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <Box backgroundColor={"transparent"}>
   
      <Flex ref={sidebarContainerRef} mt={0}    backgroundColor={"#F2DFCF"}>
    
        <Box
          flex="1"
          // transform={{
          //   base: "scale(0.9)",
          //   md: "scale(0.9)",
          //   lg: "scale(0.9)",
          // }}
          m={5}
          p={4}
          borderRadius={"20px"}
          backgroundColor={"transparent"}
          ml={{ base: 0, md: isSidebarOpen ? "205px" : "50px" }}
          overflowX="hidden"
          transition="margin-left 0.3s"
          fontFamily="outfit"
        >
          {/* Diamond Shape Section */}
          <Box mb={6}>
            <Heading as="h2" size="md" color="var(--main-color)" mb={5}>
              Shape
            </Heading>
            {loadingShapes ? (
              <Text color="var(--main-color)">Loading shapes...</Text>
            ) : (
              <SimpleGrid columns={{ base: 4, md: 8, lg: 12 }} spacing={4}>
                {shapes ? (
                  shapes.map((shape) => (
                    <DiamondShape
                      key={shape.ShapeID}
                      shape={shape}
                      isSelected={selectedFilters.shape.includes(shape.ShapeID)}
                      onClick={() => {
                        handleFilterChange("shape", shape.ShapeID); // Use handleFilterChange
                      }}
                    />
                  ))
                ) : (
                  <span color="var(--main-color)">error fetching shapes</span>
                )}
              </SimpleGrid>
            )}
          </Box>

          <hr style={{ color: "var(--main-color)", margin: "2px" }} />
          <hr
            style={{
              color: "var(--main-color)",
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
                onFilterChange={(value) => handleFilterChange("polish", value)}
              />
            </GridItem>

            {/* Column 2 */}
            <GridItem>
              <Box mb={4}>
                <Text
                  fontWeight="bold"
                  mb={2}
                  // fontFamily="Playfair Display"
                  color="var(--main-color)"
                >
                  Color
                </Text>
                <FilterSection
                  options={colors.map((color) => ({
                    label: color.ColorName,
                    value: color.ColorID,
                  }))}
                  selectedValues={selectedFilters.color}
                  onFilterChange={(value) => handleFilterChange("color", value)}
                />
              </Box>
              <Box mb={4}>
                <Text
                  fontWeight="bold"
                  mb={2}
                  // fontFamily="Playfair Display"
                  color="var(--main-color)"
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
                  color="var(--main-color)"
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
                  color="var(--main-color)"
                >
                  Symmerty
                </Text>
                <FilterSection
                  options={symmetries.map((symm) => ({
                    label: symm.SymmetryName,
                    value: symm.SymmetryID,
                  }))}
                  selectedValues={selectedFilters.symm}
                  onFilterChange={(value) => handleFilterChange("symm", value)}
                />
              </Box>
              <Box mb={4}>
                <Text
                  fontWeight="bold"
                  mb={2}
                  // fontFamily="Playfair Display"
                  color="var(--main-color)"
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
            color="var(--sub-color)"
            size="sm"
            mt={4}
            mb={6}
            borderRadius="20px"
            onClick={handleSearch}
            sx={{
              "&:hover": {
                backgroundColor: "var(--sub-color)",
                color: "black",
              },
            }}
          >
            Show Advance Filters
          </Button>

          {/* Search Buttons */}
          <Flex mt={6} justify="flex-end">
            <Button
              backgroundColor="black"
              color="var(--sub-color)"
              mr={2}
              borderRadius="20px"
              sx={{
                "&:hover": {
                  backgroundColor: "var(--sub-color)",
                  color: "black",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              backgroundColor="black"
              color="var(--sub-color)"
              mr={2}
              borderRadius="20px"
              onClick={() => {
                dispatch(resetFilters()); // Reset filters in Redux store
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "var(--sub-color)",
                  color: "black",
                },
              }}
            >
              Reset
            </Button>
            <Button
              backgroundColor="black"
              color="var(--sub-color)"
              borderRadius="20px"
              onClick={() => {
                handleSearch();
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "var(--sub-color)",
                  color: "black",
                },
              }}
            >
              Search
            </Button>
            <Button
              backgroundColor="black"
              color="var(--sub-color)"
              ml={2}
              borderRadius="20px"
              rightIcon={<ChevronDownIcon />}
              onClick={handleSearch} // Redirect on "Save Search"
              sx={{
                "&:hover": {
                  backgroundColor: "var(--sub-color)",
                  color: "black",
                },
              }}
            >
              Save Search
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Solitaire;
