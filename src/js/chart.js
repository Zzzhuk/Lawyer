google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  const data = google.visualization.arrayToDataTable([
    ['', ''],
    ['2020 год',  73],
  ]);

  const options = {
    legend: { position: 'bottom' },
    backgroundColor: '#0D0D0D',
    colors: ['#e40155']
  };

  const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}