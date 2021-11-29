import ApexCharts from 'apexcharts';

export const burnChartOptions = {
  series: [10, 10, 10, 10],
  chart: {
    height: 250,
    type: 'donut',
  },
  dataLabels: {
    enabled: true,
  },
  tooltip: {
    y: {
      formatter: function (value) {
        return value + ' m²';
      },
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
  fill: {
    colors: ['grey', '#FFA07A', '#FA8072', '#CD5C5C', '#8B0000'],
  },
  colors: ['grey', '#FFA07A', '#FA8072', '#CD5C5C', '#8B0000'],
  labels: [
    'Ne opožareno',
    'Slabo opožareno',
    'Srednje opožareno',
    'Srednje jako opožareno',
    'Jako opožareno',
  ],
  legend: {
    show: true,
    position: 'right',
    offsetY: 0,
    height: 250,
    labels: {
      colors: '#fff',
    },
  },
  plotOptions: {
    pie: {
      customScale: 1,
    },
  },
};

export const burnChart = new ApexCharts(
  document.querySelector('#burn-chart'),
  burnChartOptions
);
burnChart.render();

export const forestChartOptions = {
  series: [
    {
      name: 'Izgoreno',
      data: [44, 55],
    },
    {
      name: 'Neizgoreno',
      data: [13, 23],
    },
  ],
  chart: {
    type: 'bar',
    height: 250,
    stacked: true,
    // stackType: '100%',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          show: false,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
    },
  },
  xaxis: {
    categories: ['Bjelogorica', 'Crnogorica'],
    labels: {
      style: {
        colors: '#fff',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Površina [m²] ',
      style: {
        color: '#fff',
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 550,
      },
    },
    labels: {
      show: true,
      style: {
        colors: '#fff',
      },
    },
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + ' m²';
      },
    },
  },

  fill: {
    opacity: 1,
    colors: ['#8B0000', '#3B945E'],
  },
  colors: ['#8B0000', '#3B945E'],
  legend: {
    position: 'right',
    offsetY: 0,
    height: 250,
    labels: {
      colors: '#fff',
    },
  },
};

export const forestChart = new ApexCharts(
  document.querySelector('#forest-chart'),
  forestChartOptions
);

forestChart.render();
