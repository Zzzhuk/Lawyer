import * as $ from "jquery";
import fullpage from 'fullpage.js';
// import scrolloverflow from "fullpage.js/vendors/scrolloverflow"
import MobileDetect from "mobile-detect"

const md = new MobileDetect(window.navigator.userAgent),
  mob = (md.mobile() || md.phone());

const anchors = ['ru', 'fund', 'ceo', 'parameters', 'algorithm', 'advantages', 'communications'];
if (mob) {
  anchors.splice(2, 0, 'investment');
  anchors.splice(4, 0, 'ceo-info');
  anchors.splice(8, 0, 'advantages-second');
  $('.mobile-section').each(function (){
    $(this).addClass('section')
  })
}
const fullPageInstance = new fullpage('#fullpage', {
  menu: '#headerMenu',
  scrollingSpeed: 500,
  scrollOverflow: mob,
  anchors,
  afterLoad: function (origin, destination, direction) {
    if ($('.fp-section.active #video').get(0)) {
      $('.fp-section.active #video').get(0).play();
    }
    $('.fp-section.active .toanimate').each(function () {
      const delay = $(this).data('delay');
      if (delay) {
        setTimeout(() => {
          $(this).addClass($(this).data('animate'))
            .removeClass('toanimate')
            .addClass('animate__animated')
        }, delay)
      } else {
        $(this).addClass($(this).data('animate'))
          .removeClass('toanimate')
          .addClass('animate__animated')
      }
    })

  }
});


$(document).ready(function () {
  $('#video').on("canplay", function() {
    $("#preloader").fadeOut()
    $(".main-section .title").each(function() {
      $(this).addClass('animated');
    })
    $(".main-section .text").addClass('animated');
  });
    $(".toggle, .header-menu").click(function () {
    $("#headerMenu").toggleClass("active");
    $("#toggleMenu").toggleClass("active");
    if ($("header").hasClass('active')) {
      setTimeout(() => {
        $("header").removeClass('active')
      }, 300)
    } else {
      $("header").addClass('active')
    }
  });
  $('.header-menu-list').click(function (event) {
    event.stopPropagation();
  });
});