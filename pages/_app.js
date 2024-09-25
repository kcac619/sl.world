import { Provider } from "react-redux";
import { store } from "../store";
import { ChakraProvider } from "@chakra-ui/react";
// import { SessionProvider } from "next-auth/react";

import theme from "../lib/theme";

function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {/* Wrap your app with SessionProvider */}
        {/* <SessionProvider session={session}> */}
        <Component {...pageProps} />
        {/* </SessionProvider> */}
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
