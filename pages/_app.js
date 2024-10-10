import { Provider } from "react-redux";
import { store } from "../store";
import { ChakraProvider } from "@chakra-ui/react";
// import { SessionProvider } from "next-auth/react";
import Footer from "../components/Footer";
import theme from "../lib/theme";
import Header from "../components/Header";
function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {/* Wrap your app with SessionProvider */}
        {/* <SessionProvider session={session}> */}
        <Header />
        <Component {...pageProps} />
        <Footer />
        {/* </SessionProvider> */}
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
