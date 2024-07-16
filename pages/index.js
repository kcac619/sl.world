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

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sidebarWidth = useBreakpointValue({
    base: "60px",
    md: isSidebarOpen ? "200px" : "60px",
  });

  const sidebarContainerRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (sidebarWidth !== "60px") {
      onClose();
    }
  }, [sidebarWidth, onClose]);

  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleSearch = () => {
    console.log("Search Filters:", selectedFilters);
  };

  return (
    <Box backgroundColor={"gray.200"}>
      {/* Header */}
      <Flex
        backgroundColor="#212b53"
        p={2}
        align="center"
        position={"-webkit-sticky"}
        top={0}
        zIndex={100}
        width="100%"
      >
        <HamburgerIcon
          display={{ base: "block", md: "block" }}
          onClick={onOpen}
          color={"white"}
        />
        <Heading as="h1" color={"white"} size="lg" ml={4}>
          sj.world
        </Heading>
        <SearchBar />
      </Flex>

      <Flex ref={sidebarContainerRef}>
        {/* Drawer (Mobile) */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
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
          width={sidebarWidth}
          display={{ base: "none", md: "block" }}
        />

        {/* Main Content Area */}
        <Box
          flex="1"
          transform={{
            base: "scale(0.9)",
            md: "scale(0.8)",
            lg: "scale(0.8)",
          }}
          p={4}
          borderRadius={"20px"}
          backgroundColor={"white"}
          ml={{ base: 0, md: isSidebarOpen ? "200px" : "60px" }}
          overflowX="hidden"
          transition="margin-left 0.3s"
        >
          {/* Diamond Shape Section */}
          <Box mb={6}>
            <Heading as="h2" size="md" mb={2}>
              Shape
            </Heading>
            <SimpleGrid columns={{ base: 4, md: 8, lg: 12 }} spacing={4}>
              {diamondShapes.map((shape, index) => (
                <DiamondShape key={index} shape={shape} />
              ))}
            </SimpleGrid>
          </Box>

          {/* Filters Section - Using Grid for two-column layout */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            {/* Column 1 */}
            <GridItem>
              <FilterSection
                label="Carat"
                options={caratOptions}
                onFilterChange={(value) => handleFilterChange("carat", value)}
              />
              <FilterSection
                label="Fluor."
                options={fluorOptions}
                onFilterChange={(value) => handleFilterChange("fluor", value)}
              />
              <FilterSection
                label="Cut"
                options={cutOptions}
                onFilterChange={(value) => handleFilterChange("cut", value)}
              />
              <FilterSection
                label="Polish"
                options={polishOptions}
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
                  onFilterChange={(value) => handleFilterChange("color", value)}
                />
              </Box>
              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>
                  Clarity
                </Text>
                <FilterSection
                  options={clarityOptions}
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
                  onFilterChange={(value) => handleFilterChange("lab", value)}
                />
              </Box>
              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>
                  Symm.
                </Text>
                <FilterSection
                  options={symmOptions}
                  onFilterChange={(value) => handleFilterChange("symm", value)}
                />
              </Box>
              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>
                  Location
                </Text>
                <FilterSection
                  options={locationOptions}
                  onFilterChange={(value) =>
                    handleFilterChange("location", value)
                  }
                />
              </Box>
            </GridItem>
          </Grid>

          <Button
            backgroundColor="#212b53"
            color={"white"}
            size="sm"
            mt={4}
            mb={6}
          >
            Show Advance Filters
          </Button>

          {/* Search Buttons */}
          <Flex mt={6} justify="flex-end">
            <Button backgroundColor="#212b53" color={"white"} mr={2}>
              Cancel
            </Button>
            <Button
              backgroundColor="#212b53"
              color={"white"}
              mr={2}
              onClick={() => setSelectedFilters({})}
            >
              Reset
            </Button>
            <Button
              backgroundColor="#212b53"
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
