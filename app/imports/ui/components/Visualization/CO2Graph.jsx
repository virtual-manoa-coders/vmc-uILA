import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CO2CalculationTimespan, CO2CalculationTypeEnum } from './Functions';

/**
 * Geenrates the labels for the x axis, with varying format using MomentJS's format option
 * @param format Format of the x axis label
 * @param dateType The amount of time between each data point
 * @param numberOfDataPoints Number of points on the x axis
 * @param date The initial date of the right most data point
 * @returns {[]} An array of labels for the x axis
 * @constructor
 */
const DataLabel = (format, dateType, numberOfDataPoints, date) => {
  const result = [];
  const time = moment(date.toDate()); // moment objects are passed by reference
  result[numberOfDataPoints - 1] = time.format(format);
  for (let i = 1; i < numberOfDataPoints; i++) {
    result[numberOfDataPoints - i - 1] = time.subtract(1, dateType).format(format);
  }
  return result;
};

/**
 * Generate a number of data points backwards for the graph in an array form, starting from the given date, each data
 * point uses the data right after last data point to the current data point, i.e. (last, current].
 * @param data Array of raw transport data
 * @param dateType The amount of time between each data point
 * @param numberOfDataPoints Number of points on the x axis
 * @param calType CO2GraphTypeEnum type
 * @param date The initial date of the right most data point
 * @returns {[]} An array of data points
 */
const DataPoints = (data, dateType, numberOfDataPoints, calType, date) => {
  const result = [];
  const time = moment(date.toDate()); // moment objects are passed by reference

  for (let i = 0; i < numberOfDataPoints; i++) {
    result[numberOfDataPoints - i - 1] = CO2CalculationTimespan(data, moment(time.toDate()).subtract(1, dateType), moment(time).toDate(), calType);
    time.subtract(1, dateType);
  }
  return result;
};

/**
 * Returns a object to be used in react-chart's data prop
 * @param data Array of raw transport data
 * @param format Format of the x axis label
 * @param dateType The amount of time between each data point
 * @param numberOfDataPoints Number of points on the x axis
 * @returns dataObject for react-chart's line graph
 * @constructor
 */
const GraphData = (data, format, dateType, numberOfDataPoints) => {
  const now = moment().endOf(dateType);

  const dataObject = {
    labels: DataLabel(format, dateType, numberOfDataPoints, now),
    datasets: [
      {
        label: 'Your Saved GHG',
        data: DataPoints(data, dateType, numberOfDataPoints, CO2CalculationTypeEnum.user, now),
        fill: true,
        backgroundColor: 'rgba(124, 174, 122, 0.2)',
        borderColor: 'rgba(124, 174, 122, 1)',
      },
      {
        label: 'Community Saved GHG',
        data: DataPoints(data, dateType, numberOfDataPoints, CO2CalculationTypeEnum.average, now),
        fill: true,
        backgroundColor: 'rgba(74, 123, 157, 0.2)',
        borderColor: 'rgba(74, 123, 157, 1)',
      },
    ],
  };

  return dataObject;
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

// shows the graph of the user's historical CO2 data, from timeSpan to now
// then parent component can change the time span; Week to Month to Year
/**
 * Shows a graph of the user and community's historical CO2 saved data, from a certain date to now
 * @param data Array of raw transport data
 * @param format Format of the x axis label
 * @param dateType The amount of time between each data point
 * @param numberOfDataPoints Number of points on the x axis
 * @returns A graph that shows community vs user CO2 saved
 * @constructor
 */
const CO2Graph = ({ data, format, dateType, numberOfDataPoints }) => <Line
    data={GraphData(data, format, dateType, numberOfDataPoints)} options={options} />;

CO2Graph.propTypes = {
  data: PropTypes.array.isRequired,
  format: PropTypes.string.isRequired,
  dateType: PropTypes.string.isRequired,
  numberOfDataPoints: PropTypes.number.isRequired,
};

export default CO2Graph;
