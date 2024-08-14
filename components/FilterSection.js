// components/FilterSection.js
import { Box, Text, Stack, Button } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

const FilterSection = ({
  label,
  options,
  onFilterChange,
  selectedValues = [],
}) => {
  return (
    <Box mb={4}>
      <Text
        fontWeight="bold"
        mb={{ base: 1, md: 0 }}
        fontFamily="outfit"
        color="#f2dfcf"
      >
        {label}
      </Text>
      <hr style={{ color: "#f2dfcf", width: "50px" }} />
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {options.map((option) => (
          <Center
            key={option.value}
            // variant="outline"
            fontWeight={200}
            borderRadius="4px"
            fontFamily="outfit"
            boxShadow={"0px 3px 10px rgba(255, 255, 255, 0.05)"}
            minWidth="40px"
            fontSize="xs"
            _hover={{ boxShadow: "inset 0 0 0 1px rgb(242,223,207, 1)" }}
            cursor="pointer"
            textAlign={"center"}
            p={{ base: 1, md: 2 }}
            mr={2}
            // pr={10}
            onClick={() => onFilterChange(option.value)}
            // Add active/selected state styles
            backgroundColor={
              selectedValues.includes(option.value) ? "#f2dfcf" : "#0d1e1c"
            }
            color={
              selectedValues.includes(option.value) ? "#112825" : "#f2dfcf"
            }
          >
            {option.label}
          </Center>
        ))}
      </Stack>
    </Box>
  );
};

export default FilterSection;
