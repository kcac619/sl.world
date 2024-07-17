// components/FilterSection.js
import { Box, Text, Stack, Button } from "@chakra-ui/react";

const FilterSection = ({
  label,
  options,
  onFilterChange,
  selectedValues = [],
}) => {
  return (
    <Box mb={4}>
      <Text fontWeight="bold" mb={{ base: 1, md: 2 }}>
        {label}
      </Text>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {options.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            fontWeight={300}
            fontSize="sm"
            p={{ base: 1, md: 2 }}
            onClick={() => onFilterChange(option.value)}
            // Add active/selected state styles
            backgroundColor={
              selectedValues.includes(option.value) ? "blue.700" : "white"
            }
            color={selectedValues.includes(option.value) ? "white" : "black"}
          >
            {option.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default FilterSection;
