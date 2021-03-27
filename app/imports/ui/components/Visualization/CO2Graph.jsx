import React from 'react';
import { Header, Grid, Segment } from 'semantic-ui-react';
import { Line } from '@reactchartjs/react-chart.js';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'], // needs to be adjusted to the available date
  datasets: [
    {
      label: 'Your Saved GHG',
      data: [12, 19, 3, 5, 2, 0],       // needs to go over each date, can be 0
      fill: true,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: 'Average Saved GHG',
      data: [10, 32, 15, 23, 17, 46],
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

const CO2Graph = (props) => {
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

export default CO2Graph;
