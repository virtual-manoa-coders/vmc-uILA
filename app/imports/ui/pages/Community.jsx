import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Table, Divider, Loader, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import { UserTransportation } from '../../api/userData/UserTransportation';
import TransportationMethodPieChart from '../components/TransportMethodPieChart';

const GHGperGallon = 19.6; // pounds per gallon

/** A simple static component to render some text for the landing page. */
class Community extends React.Component {
  fuelSaved(milesSaved, milesPerGallon) {
    return milesSaved / milesPerGallon;
  }

  /**
   timespan is a Date object; i.e. timespan = moment().subtract(1, 'y')
   data is the fetched userTransport collection; i.e. data = this.props.userTransportation
   This assumes that the data is from one user, so its not averaged by person
  */
  userCO2Aggregate(data, timeSpan) {
    // get rid of data outside of timeSpan range and filter out car transport method
    const afterDateAndCar = data.filter(doc => doc.date > timeSpan && doc.transport !== 'Car');
    if (afterDateAndCar.length === 0) {
      return 'No Data';
    }
    const fuelSaved = afterDateAndCar.map(doc => this.fuelSaved(doc.miles, doc.milesPerGallon));
    // sum fuel saved
    const fuelSavedSum = fuelSaved.reduce((acc, curr) => acc + curr);
    // multiply by GHG per gallon of gas
    const CO2Reduced = fuelSavedSum * GHGperGallon;
    // round to 3 decimal place
    return Math.round(CO2Reduced * 1000) / 1000;
  }

  dashboard() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

          <Grid padded relaxed verticalAlign='middle'>
            <Grid.Row id='space-row'>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3} verticalAlign='middle'>
                <Grid.Row>
                  This is you vs. the average person in your city.
                </Grid.Row>
                <Divider hidden/>
                <Grid.Row>
                  You are doing x% better than the average person in your city.
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={13}>
                <Header style={{ fontFamily: 'Comfortaa' }} textAlign='center' as='h2' inverted>CO2 Saved by Alternative Transport</Header>
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
                      <Table.Cell>{ this.userCO2Aggregate(this.props.userTransportation, moment().subtract(1, 'd')) }</Table.Cell>
                      <Table.Cell>#g</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Week</Table.Cell>
                      <Table.Cell>{ this.userCO2Aggregate(this.props.userTransportation, moment().subtract(1, 'w')) }</Table.Cell>
                      <Table.Cell>#g</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Month</Table.Cell>
                      <Table.Cell>{ this.userCO2Aggregate(this.props.userTransportation, moment().subtract(1, 'months')) }</Table.Cell>
                      <Table.Cell>#g</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Annual</Table.Cell>
                      <Table.Cell>{ this.userCO2Aggregate(this.props.userTransportation, moment().subtract(1, 'years')) }</Table.Cell>
                      <Table.Cell>#g</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row id='space-row'>
            </Grid.Row>
            <Grid.Row columns={2} stretched>
              <Grid.Column verticalAlign='middle'>
                <Segment>
                  <Header style={{ fontFamily: 'Comfortaa' }} textAlign='center' as='h2'>Your Modes of Transportation This Month</Header>
                  <TransportationMethodPieChart userTransportation={ this.props.userTransportation } timeSpan={moment().subtract(1, 'years')}/>
                </Segment>
              </Grid.Column>
              <Grid.Column verticalAlign='middle'>
                <Segment>
                  <Header style={{ fontFamily: 'Comfortaa' }} textAlign='center' as='h2'>Cummulative Modes of Transportation This Month</Header>
                  <TransportationMethodPieChart userTransportation={ this.props.userTransportation } timeSpan={moment().subtract(1, 'years')}/>
                </Segment>
              </Grid.Column>
            </Grid.Row>

          </Grid>

          <Divider hidden/>

        </Grid>
    );
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.dashboard() : <Loader active>Getting data</Loader>;
  }
}

/** Require an array of Stuff documents in the props. */
Community.propTypes = {
  userTransportation: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(UserTransportation.userPublicationName);
  return {
    userTransportation: UserTransportation.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Community);
