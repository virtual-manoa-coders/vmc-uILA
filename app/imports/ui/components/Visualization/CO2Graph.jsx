import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CO2CalculationTimespan } from './Functions';

const DayLabels = (format, dateType, numberOfDataPoints, date) => {
  const result = [];
  const time = moment(date.toDate()); // moment objects are passed by reference
  result[numberOfDataPoints - 1] = time.format(format);
  for (let i = 1; i < numberOfDataPoints; i++) {
    result[numberOfDataPoints - i - 1] = time.subtract(1, dateType).format(format);
  }
  return result;
};

// function that takes in a date, offset type, and number of datapoints
  // for each dates, calculate the CO2 saved in the timeSpan; within the offset time by w/m/y to the given date
  // returns an array of CO2saved in the same number as the input
const DataPoints = (data, dateType, numberOfDatesBack, calType, date) => {
  const result = [];
  const time = moment(date.toDate()); // moment objects are passed by reference

  for (let i = 0; i < numberOfDatesBack; i++) {
    result[numberOfDatesBack - i - 1] = CO2CalculationTimespan(data, moment(time.toDate()).subtract(1, dateType), moment(time).toDate(), calType);
    time.subtract(1, dateType);
  }
  return result;
};

const GraphData = (data, format, dateType, numberOfDataPoints) => {
  const now = moment().endOf(dateType);

  const dataObject = {
    labels: DayLabels(format, dateType, numberOfDataPoints, now),
    datasets: [
      {
        label: 'Your Saved GHG',
        data: DataPoints(data, dateType, numberOfDataPoints, 'user', now),
        fill: true,
        backgroundColor: 'rgba(124, 174, 122, 0.2)',
        borderColor: 'rgba(124, 174, 122, 1)',
      },
      {
        label: 'Community Saved GHG',
        data: DataPoints(data, dateType, numberOfDataPoints, 'average', now),
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
const CO2Graph = (props) => <Line
    data={GraphData(props.data, props.format, props.dateType, props.numberOfDataPoints)} options={options} />;

CO2Graph.propTypes = {
  data: PropTypes.array.isRequired,
  format: PropTypes.string.isRequired,
  dateType: PropTypes.string.isRequired,
  numberOfDataPoints: PropTypes.number.isRequired,
};

export default CO2Graph;
