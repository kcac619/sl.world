import { Box, Text, Stack, Center } from "@chakra-ui/react";

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
        color="var(--sub-color)"
      >
        {label}
      </Text>
      <hr style={{ color: "var(--sub-color)", width: "50px" }} />
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {options.map((option) => (
          <Center
            key={option.value}
            style={{
              fontWeight: 200,
              borderRadius: "4px",
              fontFamily: "outfit",
              boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.15)",
              minWidth: "40px",
              fontSize: "xs",
              cursor: "pointer",
              textAlign: "center",
              padding: "8px",
              marginRight: "8px",
              backgroundColor: selectedValues.includes(option.value)
                ? "rgba(0, 0, 0, 0.3)"
                : "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              color: selectedValues.includes(option.value)
                ? "var(--main-color)"
                : "var(--sub-color)",
              backgroundImage: selectedValues.includes(option.value)
                ? "linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.3) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
              transition: "all 0.3s ease",
            }}
            onClick={() => onFilterChange(option.value)}
            // _hover={{
            //   boxShadow: "inset 0px 0px 2px  #000",
            //   border: "1px solid var(--sub-color)",
            // }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
              e.currentTarget.style.transform = "scale(1.08)";
              // e.currentTarget.style.border = "1px solid var(--sub-color)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0px 3px 10px rgba(0, 0, 0, 0.15)";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.border = "none";
            }}
          >
            {option.label}
          </Center>
        ))}
      </Stack>
    </Box>
  );
};

export default FilterSection;
