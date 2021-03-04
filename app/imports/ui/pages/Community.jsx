import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Table, Divider, Loader, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import { UserTransportation } from '../../api/userData/UserTransportation';
import TransportationMethodPieChart from '../components/TransportMethodPieChart';

const GHGperGallon = 19.6; // pounds per gallon
const textStyle = { fontFamily: 'Comfortaa' };

/** A simple static component to render some text for the landing page. */
class Community extends React.Component {
  // Problem: mpg needs to be entered into transport at user's update
  fuelSaved(milesSaved, milesPerGallon) {
    return milesSaved / milesPerGallon;
  }

   // @param timespan A Date object; i.e. timespan = moment().subtract(1, 'y')
   // @param data The fetched userTransport collection; i.e. data = this.props.userTransportation
   // This assumes that the data is from one user, so its not averaged by person
  userCO2Aggregate(data, timeSpan) {
    // remove this block
    const afterDateAndCar = data.filter(doc => doc.date > timeSpan && doc.transport !== 'Car');
    if (afterDateAndCar.length === 0) {
      return 'No Data';
    }
    // remove this block
    const fuelSaved = afterDateAndCar.map(doc => this.fuelSaved(doc.miles, doc.mpg)); // TODO: all code til here can be resused in finding community GHG
    const fuelSavedSum = fuelSaved.reduce((acc, curr) => acc + curr);
    const CO2Reduced = fuelSavedSum * GHGperGallon;

    return CO2Reduced;
  }

  userTransportDataFilter(data) {
    return data.filter(doc => doc.userID === Meteor.userId());
  }

  // Calculate fuelsaved and add it to each document and this should be good for both one user and all users
  calculateFuelSavedForAllUsers(data, timeSpan) {
    // remove this block
    const afterDateAndCar = data.filter(doc => doc.date > timeSpan && doc.transport !== 'Car');
    if (afterDateAndCar.length === 0) {
      return 'No Data';
    }
    // remove this block
    const fuelSaved = afterDateAndCar.map(doc => ({
      ...doc,
      fuelSaved: this.fuelSaved(doc.miles, doc.mpg),
    }));
    return fuelSaved;
  }

  // @param data Array of objects with the timespan and fuelsaved already calculated
  // @returns a list of each user's total fuelsaved
  // This combine individual user's fuelsaved over timespan
  aggregateIndividualFuelSaved(data) {
    const result = [];

    data.forEach(function (doc) {
      const existing = result.filter(function (v) {
        return v.userID === doc.userID;
      });

      if (existing.length) { // if the item is already in the result
        const existingIndex = result.indexOf(existing[0]);
        result[existingIndex].fuelSaved = result[existingIndex].fuelSaved + doc.fuelSaved;
      } else { // if the item isn't in the result list, just push it to the list
        result.push(doc);
      }
    });

    return result;
  }

  // @param timespan A Date object; i.e. timespan = moment().subtract(1, 'y')
  // @param data The fetched userTransport collection; i.e. data = this.props.userTransportation
  // This assumes that the data is from one user, so its not averaged by person
  theUltimateCO2Calculator(data, timeSpan, type) {
    // const afterDateAndCar = data.filter(doc => doc.date > timeSpan && doc.transport !== 'Car');
    //     if (afterDateAndCar.length === 0) {
    //       return 'No Data';
    //     }
    //
    // Do user or average
    //
    let result = 0;
    if (type === 'average') {
      const filter = this.calculateFuelSavedForAllUsers(data, timeSpan);
      if (filter === 'No Data') {
        return 'No Data';
      }
      // calculate aggregateFuelsaved here, using afterDateAndCar as filter
      const totalUserNumber = this.aggregateIndividualFuelSaved(filter).length; // remove this
      const combinedFuelSaved = this.aggregateIndividualFuelSaved(filter).map(doc => doc.fuelSaved).reduce((accumulator, currentValue) => accumulator + currentValue);
      const averageFuelSaved = combinedFuelSaved / totalUserNumber; // instead of total user number, use aggregateFuelsaved.length
      const averageCO2Reduced = averageFuelSaved * GHGperGallon;

      result = averageCO2Reduced;
    } else if (type === 'user') {
      const userData = this.userTransportDataFilter(data); // use the aggregateFuelsaved here
      result = this.userCO2Aggregate(userData, timeSpan);
    }

    return Math.round(result * 1000) / 1000;
  }

  dashboard() {
    const data = this.props.userTransportation;

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
                <Header style={textStyle} textAlign='center' as='h2' inverted>CO2 Saved by Alternative Transport</Header>
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
                      <Table.Cell>{ this.theUltimateCO2Calculator(data, moment().subtract(1, 'd'), 'user') }</Table.Cell>
                      <Table.Cell>{ this.theUltimateCO2Calculator(data, moment().subtract(1, 'd'), 'average')}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Week</Table.Cell>
                      <Table.Cell>{ this.theUltimateCO2Calculator(data, moment().subtract(1, 'w'), 'user') }</Table.Cell>
                      <Table.Cell>{ this.theUltimateCO2Calculator(data, moment().subtract(1, 'w'), 'average') }</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Month</Table.Cell>
                      <Table.Cell>{ this.theUltimateCO2Calculator(data, moment().subtract(1, 'months'), 'user') }</Table.Cell>
                      <Table.Cell>{ this.theUltimateCO2Calculator(data, moment().subtract(1, 'months'), 'average') }</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Annual</Table.Cell>
                      <Table.Cell>{ this.theUltimateCO2Calculator(data, moment().subtract(1, 'years'), 'user') }</Table.Cell>
                      <Table.Cell>{ this.theUltimateCO2Calculator(data, moment().subtract(1, 'years'), 'average') }</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row id='space-row'>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign='middle'>
                <Header style={textStyle} textAlign='center' as='h2' inverted>Modes of Transportation This Month</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} stretched>
              <Grid.Column verticalAlign='middle'>
                <Segment>
                  <Header style={textStyle} textAlign='center' as='h2'>You</Header>
                  <TransportationMethodPieChart userTransportation={ this.userTransportDataFilter(this.props.userTransportation) } timeSpan={moment().subtract(1, 'months')}/>
                </Segment>
              </Grid.Column>
              <Grid.Column verticalAlign='middle'>
                <Segment>
                  <Header style={textStyle} textAlign='center' as='h2'>Community</Header>
                  <TransportationMethodPieChart userTransportation={ this.props.userTransportation } timeSpan={moment().subtract(1, 'months')}/>
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

Community.propTypes = {
  userTransportation: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(UserTransportation.communityPublicationName);
  return {
    userTransportation: UserTransportation.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Community);
