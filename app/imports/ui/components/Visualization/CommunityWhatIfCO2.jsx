import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CO2Graph from './CO2Graph';
// eslint-disable-next-line no-unused-vars
import { FilterOutTransportType } from './Functions';

// there might be a way to do this lazily, without returning new array
// eslint-disable-next-line no-unused-vars
const EVPercentage = (data, percent) => {
  const dataClone = JSON.parse(JSON.stringify(data)); // Has to copy by value
  // get the number of data points to make it a percent
  const dataPercent = data.length * (percent * 0.01);
  // for i = 0 to the number of percent
  for (let i = 0; i < dataPercent; i++) {
    dataClone[Math.floor(Math.random() * data.length)].transport = 'EV';
  }
  return dataClone;
};

// CO2CalculationTimespan can be used, as long as you cut up the data here, and feed it into CO2CalculationTimespan
// The parent has the slider, but a child component will be the graph for refreshability

// Could only pull just cars usage, then do percentage based on that data
// This assumes that people mostly use cars, but kinda have to since

// Return a CO2 produced graph that shows two lines; one is what if a percentage of the community uses this much EV
// Another is the actual CO2 produced in the timeSpan
const CommunityWhatIfCO2 = ({ transportData }) => ( // "As our community move towards EV, you can see the impact on the CO2 produced here"
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <CO2Graph data={transportData} format={'DD/MM'} dateType={'days'} numberOfDataPoints={5}/>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );

CommunityWhatIfCO2.propTypes = {
  transportData: PropTypes.array,
};

export default CommunityWhatIfCO2;
