// components/DiamondShape.js
import { Box, Text, Center } from "@chakra-ui/react";
import rbc from "../public/img/R.png";
import Image from "next/image";
const DiamondShape = ({ shape, isSelected, onClick }) => {
  return (
    <Center
      // border="1px"
      // borderColor="#20C997"

      borderRadius="md"
      flex={1}
      flexDir={"column"}
      boxShadow={"0px 3px 10px rgba(0, 0, 0, 0.15)"}
      p={2}
      _hover={{ boxShadow: "inset 0 0 0 1px rgb(242,223,207, 1)" }}
      textAlign="center"
      backgroundColor="transparent"
      cursor="pointer"
      fontFamily="outfit"
      color={isSelected ? "var(--sub-color)" : "var(--main-color"} // Conditional text color
      bg={isSelected ? "var(--secondary-color)" : "#f2dfcf"} // Conditional background
      onClick={onClick}
      // Add active state styles (optional)
    >
      {/* Replace with diamond shape icons */}
      <Image src={rbc} alt={shape.ShapeName} width={50} height={50} />
      <Text fontSize="xs">{shape.ShapeName}</Text>
    </Center>
  );
};

export default DiamondShape;
