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
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                document.addEventListener('DOMContentLoaded', function() {
                  if (typeof window !== 'undefined' && window.jQuery) {
                    (function($) {
                      // Slick initializations (copied from custom.js)
                      $('.imgslider').slick({
                        customPaging: function(slick, index) {
                          return '<span>' + '0' + (index + 1) + '</span>';
                        },
                        fade: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        arrows: false,
                        dots: true,
                        autoplaySpeed: 5000,
                      });
                      $(".imgslider").show();

                      $('.offer_bnr').slick({
                        // ... (your Slick options for offer_bnr) ...
                         dots: false,
  infinite: true,
  autoplay: false,
  arrows: false,
  slidesToShow: 4, 
  slidesToScroll: 1,
      responsive: [
      {
        breakpoint: 1830,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2
        }
      }
      ]
                      }); 

                      $('.feature').slick({
                        // ... (your Slick options for feature) ...
                        dots: false,
infinite: true,
autoplay: false,
slidesToShow: 4,
slidesToScroll: 1,
rows: 1,
arrows: true,
responsive: [
{
breakpoint: 1440,
settings: {
slidesToShow: 4,
}
},
{
breakpoint: 1400,
settings: {
slidesToShow: 4,
}
},
{
breakpoint: 1200,
settings: {
slidesToShow: 4,
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 3,
}
},
{
breakpoint: 600,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 450,
settings: {
slidesToShow: 1,
}
}
]
                      });
                      $(".feature").show();

                      $('.latest').slick({
                        // ... (your Slick options for latest) ...
                        dots: false,
infinite: true,
autoplay: false,
slidesToShow: 4,
slidesToScroll: 1,
rows: 1,
arrows: true,
responsive: [
{
breakpoint: 1400,
settings: {
slidesToShow: 4,
}
},
{
breakpoint: 1200,
settings: {
slidesToShow: 4,
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 3,
}
},
{
breakpoint: 600,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 450,
settings: {
slidesToShow: 1,
}
}
]
                      });
                      $(".latest").show();
                      $('.wdtop').slick({
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    rows: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }); 
$(".wdtop").show();
$('.wdonsale').slick({
dots: false,
infinite: true,
autoplay: false,
slidesToShow: 2,
slidesToScroll: 1,
rows: 1,
arrows: true,
responsive: [
{
breakpoint: 1440,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 1400,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 1200,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 600,
settings: {
slidesToShow: 1,
}
},
{
breakpoint: 450,
settings: {
slidesToShow: 1,
}
}
]
});
$(".wdonsale").show();

$('.best').slick({
dots: false,
infinite: true,
autoplay: false,
slidesToShow: 4,
slidesToScroll: 1,
rows: 1,
arrows: true,
responsive: [
{
breakpoint: 1400,
settings: {
slidesToShow: 4,
}
},
{
breakpoint: 1200,
settings: {
slidesToShow: 4,
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 3,
}
},
{
breakpoint: 600,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 450,
settings: {
slidesToShow: 1,
}
}
]
});
$(".best").show();

$('.wdselected').slick({
dots: false,
infinite: true,
autoplay: false,
slidesToShow: 4,
slidesToScroll: 1,
rows: 1,
arrows: true,
responsive: [
{
breakpoint: 1400,
settings: {
slidesToShow: 4
}
},
{
breakpoint: 1200,
settings: {
slidesToShow: 4
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 3
}
},
{
breakpoint: 600,
settings: {
slidesToShow: 2
}
},
{
breakpoint: 450,
settings: {
slidesToShow: 1
}
}
]
});
$(".wdselected").show();

$('.wdcategory').slick({
dots: false,
infinite: true,
autoplay: false,
slidesToShow: 2,
slidesToScroll: 1,
rows: 1,
arrows: true,
responsive: [
{
breakpoint: 1400,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 1200,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 1,
}
},
{
breakpoint: 600,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 450,
settings: {
slidesToShow: 1,
}
}
]
});
$(".wdcategory").show();

$('.cattabone').slick({
  dots: false,
  infinite: true,
  autoplay: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  rows: 1,
  arrows: true,
  responsive: [
  {
  breakpoint: 1400,
  settings: {
  slidesToShow: 4,
  }
  },
  {
  breakpoint: 1200,
  settings: {
  slidesToShow: 3,
  }
  },
  {
  breakpoint: 992,
  settings: {
  slidesToShow: 3,
  }
  },
  {
  breakpoint: 600,
  settings: {
  slidesToShow: 2,
  }
  },
  {
  breakpoint: 450,
  settings: {
  slidesToShow: 1,
  }
  }
  ]
  });
  $(".cattabone").show();
  

$('.wbcount').slick({
dots: false,
infinite: false,
autoplay: false,
slidesToShow: 3, 
slidesToScroll: 1,
arrows: true,
responsive: [
{
breakpoint: 1400,
settings: {
slidesToShow: 3,
}
},
{
breakpoint: 1200,
settings: {
slidesToShow: 3,
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 1,
}
},
{
breakpoint: 768,
settings: {
slidesToShow: 1,
}
},
{
breakpoint: 450,
settings: {
slidesToShow: 1,
}
}
]
});

$('.wbspecial').slick({
  dots: false,
  arrows: true,
  infinite: true,
  autoplay: false,
  slidesToShow: 2, 
  slidesToScroll: 1,
  rows: 1,
  responsive: [
    {
      breakpoint: 1900,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1
      }
    }
    ]
});

$('.cattab').slick({
dots: false,
infinite: true,
autoplay: false,
arrows: true,
slidesToShow: 4,
slidesToScroll: 1,
rows: 1,
responsive: [
{
breakpoint: 1400,
settings: {
slidesToShow: 4,
}
},
{
breakpoint: 1200,
settings: {
slidesToShow: 3,
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 3,
}
},
{
breakpoint: 600,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 450,
settings: {
slidesToShow: 1,
}
}
]
});

$('.related').slick({
dots: false,
infinite: true,
autoplay: false,
arrows: true,
slidesToShow: 4,
slidesToScroll: 1,
rows: 1,
responsive: [
{
breakpoint: 1400,
settings: {
slidesToShow: 4,
}
},
{
breakpoint: 1200,
settings: {
slidesToShow: 4,
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 3,
}
},
{
breakpoint: 600,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 450,
settings: {
slidesToShow: 1,
}
}
]
});


// category
$('.wbcatimg').slick({
dots: false,
infinite: false,
autoplay: false,
arrows: true,
slidesToShow: 6, 
slidesToScroll: 1,
responsive: [
{
breakpoint: 1410,
settings: {
slidesToShow: 6
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 5
}
},
{
breakpoint: 767,
settings: {
slidesToShow: 4
}
},
{
breakpoint: 700,
settings: {
slidesToShow: 3
}
},        
{
breakpoint: 450,
settings: {
slidesToShow: 2
}
}
]
});
$('.wdlogoslider').slick({
dots: false,
infinite: false,
autoplay: true,
arrows: false,
slidesToShow: 5, 
slidesToScroll: 1,
responsive: [
{
breakpoint: 1410,
settings: {
slidesToShow: 5
}
},
{
breakpoint: 1200,
settings: {
slidesToShow: 5
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 5
}
},
{
breakpoint: 767,
settings: {
slidesToShow: 5
}
},
{
breakpoint: 700,
settings: {
slidesToShow: 4 
}
},        
{
breakpoint: 450,
settings: {
slidesToShow: 2
}
}
]
});
$(".wdlogoslider").show();

$('.wbblog').slick({
dots: false,
infinite: false,
autoplay: false,
arrows: true,
slidesToShow: 4, 
slidesToScroll: 1,
responsive: [
{
breakpoint: 1830,
settings: {
slidesToShow: 4
}
},
{
breakpoint: 1800,
settings: {
slidesToShow: 4
}
},
{
breakpoint: 1200,
settings: {
slidesToShow: 3
}
},
{
breakpoint: 900,
settings: {
slidesToShow: 2
}
},
{
breakpoint: 768,
settings: {
slidesToShow: 2
}
},
{
breakpoint: 550,
settings: {
slidesToShow: 1
}
}
]
});

$('.wbtesti').slick({
dots: false,
infinite: true,
autoplay: false,
arrows: true,
rows: 1,
slidesToShow: 2, 
slidesToScroll: 1,
responsive: [
{
breakpoint: 1440,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 1200,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 2,
}
},
{
breakpoint: 768,
settings: {
slidesToShow: 1,
}
},
{
breakpoint: 500,
settings: {
slidesToShow: 1,
}
}
]
});
$('.gallery_img').slick({
dots: false,
infinite: false,
autoplay: false,
arrows: true,
slidesToShow: 4, 
slidesToScroll: 1,
vertical: false,
verticalSwiping: false,
responsive: [
{
breakpoint: 1200,
settings: {
slidesToShow: 4
}
},
{
breakpoint: 992,
settings: {
slidesToShow: 4,
vertical: false,
verticalSwiping: false,
}
},
{
breakpoint: 768,
settings: {
slidesToShow: 3

}
},
{
breakpoint: 500,
settings: {
slidesToShow: 3,
vertical: false,
verticalSwiping: false
}
}
]
});

// append js

// $('.best-bg').appendTo('.specilban');

// $('.newsletter').appendTo('.specilban .beffect:last-child');
if ($(window).width() <= 991) {
$('.huser').appendTo('.userapp');
};

//go to top
$(window).scroll(function () {
$("#common-home").parent().addClass("home-page");
if ($(this).scrollTop() > 100) {
$('#scroll').fadeIn();
} else {
$('#scroll').fadeOut();
}
});
$('#scroll').click(function () {
$("html, body").animate({scrollTop: 0}, 600);
return false;
});

// Rating Scroll
$("#ratep,#ratecount").click(function() {
$('body,html').animate({
scrollTop: $(".product-tab").offset().top 
}, 1500);
});

// dropdown effect of account
if ($(window).width() <= 767) {
$('.catfilter').appendTo('.appres');
$('.dropdown a.account').on("click", function(e) {
$(this).next('ul').toggle();
e.stopPropagation();
e.preventDefault();
});
}

$('.dropdown button.test').on("click", function(e)  {
$(this).next('ul').toggle();
e.stopPropagation();
e.preventDefault();
});

// sticky header
if ($(window).width() >= 992) {
$(window).scroll(function () {
if ($(this).scrollTop() > 100) {
$('.hsticky').addClass('fixed');
} else {
$('.hsticky').removeClass('fixed');
}
});

// Click Menu
$(document).on('click', '#menu .dropdown .header-menu', function(e) {
$(this).toggleClass('active');
$(this).next( "div.dropdown-menu" ).toggle();
$("div.dropdown-menu").not($(this).next()).slideUp('fast');
e.stopPropagation();
e.preventDefault();
});
                      // ... Initialize ALL other Slick carousels here ...
                    })(window.jQuery);
                  }
                });
              })();
            `,
            }}
          /> */}
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
