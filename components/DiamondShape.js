// components/DiamondShape.js
import { Box, Text, Center } from "@chakra-ui/react";
import rbc from "../public/img/RBC.jpg";
import Image from "next/image";
const DiamondShape = ({ shape, isSelected, onClick }) => {
  return (
    <Center
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      flex={1}
      flexDir={"column"}
      p={1}
      textAlign="center"
      backgroundColor="transparent"
      cursor="pointer"
      bg={isSelected ? "lightblue" : "white"} // Conditional background
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
