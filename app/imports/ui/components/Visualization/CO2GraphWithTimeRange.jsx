import React, { useState } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CO2Graph from './CO2Graph';

const timeRangeEnum = {
  Week: 'Week',
  Month: 'Month',
  Year: 'Year',
};

const CO2GraphWithTimeRange = ({ data }) => {
  const [timeRange, setTimeRange] = useState('Week');
  let format;
  let dateType;
  let numberOfDataPoints;
  switch (timeRange) {
    case timeRangeEnum.Week:
      format = 'DD/MM'; dateType = 'days'; numberOfDataPoints = 7;
      break;
    case timeRangeEnum.Month:
      format = 'DD/MM'; dateType = 'weeks'; numberOfDataPoints = 4;
      break;
    case timeRangeEnum.Year:
      format = ' MMM'; dateType = 'months'; numberOfDataPoints = 12;
      break;
    default:
      format = 'DD/MM'; dateType = 'days'; numberOfDataPoints = 7;
      break;
  }
  return (
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Row>
                  <Grid.Column>
                    <CO2Graph data={data} format={format} dateType={dateType} numberOfDataPoints={numberOfDataPoints}/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Button.Group>
                      <Button onClick={() => setTimeRange(timeRangeEnum.Week)}>{timeRangeEnum.Week}</Button>
                      <Button onClick={() => setTimeRange(timeRangeEnum.Month)}>{timeRangeEnum.Month}</Button>
                      <Button onClick={() => setTimeRange(timeRangeEnum.Year)}>{timeRangeEnum.Year}</Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );
};

CO2GraphWithTimeRange.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CO2GraphWithTimeRange;
