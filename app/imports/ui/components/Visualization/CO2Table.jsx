import React from 'react';
import { Table, Header, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CO2CalculationTimespan } from './Functions';

const CO2Table = (props) => {
  return (
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <Table padded basic definition id="community-table">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>You (Pounds)</Table.HeaderCell>
                  <Table.HeaderCell>Average (Pounds)</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Today</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(props.data, moment().subtract(1, 'd'), null, 'user') }</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(props.data, moment().subtract(1, 'd'), null, 'average')}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Week</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(props.data, moment().subtract(1, 'w'), null, 'user') }</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(props.data, moment().subtract(1, 'w'), null, 'average') }</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Month</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(props.data, moment().subtract(1, 'months'), null, 'user') }</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(props.data, moment().subtract(1, 'months'), null, 'average') }</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Annual</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(props.data, moment().subtract(1, 'years'), null, 'user') }</Table.Cell>
                  <Table.Cell>{ CO2CalculationTimespan(props.data, moment().subtract(1, 'years'), null, 'average') }</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );
};

CO2Table.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CO2Table;
