// pages/index.js
import { useState, useEffect, useRef } from "react";
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
  Stack,
  InputGroup,
  Input,
  Select,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import vercel from "../public/next.svg";

// Components
import Sidebar from "../components/Sidebar";
import DiamondShape from "../components/DiamondShape";
import FilterSection from "../components/FilterSection";
import SearchBar from "@/components/SearchBar";
// Data
import {
  diamondShapes,
  caratOptions,
  fluorOptions,
  cutOptions,
  polishOptions,
  colorOptions,
  clarityOptions,
  labOptions,
  symmOptions,
  locationOptions,
} from "@/lib/dummyData";
import Image from "next/image";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [shapes, setShapes] = useState([]);
  const [loadingShapes, setLoadingShapes] = useState(true);

  const sidebarWidth = useBreakpointValue({
    base: "60px",
    md: isSidebarOpen ? "200px" : "60px",
  });

  const sidebarContainerRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchShapes = async () => {
      try {
        const res = await fetch("/api/shapes");
        const data = await res.json();
        setShapes(data.shapes);
        // console.log("Shapes:", data.shapes);
      } catch (error) {
        console.error("Error fetching shapes:", error);
        // Handle error (e.g., show an error message)
      } finally {
        setLoadingShapes(false);
      }
    };

    fetchShapes();
  }, []);

  useEffect(() => {
    if (sidebarWidth !== "60px") {
      onClose();
    }
  }, [sidebarWidth, onClose]);

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

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const filterValues = prevFilters[filterType] || [];

      // Check if the value is already selected
      const isValueSelected = filterValues.includes(value);

      // If it's selected, remove it, otherwise add it
      const updatedFilterValues = isValueSelected
        ? filterValues.filter((val) => val !== value)
        : [...filterValues, value];

      console.log("Selected Filters:", selectedFilters);
      return {
        ...prevFilters,
        [filterType]: updatedFilterValues,
      };
    });
  };

  const handleSearch = () => {
    console.log("Search Filters:", selectedFilters);
  };

  return (
    <Box backgroundColor={"gray.200"}>
      {/* Header */}
      <Flex
        backgroundColor="blue.700"
        p={2}
        align="center"
        position={"-webkit-sticky"}
        top={0}
        ml={{ base: 0, md: isSidebarOpen ? "205px" : "50px" }}
        zIndex={100}
        width="100%"
      >
        <HamburgerIcon
          display={{ base: "block", md: "none" }}
          onClick={onOpen}
          color={"white"}
        />
        <Image
          src={vercel}
          alt="Logo"
          width={100}
          height={50}
          style={{ marginLeft: "20px", marginRight: "20px" }}
        />
        <SearchBar />
      </Flex>

      <Flex ref={sidebarContainerRef} mt={0}>
        {/* Drawer (Mobile) */}
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          size="xs"
          // display={{ base: "block", md: "none", lg: "none" }}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Sidebar isOpen={isOpen} onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Sidebar (Desktop) */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          onOpen={onOpen}
          top={0}
          width={sidebarWidth}
          display={{ base: "none", md: "block" }}
        />

        {/* Main Content Area */}
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
          backgroundColor={"white"}
          ml={{ base: 0, md: isSidebarOpen ? "205px" : "50px" }}
          overflowX="hidden"
          transition="margin-left 0.3s"
        >
          {/* Diamond Shape Section */}
          <Box mb={6}>
            <Heading as="h2" size="md" mb={2}>
              Shape
            </Heading>
            {loadingShapes ? (
              <Text>Loading shapes...</Text>
            ) : (
              <SimpleGrid columns={{ base: 4, md: 8, lg: 12 }} spacing={4}>
                {shapes.map((shape) => (
                  <DiamondShape
                    key={shape.ShapeID}
                    shape={shape}
                    isSelected={selectedFilters.shape.includes(shape.ShapeID)}
                    onClick={() => {
                      handleFilterChange("shape", shape.ShapeID); // Use handleFilterChange
                    }}
                  />
                ))}
              </SimpleGrid>
            )}
          </Box>

          {/* Filters Section - Using Grid for two-column layout */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            {/* Column 1 */}
            <GridItem>
              <FilterSection
                label="Carat"
                options={caratOptions}
                selectedValues={selectedFilters.carat}
                onFilterChange={(value) => handleFilterChange("carat", value)}
              />
              <FilterSection
                label="Fluor."
                options={fluorOptions}
                selectedValues={selectedFilters.fluor}
                onFilterChange={(value) => handleFilterChange("fluor", value)}
              />
              <FilterSection
                label="Cut"
                options={cutOptions}
                selectedValues={selectedFilters.cut}
                onFilterChange={(value) => handleFilterChange("cut", value)}
              />
              <FilterSection
                label="Polish"
                options={polishOptions}
                selectedValues={selectedFilters.polish}
                onFilterChange={(value) => handleFilterChange("polish", value)}
              />
            </GridItem>

            {/* Column 2 */}
            <GridItem>
              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>
                  Color
                </Text>
                <FilterSection
                  options={colorOptions}
                  selectedValues={selectedFilters.color}
                  onFilterChange={(value) => handleFilterChange("color", value)}
                />
              </Box>
              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>
                  Clarity
                </Text>
                <FilterSection
                  options={clarityOptions}
                  selectedValues={selectedFilters.clarity}
                  onFilterChange={(value) =>
                    handleFilterChange("clarity", value)
                  }
                />
              </Box>
              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>
                  Lab
                </Text>
                <FilterSection
                  options={labOptions}
                  selectedValues={selectedFilters.lab}
                  onFilterChange={(value) => handleFilterChange("lab", value)}
                />
              </Box>
              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>
                  Symm.
                </Text>
                <FilterSection
                  options={symmOptions}
                  selectedValues={selectedFilters.symm}
                  onFilterChange={(value) => handleFilterChange("symm", value)}
                />
              </Box>
              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>
                  Location
                </Text>
                <FilterSection
                  options={locationOptions}
                  selectedValues={selectedFilters.location}
                  onFilterChange={(value) =>
                    handleFilterChange("location", value)
                  }
                />
              </Box>
            </GridItem>
          </Grid>

          <Button
            backgroundColor="blue.700"
            color={"white"}
            size="sm"
            mt={4}
            mb={6}
          >
            Show Advance Filters
          </Button>

          {/* Search Buttons */}
          <Flex mt={6} justify="flex-end">
            <Button backgroundColor="blue.700" color={"white"} mr={2}>
              Cancel
            </Button>
            <Button
              backgroundColor="blue.700"
              color={"white"}
              mr={2}
              onClick={() => setSelectedFilters({})}
            >
              Reset
            </Button>
            <Button
              backgroundColor="blue.700"
              color={"white"}
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button ml={2} rightIcon={<ChevronDownIcon />}>
              Save Search
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
