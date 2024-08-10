/* price*/

// Quantity Cart Start
var qty = {
'minus' : function(product_id) {
var input = $("input[id='input-quantity-" + product_id + "']");
var currentVal = parseInt(input.val());
if (!isNaN(currentVal)) {
var minValue = parseInt(input.attr('min'));
if (!minValue) minValue = 1;
if (currentVal > minValue) {
input.val(currentVal - 1).change();
}
if (parseInt(input.val()) == minValue) {
$(this).attr('disabled', true);
}
}
else {
input.val(1);
}
},
'plus' : function(product_id) {
var input = $("input[id='input-quantity-" + product_id + "']");
var currentVal = parseInt(input.val());
if (!isNaN(currentVal)) {
var maxValue = parseInt(input.attr('max'));
if (!maxValue) maxValue = 999;
if (currentVal < maxValue) {
input.val(currentVal + 1).change();
$('.dis-' + product_id).prop('disabled', false);    
}
if (parseInt(input.val()) == maxValue) {
$(this).attr('disabled', true);
}
}
else {
input.val(1);
}
},
'cart' : function(product_id) {
var qty = $('#input-quantity-' + product_id).val();
if(qty > 0) cart.add(product_id,qty);       
else {
//alert($("input[name='hid-qty-msg']").val());
$('#content').parent().before('<div class="alert alert-danger alert-dismissible"><i class="fa fa-check-circle"></i> ' + $("input[name='hid-qty-msg']").val() + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');    
$('html, body').animate({ scrollTop: 0 }, 'slow');
$('#input-quantity-' + product_id).val("1");
}
}
}
// Quantity Cart End

$(document).ready(function () {
$('.imgslider').slick({
  customPaging: function(slick,index) {
    return '<span>' +'0'+ (index + 1) + '</span>';
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
};

});


function openSearch() {
$('body').addClass("active-search");
document.getElementById("search").style.height = "auto";
$('#search').addClass("sideb");
$('.search_query').attr('autofocus', 'autofocus').focus();
}
function closeSearch() {
$('body').removeClass("active-search");
document.getElementById("search").style.height = "0";
$('#search').addClass("siden");
$('.search_query').attr('autofocus', 'autofocus').focus();
}


/* responsive menu */
function openNav() {
document.getElementById("myOverlay").style.display = "block";
document.getElementById("stamenu").className = "active menu-fixed";
}

function closeNav() {
document.getElementById("myOverlay").style.display = "none";
document.getElementById("stamenu").className = "menu-fixed";
}
