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
        color="var(--main-color)"
      >
        {label}
      </Text>
      <hr style={{ color: "var(--main-color)", width: "50px" }} />
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {options.map((option) => (
          <Center
            key={option.value}
            // variant="outline"
            fontWeight={200}
            borderRadius="4px"
            fontFamily="outfit"
            boxShadow={"0px 3px 10px rgba(0, 0, 0, 0.15)"}
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
              selectedValues.includes(option.value)
                ? "var(--secondary-color)"
                : "var(--sub-color)"
            }
            color={
              selectedValues.includes(option.value)
                ? "var(--sub-color)"
                : "var(--main-color)"
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
