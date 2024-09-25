import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans";
import "@fontsource/raleway";
import "@fontsource/roboto";
import "@fontsource/playfair-display";

const theme = extendTheme({
  fonts: {
    heading: `Playfair Display,'Roboto', sans-serif`,
    body: `Playfair Display,'Roboto', sans-serif`,
  },
  colors: {
    chakra: {
      body: {
        text: "#F2DFCF", // Change this to your desired color
      },
    },
  },
});

export default theme;
