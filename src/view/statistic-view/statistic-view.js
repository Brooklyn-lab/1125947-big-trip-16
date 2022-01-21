import SmartView from '../smart-view';
import { createStatisticTemplate } from './statistic-view.tpl';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { calculateTypeCost, calculateTypeCount, calculateTypeTime, tripEventType } from '../../utils/statistics';
import { eventDurationFormat } from '../../utils/common';

const BAR_HEIGHT = 75;

const renderMoneyChart = (moneyCtx, points) => {
  moneyCtx.height = BAR_HEIGHT * 6;

  const pointsTypesCost = calculateTypeCost(points);
  const typeLabels = [...pointsTypesCost.keys()];
  const typeValues = [...pointsTypesCost.values()];

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: tripEventType(typeLabels),
      datasets: [{
        data: typeValues,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, points) => {
  typeCtx.height = BAR_HEIGHT * 6;

  const pointsTypesCount = calculateTypeCount(points);
  const typeLabels = [...pointsTypesCount.keys()];
  const typeValues = [...pointsTypesCount.values()];

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: tripEventType(typeLabels),
      datasets: [{
        data: typeValues,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, points) => {
  timeCtx.height = BAR_HEIGHT * 5;

  const pointsTypesTime = calculateTypeTime(points);
  const typeLabels = [...pointsTypesTime.keys()];
  const typeValues = [...pointsTypesTime.values()];

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: tripEventType(typeLabels),
      datasets: [{
        data: typeValues,
        backgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${eventDurationFormat(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export default class StatisticView extends SmartView {
  #moneyChart = null;
  #typeChart = null;
  #timeChart = null;
  _data = null

  constructor(points) {
    super();
    this._data = points;
    this.#setCharts();
  }

  get template() {
    return createStatisticTemplate();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#moneyChart) {
      this.#moneyChart.destroy();
      this.#moneyChart = null;
    }
    
    if (this.#typeChart) {
      this.#typeChart.destroy();
      this.#typeChart = null;
    }

    if (this.#timeChart) {
      this.#timeChart.destroy();
      this.#timeChart = null;
    }
  }

  restoreHandlers = () => {
    this.#setCharts();
  }

  #setCharts = () => {
    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    this.#moneyChart = renderMoneyChart(moneyCtx, this._data);
    this.#typeChart = renderTypeChart(typeCtx, this._data);
    this.#timeChart = renderTimeChart(timeCtx, this._data);
  }
}

