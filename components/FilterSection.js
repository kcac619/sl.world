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
        fontFamily="Playfair Display"
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
            fontWeight={300}
            borderRadius="4px"
            fontFamily="outfit"
            boxShadow={"2px 2px 4px rgba(255, 255, 255, 0.05)"}
            minWidth="40px"
            fontSize="sm"
            cursor="pointer"
            p={{ base: 1, md: 2 }}
            mr={0}
            pr={10}
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
