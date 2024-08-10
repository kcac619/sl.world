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
            href="catalog/view/javascript/jquery/swiper/css/slick.css"
            rel="stylesheet"
          />
          <link
            href="catalog/view/javascript/jquery/swiper/css/slick-theme.css"
            rel="stylesheet"
          />
          <link
            href="catalog/view/javascript/font-awesome/css/font-awesome.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <script
            src="catalog/view/javascript/jquery/jquery-3.6.0.min.js"
            type="text/javascript"
          ></script>
          <link
            href="catalog/view/stylesheet/bootstrap.css"
            type="text/css"
            rel="stylesheet"
            media="screen"
          />
          <link
            href="catalog/view/stylesheet/fonts/fontawesome/css/all.min.css"
            type="text/css"
            rel="stylesheet"
          />
          <link
            href="catalog/view/stylesheet/stylesheet.css"
            type="text/css"
            rel="stylesheet"
          />

          <script
            type="text/javascript"
            src="catalog/view/javascript/jquery/datetimepicker/moment.min.js"
          ></script>
          <script
            type="text/javascript"
            src="catalog/view/javascript/jquery/datetimepicker/moment-with-locales.min.js"
          ></script>
          <script
            type="text/javascript"
            src="catalog/view/javascript/jquery/datetimepicker/daterangepicker.js"
          ></script>
          <link
            href="catalog/view/javascript/jquery/datetimepicker/daterangepicker.css"
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

          {/* <script
            src="catalog/view/javascript/workdo/custom.js"
            type="text/javascript"
          ></script> */}
          {/* <script
            src="catalog/view/javascript/workdo/option.js"
            type="text/javascript"
          ></script> */}
          {/* <script
            src="catalog/view/javascript/common.js"
            type="text/javascript"
          ></script> */}
          <script
            src="catalog/view/javascript/bootstrap/js/bootstrap.bundle.min.js"
            type="text/javascript"
          ></script>
          <script
            src="/catalog/view/javascript/jquery/swiper/js/slick.js"
            defer
          ></script>
          {/* <script
            src="extension/workdonewsletter/catalog/view/jquery/workdonewsletter.js"
            type="text/javascript"
          ></script> */}
          {/* <script type="text/javascript">
    
  $('.add').click(function () {   
    var th = $(this).closest('.wrap').find('.count');     
    th.val(+th.val() + 1);
  });
  $('.sub').click(function () {
    var th = $(this).closest('.wrap').find('.count');     
        if (th.val() > 1) th.val(+th.val() - 1);
  });
  </script> */}
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
