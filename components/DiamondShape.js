// components/DiamondShape.js
import { Box, Text, Center } from "@chakra-ui/react";
import rbc from "../public/img/R.png";
import Image from "next/image";
const DiamondShape = ({ shape, isSelected, onClick }) => {
  return (
    <Center
      // border="1px"
      // borderColor="#20C997"
      boxShadow={"0px 3px 10px rgba(255, 255, 255, 0.05)"}
      borderRadius="md"
      flex={1}
      flexDir={"column"}
      p={2}
      _hover={{ boxShadow: "inset 0 0 0 1px rgb(242,223,207, 1)" }}
      textAlign="center"
      backgroundColor="transparent"
      cursor="pointer"
      fontFamily="outfit"
      color={isSelected ? "#f2dfcf" : "#20C997"} // Conditional text color
      bg={isSelected ? "#20C997" : "#f2dfcf"} // Conditional background
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
