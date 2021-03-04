import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from '@reactchartjs/react-chart.js';

const chartColor = [
  'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 206, 86, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(153, 102, 255, 0.5)',
  'rgba(255, 159, 64, 0.5)',
];

const noDataColor = [
  'rgba(255, 99, 132, 0.5)',
];

const noDataPreset = {
  labels: ['No Data'],
  datasets: [
    {
      label: '# of Transport',
      data: [1],
      backgroundColor: noDataColor,
      borderColor: noDataColor,
      borderWidth: 2,
    },
  ],
};

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TransportMethodPieChart extends React.Component {
  /*
   * Aggregate the userTransportation into an array for the pie chart
   * @param timeSpan Only select data from today to the timespan
   * @returns {number[]} A 6-element array of # of mode of transport
   */
  userTransportAggregate(timeSpan) {
    const afterDateAndCar = this.props.userTransportation.filter(doc => doc.date > timeSpan);
    if (afterDateAndCar.length === 0) {
      return [0];
    }
    const transportMethod = afterDateAndCar.map(doc => doc.transport);
    const dataArray = [0, 0, 0, 0, 0, 0]; // TODO: change to transport methods object
    transportMethod.forEach(doc => {
      switch (doc) {
        case 'Telecommute':
          dataArray[0] += 1;
          break;
        case 'Walk':
          dataArray[1] += 1;
          break;
        case 'Bike':
          dataArray[2] += 1;
          break;
        case 'Carpool':
          dataArray[3] += 1;
          break;
        case 'Bus':
          dataArray[4] += 1;
          break;
        case 'Car':
          dataArray[5] += 1;
          break;
        default:
          console.log('Error: Unexpected transport type');
          break;
      }
    });
    return dataArray;
  }

  /**
   * Change the chart's display based on a given preset
   * @param data The transport data from this.props
   * @param timeSpan Only select data from today to the timespan
   * @returns a data to use for the pie chart component
   */
  pieChartPreset(data, timeSpan) {
    const afterDate = data.filter(doc => doc.date > timeSpan);
    if (afterDate.length === 0) {
      return noDataPreset;
    }
    return {
      labels: ['Telecommute', 'Walk', 'Bike', 'Carpool', 'Bus', 'Car'],
      datasets: [
        {
          label: '# of Transport',
          data: this.userTransportAggregate(timeSpan),
          backgroundColor: chartColor,
          borderColor: chartColor,
          borderWidth: 2,
        },
      ],
    };
  }

  render() {
    return (
          <Pie data={this.pieChartPreset(this.props.userTransportation, this.props.timeSpan)} />
    );
  }
}

/** Require a document to be passed to this component. */
TransportMethodPieChart.propTypes = {
  userTransportation: PropTypes.array.isRequired,
  timeSpan: PropTypes.object.isRequired,
};

export default TransportMethodPieChart;
