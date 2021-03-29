import React, { useState } from 'react';
import { Button, Divider, Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CO2Graph from './CO2Graph';
import { TextHeader } from './ComparisonChart';

const CO2GraphWithTimeRange = (props) => {
  const [timeRange, setTimeRange] = useState('Week');
  let format;
  let dateType;
  let numberOfDataPoints;
  switch (timeRange) {
    case 'Week':
      format = 'DD/MM'; dateType = 'days'; numberOfDataPoints = 7;
      break;
    case 'Month':
      format = 'DD/MM'; dateType = 'weeks'; numberOfDataPoints = 4;
      break;
    case 'Year':
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
                    <CO2Graph data={props.data} format={format} dateType={dateType} numberOfDataPoints={numberOfDataPoints}/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Button.Group>
                      <Button onClick={() => setTimeRange('Week')}>Week</Button>
                      <Button onClick={() => setTimeRange('Month')}>Month</Button>
                      <Button onClick={() => setTimeRange('Year')}>Year</Button>
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
  textStyle: PropTypes.object,
};

export default CO2GraphWithTimeRange;
