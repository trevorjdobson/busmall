'use strict';

function buildChart(arr){
  var ctx = document.getElementById('myChart').getContext('2d');
  var labels = [];
  var percentages = [];
  var shown = [];
  var clicked = [];
  var colors = [];

  arr.forEach(el => {
    labels.push(el.name);
    clicked.push(el.clicked);
    shown.push(el.shown);

    var percentage = ((el.clicked/el.shown)*100).toFixed(2);
    if(isNaN(percentage)){
      percentages.push(0);
    }else{
      percentages.push(percentage);
    }
    //https://stackoverflow.com/questions/1484506/random-color-generator
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    colors.push(getRandomColor());
  });

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Busmall Research Results',
        data: percentages,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }]
    },
    options: {
      tooltips: {
        mode: 'label',
        callbacks: {
          label: function(tooltipItem) {
            var label = labels[tooltipItem.datasetIndex];

            return label;
          },
          afterLabel: function(tooltipItem){
            var displayed = `Times Shown: ${shown[tooltipItem.datasetIndex]} Times Clicked: ${clicked[tooltipItem.datasetIndex]} Percentage: %${percentages[tooltipItem.datasetIndex]}`;
            return displayed;
          },
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
