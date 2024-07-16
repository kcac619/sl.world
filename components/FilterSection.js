// components/FilterSection.js
import { Box, Text, Stack, Button } from "@chakra-ui/react";

const FilterSection = ({ label, options, onFilterChange }) => {
  return (
    <Box mb={4}>
      <Text fontWeight="bold" mb={2}>
        {label}
      </Text>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {options.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            onClick={() => onFilterChange(option.value)}
            // Add active/selected state styles
          >
            {option.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default FilterSection;
