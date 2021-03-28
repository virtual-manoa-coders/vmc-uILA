import React from 'react';
import { Header, Grid, Segment } from 'semantic-ui-react';
import { Line } from '@reactchartjs/react-chart.js';
import PropTypes from 'prop-types';
import { SectionHeader } from './SectionHeader';
import { CO2CalculationTimespan } from './Functions';
import moment from 'moment';

// fixed labels?
// Week, Month, Annual
// a helper function that combines the GHG within a specific moment period
  // use this function to make a five point total to make fixed number of label graph
  // You can sum from today at 0am to 12am of the time zone to sum of the time
  // then subtract one day, week, month to get the fixed label
  // This limitation could actually help make the data cleaner
// have to list labels by day sometimes
  // meaning have to write a momentjs manipulation to show the date
  // you can prob have buttons on the parent component to change the type of data
// Data is given with dates all over the place
  // need to sort the date by the a given time period and then combine them
// Need a way of breaking the data into datapoints that corresponds to each label
  // Community already have a function for that, but

// mabye make this universal by having a date type var and numbers of labels
const DayLabels = (format) => {
  const result = [];
  const now = moment('23:59:59', 'hh:mm:ss'); // assigning now to something will assign a reference, not create new var
  result[6] = now.format(format);
  for (let i = 0; i < 6; i++) { // use number of label here - 1 for 0 based and -1 too for current time
    result[5 - i] = now.subtract(1, 'day').format(format); // use date type here
  }
  console.log(result);
  return result;
};

// function that takes in a date, offset type, and number of datapoints
  // for each dates, calculate the CO2 saved in the timeSpan; within the offset time by w/m/y to the given date
  // returns an array of CO2saved in the same number as the input

const DataPoints = (data, dateType, numberOfDatesBack) => {
  const result = [];
  const now = moment('23:59:59', 'hh:mm:ss');
  for (let i = 0; i < numberOfDatesBack; i++) {
    console.log(now.toDate());
    result[numberOfDatesBack - i - 1] = CO2CalculationTimespan(data, moment(now.toDate()).subtract(1, dateType), moment(now).toDate(), 'user');
    now.subtract(1, dateType);
  }
  return result;
};

const data = {
  labels: DayLabels('D/M'), // needs to be adjusted to the available date
  datasets: [
    {
      label: 'Your Saved GHG',
      data: [12, 19, 3, 5, 2, 0, 3], // needs to go over each date, can be 0
      fill: true,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: 'Average Saved GHG',
      data: [10, 32, 15, 23, 17, 36, 14],
      fill: true,
      backgroundColor: 'rgb(150, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
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
const CO2Graph = (props) => {
  const now = moment('23:59:59', 'hh:mm:ss');
  console.log(now.format('DD/MM'));
  now.subtract(1, 'days');
  console.log(now.format('DD/MM'));
  console.log(moment(now.toDate()).subtract(1,'days'));
  console.log(CO2CalculationTimespan(props.data, moment().subtract(1, 'years'), moment().subtract(1, 'months'), 'user'));
  console.log(DataPoints(props.data, 'days', 9));
  return (
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Line data={data} options={options} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );
};

CO2Graph.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CO2Graph;
