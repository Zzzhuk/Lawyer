import * as $ from "jquery";
import scroll from 'fullpage.js/vendors/scrolloverflow.min';
import fullpage from 'fullpage.js';
import Chart from 'chart.js';
import config from "../config";

const fullPageInstance = new fullpage('#fullpage', {
  navigation: true,
  menu: '#headerMenu',
  scrollingSpeed: 500,
  scrollOverflow: true,
  anchors: ['main', 'fund', 'investment', 'ceo', 'income', 'parameters', 'algorithm', 'advantages', 'footer'],
  afterLoad: function (origin, destination, direction) {
    $('.fp-section.active .toanimate').each(function () {
      const delay = $(this).data('delay');
      if (delay) {
        setTimeout(() => {
          $(this).addClass($(this).data('animate'))
            .removeClass('toanimate')
            .addClass('animated')
        }, delay)
      } else {
        $(this).addClass($(this).data('animate'))
          .removeClass('toanimate')
          .addClass('animated')
      }
    })

  }
});

let found = new Chart($('#found'), {
  type: 'line',
  animationEnabled: true,
  data: {
    labels: ['', ...config.labels, ''],
    datasets: [{
      data: [0, ...config.data],
      borderColor: '#878787',
      pointBorderColor: '#FA5255',
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointBackgroundColor: '#FA5255'
    }]
  },
  options: {
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20
      }
    },
    responsive: true,
    tooltips: {
      backgroundColor: "#FFF",
      bodyFontFamily: "'Inter', sans-serif",
      bodyFontSize: 16,
      bodyFontColor: '#FA5255',
      bodyFontStyle: '400',
      bodyAlign: 'center',
      displayColors: false,
      borderColor: '#878787',
      borderWidth: 1,
      callbacks: {
        title: () => false,
        label: function (tooltipItems, data) {
          return tooltipItems.yLabel + '%';
        },
      }
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          padding: 20
        }
      }],
      yAxes: [{
        ticks: {
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          beginAtZero: true,
          max: 15,
          min: 0,
          stepSize: 5,
          padding: 30
        }
      }],
    }
  }
});

$(document).ready(function () {
  setTimeout(() => {
    $("#preloader").fadeOut()
  });
  $(".toggle").click(function () {
    $("#headerMenu").toggleClass("active");
    $("#toggleMenu").toggleClass("active");
    if ($("header").hasClass('active')) {
      setTimeout(() => {
        $("header").removeClass('active')
      }, 300)
    } else {
      $("header").addClass('active')
    }
  })
});