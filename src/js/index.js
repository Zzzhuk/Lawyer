import * as $ from "jquery";
import fullpage from 'fullpage.js';
// import Chart from 'chart.js';
// import config from "../config";
import scrolloverflow from "fullpage.js/vendors/scrolloverflow"
import MobileDetect from "mobile-detect"

const md = new MobileDetect(window.navigator.userAgent),
  mob = (md.mobile() || md.phone());

const anchors = ['main', 'fund', 'ceo', 'parameters', 'algorithm', 'advantages', 'footer'];
if (mob) {
  anchors.splice(2, 0, 'investment');
  $('.third-section').addClass('section')
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

// let found = new Chart($('#found'), {
//   type: 'line',
//   animationEnabled: true,
//   data: {
//     labels: ['', ...config.labels],
//     datasets: [{
//       data: [0, ...config.data],
//       borderColor: '#e40155',
//       pointBorderColor: '#e40155',
//       backgroundColor: 'transparent',
//       borderWidth: 2,
//       pointBackgroundColor: '#B8B8B8'
//     }]
//   },
//   options: {
//     responsive: true,
//     tooltips: {
//       backgroundColor: "#0D0D0D",
//       bodyFontFamily: "'Inter', sans-serif",
//       bodyFontSize: (md.mobile() || md.phone()) ? 12 : 16,
//       bodyFontColor: '#e40155',
//       bodyFontStyle: '400',
//       bodyAlign: 'center',
//       displayColors: false,
//       borderColor: '#B8B8B8',
//       borderWidth: 1,
//       callbacks: {
//         title: () => false,
//         label: function (tooltipItems, data) {
//           return tooltipItems.yLabel + '%';
//         },
//       }
//     },
//     legend: {
//       display: false,
//     },
//     scales: {
//       xAxes: [{
//         offset: true,
//         gridLines: {
//           drawOnChartArea: false,
//           color: '#B8B8B8',
//         },
//         ticks: {
//           fontFamily: "'Inter', sans-serif",
//           fontSize: (md.mobile() || md.phone()) ? 10 : 14,
//           padding: 20,
//           fontColor: '#B8B8B8',
//           beginAtZero: true,
//         }
//       }],
//       yAxes: [{
//         gridLines: {
//           color: '#B8B8B8',
//           zeroLineColor: '#B8B8B8',
//           drawBorder: false,
//           tickMarkLength: 10
//         },
//         ticks: {
//           fontColor: '#B8B8B8',
//           fontFamily: "'Inter', sans-serif",
//           fontSize: (md.mobile() || md.phone()) ? 10 : 14,
//           beginAtZero: true,
//           max: 100,
//           min: 0,
//           stepSize: 50,
//           padding: 15,
//
//           callback: function (value) {
//             return value + '%'
//           }
//         }
//       }],
//     }
//   }
// });
$('video').ready(function () {
  $("#preloader").fadeOut()
  $(".main-section .title").addClass('animated')
  $(".main-section .text").addClass('animated')
});
$(document).ready(function () {
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