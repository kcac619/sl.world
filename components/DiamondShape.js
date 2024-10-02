import { Box, Text, Center } from "@chakra-ui/react";
import rbc from "../public/img/R.png";
import Image from "next/image";

const DiamondShape = ({ shape, isSelected, onClick }) => {
  return (
    <Center
      style={{
        borderRadius: "8px",
        flex: 1,
        flexDirection: "column",
        boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.15)",
        padding: "10px 16px",
        textAlign: "center",
        backgroundColor: isSelected
          ? "rgba(13,30,20, 1)"
          : "rgba(242, 223, 207, 0.8)",
        backdropFilter: "blur(10px)",

        cursor: "pointer",
        fontFamily: "outfit",
        color: isSelected ? "var(--main-color)" : "var(--sub-color)",
        // backgroundImage: isSelected
        //   ? "linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.3) 100%)"
        //   : "linear-gradient(135deg, rgba(230, 230, 230, 0.2) 0%, rgba(0, 0, 0, 1) 380%)",
        transition: "all 0.3s ease",
      }}
      // _hover={{
      //   boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 1)",
      //   scale: 1.1,
      //   border: "1px solid var(--sub-color)",
      // }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        e.currentTarget.style.transform = "scale(1.1)";
        // e.currentTarget.style.border = "1px solid var(--sub-color)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0px 3px 10px rgba(0, 0, 0, 0.15)";
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.border = "none";
      }}
      onClick={onClick}
    >
      <Image src={rbc} alt={shape.ShapeName} width={50} height={50} />
      <Text fontSize="xs">{shape.ShapeName}</Text>
    </Center>
  );
};

export default DiamondShape;
