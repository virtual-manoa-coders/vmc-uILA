import React from 'react';
import { Table, Header, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CO2CalculationTimespan } from './Functions';

const tableStyle = (image) => {
  return {
    // Image effects
    backgroundImage: `url(${image})`,
        // center BG
        backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
  };
};

const CO2Table = ({ data, backgroundImage }) => {
  // if the client asks, tell them this is direct subraction.
  const style = {
    // Image effects
    backgroundImage: `url(${backgroundImage})`,
        // center BG
        backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
  };
  return (
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <Table style={tableStyle(backgroundImage)} padded basic definition id="community-table">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>You (Pounds)</Table.HeaderCell>
                  <Table.HeaderCell>Average (Pounds)</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Past Day</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(data, moment().subtract(1, 'day').toDate(), null, 'user') }</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(data, moment().subtract(1, 'day').toDate(), null, 'average')}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Past Week</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(data, moment().subtract(1, 'w').toDate(), null, 'user') }</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(data, moment().subtract(1, 'w').toDate(), null, 'average') }</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Past Month</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(data, moment().subtract(1, 'months').toDate(), null, 'user') }</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(data, moment().subtract(1, 'months').toDate(), null, 'average') }</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Past Year</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(data, moment().subtract(1, 'years').toDate(), null, 'user') }</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(data, moment().subtract(1, 'years').toDate(), null, 'average') }</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );
};

CO2Table.propTypes = {
  backgroundImage: PropTypes.string,
  data: PropTypes.array.isRequired,
};

export default CO2Table;
