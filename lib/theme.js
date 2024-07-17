import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans";
import "@fontsource/raleway";
import "@fontsource/roboto";

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
});

export default theme;
