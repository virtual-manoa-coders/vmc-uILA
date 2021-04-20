import React, { useState, useEffect } from 'react';
import { Grid, Segment, Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { UserTransportationTypeEnum } from '../../../api/userData/UserTransportation-Utilities';
import CO2WhatIfGraph from './CO2WhatIfGraph';
import { cloneArray, FilterOutTransportType } from './Functions';

// there might be a way to do this lazily, without returning new array
// eslint-disable-next-line no-unused-vars
const copyTransportInMonth = (data) => {
  const dataClone = cloneArray(data); // Has to copy by value
  const filterArray = cloneArray(UserTransportationTypeEnum).Array.filter(type => type !== UserTransportationTypeEnum.Car);
  dataClone.forEach(transport => transport.date = new Date(transport.date));
  return FilterOutTransportType(dataClone, filterArray).slice(0,20); // using multiple filter Transport type cuz another filter to be 0
};

// set the EV from start inclusive to end inclusive
const setTransportType = (transportArray, type, start, end) => {
  for (let i = start; i < end; i++) {
    // eslint-disable-next-line no-param-reassign
    transportArray[i].transport = type;
  }
};

// change the transport type depending from the difference between the currentEV and inputEV

// CO2CalculationTimespan can be used, as long as you cut up the data here, and feed it into CO2CalculationTimespan
// The parent has the slider, but a child component will be the graph for refreshability

// Could only pull just cars usage, then do percentage based on that data
// This assumes that people mostly use cars, but kinda have to since

// Return a CO2 produced graph that shows two lines; one is what if a percentage of the community uses this much EV
// Another is the actual CO2 produced in the timeSpan
const CommunityWhatIfCO2 = ({ transportData }) => { // "As our community move towards EV, you can see the impact on the CO2 produced here"
  const [transport, setTransport] = useState(copyTransportInMonth(transportData));
  const [inputEV, setInputEV] = useState(0);
  const [currentEV, setCurrentEV] = useState(0);

  const changeEVPercent = (currentInd, newInd) => {
    if (newInd < 0 || newInd > transport.length) {
      throw new Error('negative index from newInd');
    }
    const EVDifference = newInd - currentInd;
    if (EVDifference > 0) {
      setTransportType(transport, 'EV', currentInd, newInd);
    } else if (EVDifference < 0) {
      setTransportType(transport, UserTransportationTypeEnum.Car, newInd, currentInd);
    } else if (EVDifference === 0) {
      return;
    } else {
      throw new Error('unclear EVDifference');
    }
    setCurrentEV(newInd);
  };

  return (
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <CO2WhatIfGraph potentialData={transport} currentData={transportData} format={'DD/MM'} dateType={'weeks'} numberOfDataPoints={5}/>
              <Header>{inputEV}</Header>
              <Header>{currentEV}</Header>
              {transport.slice(0, 5).map(doc => <Header key={doc.date}>{doc.transport}</Header>)}
              <Button onClick={() => changeEVPercent(currentEV, currentEV + 1)}>inputEV + 1</Button>
              <Button onClick={() => changeEVPercent(currentEV, currentEV - 1)}>inputEV - 1</Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );
};

CommunityWhatIfCO2.propTypes = {
  transportData: PropTypes.array,
};

export default CommunityWhatIfCO2;
