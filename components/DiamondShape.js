// components/DiamondShape.js
import { Box, Text, Center } from "@chakra-ui/react";
import rbc from "../public/img/RBC.jpg";
import Image from "next/image";
const DiamondShape = ({ shape }) => {
  return (
    <Center
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      flex={1}
      flexDir={"column"}
      p={1}
      textAlign="center"
      cursor="pointer"
      // Add active state styles (optional)
    >
      {/* Replace with diamond shape icons */}
      <Image src={rbc} alt={shape.name} width={50} height={50} />
      <Text fontSize="xs">{shape.name}</Text>
    </Center>
  );
};

export default DiamondShape;
