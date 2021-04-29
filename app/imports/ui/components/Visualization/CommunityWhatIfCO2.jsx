import React, { useState, useEffect } from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { UserTransportationTypeEnum } from '../../../api/userData/UserTransportation-Utilities';
import CO2WhatIfGraph from './CO2WhatIfGraph';
import { cloneArray, FilterOutTransportType } from './Functions';

/**
 * Clone the transport data array, and filter for car transport within the past month
 * @param data {transport[]}
 * @returns Copied-by-value, filtered clone of the transport data
 */
const copyTransportInMonth = (data) => {
  const dataClone = cloneArray(data); // Has to copy by value
  const filterArray = cloneArray(UserTransportationTypeEnum).Array.filter(type => type !== UserTransportationTypeEnum.Car);
  // eslint-disable-next-line no-param-reassign,no-return-assign
  dataClone.forEach(transport => transport.date = new Date(transport.date));
  return FilterOutTransportType(dataClone, filterArray); // using multiple filter Transport type cuz another filter to be 0
};

/**
 * Change transport type from start inclusive to end inclusive index of array
 * @param transportArray {[]}
 * @param type {UserTransportationTypeEnum}
 * @param start index
 * @param end index
 */
const setTransportType = (transportArray, type, start, end) => {
  for (let i = start; i < end; i++) {
    // eslint-disable-next-line no-param-reassign
    transportArray[i].transport = type;
  }
};

/**
 * @param total {Number}
 * @param percent {Number} percentage in decimal, whole number (percent%)
 * @returns {number} percent / total
 */
const percentOf = (total, percent) => Math.floor((percent / 100) * total);

// Change the starting percent of the whole graph here
const startingPercent = 55;

const CommunityWhatIfCO2 = ({ transportData, fontStyle }) => {
  // eslint-disable-next-line no-unused-vars
  const [transport, setTransport] = useState(copyTransportInMonth(transportData));
  // eslint-disable-next-line no-unused-vars
  const [transportFixed, setTransportFixed] = useState(copyTransportInMonth(transportData));
  const [currentEV, setCurrentEV] = useState(0);
  const [sliderValue, setSliderValue] = React.useState(startingPercent);

  const changeEVPercent = (currentInd, newInd) => {
    if (newInd < 0 || newInd > transport.length) {
      throw new Error('out of range index from newInd');
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

  useEffect(() => changeEVPercent(currentEV, percentOf(transportFixed.length, startingPercent)), []);

  const handleChange = (newValue) => {
    const newIndex = Math.floor((newValue / 100) * transportFixed.length);
    changeEVPercent(currentEV, newIndex);
    setSliderValue(newValue);
  };

  return (
      <Grid verticalAlign='middle' columns={2} stackable container>
        <Grid.Column verticalAligh='middle'>
          <Header as={'h1'} style={{ fontSize: '30px', fontFamily: fontStyle.fontFamily }}>See our impact as we change</Header>
          <p style={{ fontSize: '22px', fontFamily: fontStyle.fontFamily }}>The state of Hawai&apos;i plans to increase the adoption of electric vehicles in our community.
            You can see how the impact of EV adoption would affect last month&apos;s GHG produced here.</p>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Grid textAlign='center' columns={1}>
              <Grid.Row style={{ marginBottom: '0px !important', paddingBottom: '0px !important' }}>
                <Grid.Column width={13}>
                  <p style={{ fontSize: '22px', fontFamily: fontStyle.fontFamily }}>{`What if ${sliderValue}% of the community used electric vehicles last month?`}</p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ marginBottom: '0px !important', paddingBottom: '0px !important' }}>
                <Grid.Column width={12}>
                  <Slider value={sliderValue} onChange={handleChange} defaultValue={startingPercent}
                          min={0} max={100} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <CO2WhatIfGraph potentialData={transport} currentData={transportFixed} format={'MMM DD'} dateType={'weeks'} numberOfDataPoints={5}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
  );
};

CommunityWhatIfCO2.propTypes = {
  transportData: PropTypes.array.isRequired,
  fontStyle: PropTypes.any,
};

export default CommunityWhatIfCO2;
