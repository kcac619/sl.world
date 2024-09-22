import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />

          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {/* <base href="https://opencart.workdo.io/diamond/" />
          <meta name="description" content="Product Store" /> */}

          <link
            href="/js/jquery/swiper/css/slick.css"
            rel="stylesheet"
          />
          <link
            href="/js/jquery/swiper/css/slick-theme.css"
            rel="stylesheet"
          />
          <link
            href="/js/font-awesome/css/font-awesome.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <script
            src="/js/jquery/jquery-3.6.0.min.js"
            type="text/javascript"
          ></script>
          <link
            href="/css/bootstrap.css"
            type="text/css"
            rel="stylesheet"
            media="screen"
          />
          <link
            href="/css/fonts/fontawesome/css/all.min.css"
            type="text/css"
            rel="stylesheet"
          />
          <link
            href="/css/stylesheet.css"
            type="text/css"
            rel="stylesheet"
          />

          <script
            type="text/javascript"
            src="/js/jquery/datetimepicker/moment.min.js"
          ></script>
          <script
            type="text/javascript"
            src="/js/jquery/datetimepicker/moment-with-locales.min.js"
          ></script>
          <script
            type="text/javascript"
            src="/js/jquery/datetimepicker/daterangepicker.js"
          ></script>
          <link
            href="/js/jquery/datetimepicker/daterangepicker.css"
            rel="stylesheet"
            type="text/css"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />


        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
