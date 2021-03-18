import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Table, Divider, Loader, Header, Segment, Image, GridColumn } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import { UserTransportation } from '../../api/userData/UserTransportation';
import TransportationMethodPieChart from '../components/Visualization/TransportMethodPieChart';
import ComparisonChart from '../components/Visualization/ComparisonChart';
import Section from '../components/Section';
import { TextHeader } from '../components/Visualization/ComparisonChart';
import { SectionHeader } from '../components/Visualization/SectionHeader';

const GHGperGallon = 19.59; // pounds per gallon
const textStyle = { fontFamily: 'Comfortaa' };

/** A simple static component to render some text for the landing page. */
class Community extends React.Component {
  /**
   * Calculate the fuel saved
   * @param milesSaved The miles saved from not using a car
   * @param milesPerGallon The car's miles per gallon
   * @returns {number} Fuel saved by gallon
   */
  fuelSaved(milesSaved, milesPerGallon) {
    return milesSaved / milesPerGallon;
  }

  /**
   * Calculate the CO2 saved for one user
   * @param data The fetched userTransport collection; i.e. data = this.props.userTransportation
   * @returns {number} A number of pounds of CO2 reduced
   */
  userCO2Aggregate(data) {
    const fuelSaved = data.map(doc => this.fuelSaved(doc.miles, doc.mpg));
    const fuelSavedSum = fuelSaved.reduce((acc, curr) => acc + curr);
    const CO2Reduced = (fuelSavedSum * GHGperGallon).toFixed(2);
    return CO2Reduced;
  }

  /**
   * Calculate fuelsaved and add it to each document and this should be good for both one user and all users
   * @param data An array of user transportation log objects
   * @returns An array of user transportation log for the currently logged in user
   */
  userTransportDataFilter(data) {
    return data.filter(doc => doc.userID === Meteor.userId());
  }

  /**
   * Calculate fuelsaved and add it to each document and this should be good for both one user and all users
   * @param data An array of user transportation log objects
   * @returns An array of user transportation log that has an attribute fuelSaved
   */
  calculateFuelSavedForAllUsers(data) {
    const fuelSaved = data.map(doc => ({
      ...doc,
      fuelSaved: this.fuelSaved(doc.miles, doc.mpg),
    }));
    return fuelSaved;
  }

  /**
   * This combine individual user's fuelsaved over timespan. Code inspired by: https://stackoverflow.com/a/33850667
   * @param data Array of objects with the timespan and fuelsaved already calculated
   * @returns a list of each user's total fuelsaved
   */
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

  /**
   * Calculate the number of CO2 reduced either from one user or the averaged of the community
   * @param data The fetched userTransport collection; i.e. data = this.props.userTransportation
   * @param timeSpan A Date object to specify the time span for calculation; i.e. timespan = moment().subtract(1, 'y')
   * @param type The types are: user (for one user) or average (the community average)
   * @returns a number pounds of CO2 reduced
   */
  theUltimateCO2Calculator(data, timeSpan, type) {
    const afterDateAndCar = data.filter(doc => doc.date > timeSpan && doc.transport !== 'Car');
    if (afterDateAndCar.length === 0) {
      return 'No Data';
    }
    let result = 0;
    if (type === 'average') {
      const fuelSaved = this.calculateFuelSavedForAllUsers(afterDateAndCar);
      const aggregateFuelSaved = this.aggregateIndividualFuelSaved(fuelSaved);
      const combinedFuelSaved = aggregateFuelSaved.map(doc => doc.fuelSaved).reduce((accumulator, currentValue) => accumulator + currentValue);
      const averageFuelSaved = combinedFuelSaved / aggregateFuelSaved.length;
      const averageCO2Reduced = (averageFuelSaved * GHGperGallon).toFixed(2);

      result = averageCO2Reduced;
    } else if (type === 'user') {
      const userData = this.userTransportDataFilter(afterDateAndCar);
      if (userData.length === 0) {
        return 'No Data';
      }
      result = this.userCO2Aggregate(userData);
    }
    return result;
  }

  dashboard() {
    const data = this.props.userTransportation;
    return (
        <Grid verticalAlign='middle' textAlign='center'>
          <Grid.Row>
            <Grid.Column>
              <Section
                  background='/images/background1.png'
                  topMargin='4px'
                  childMargin='5vh'>
                <Grid padded relaxed verticalAlign='middle'>
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
                </Grid>
              </Section>
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal/>
          <Grid.Row>
            <Grid.Column>
              <Grid container>
                <Grid.Row>
                  <Grid.Column verticalAlign='middle'>
                    <SectionHeader textStyle={textStyle}>
                      Modes of Transportation This Month
                    </SectionHeader>
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
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal/>
          <Grid.Row>
            <Grid.Column>
              <SectionHeader textStyle={textStyle} container>
                Some of Your Personal Metric
              </SectionHeader>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <ComparisonChart
                  icon={'cloud'}
                  metricName={'GHG'}
                  userData={13}
                  communityData={24}
                  userTransportation={ this.props.userTransportation }
                  textStyle={textStyle}
                  metric={'pounds'}
                  container
              >
                <Grid columns={2} container>
                  <Grid.Column>
                    <Grid.Row>
                      <Image height="80%" width="80%" src="images/temp_graph.png" centered/>
                    </Grid.Row>
                  </Grid.Column>
                  <Grid.Column>
                    <Grid.Row>
                      <Header textAlign='left' textStyle={textStyle} as={'h3'}>
                        This is an explanatory text that explains stuff about this metric.
                        Perhaps one could talk about how this metric has impact on the island of
                        Hawaii or discuss a fun fact about
                      </Header>
                    </Grid.Row>
                    <Grid.Row>
                      <Divider/>
                    </Grid.Row>
                    <Grid.Row>
                      <Header as={'h4'} style={textStyle} color='blue'>Learn more</Header>
                    </Grid.Row>
                  </Grid.Column>
                </Grid>
              </ComparisonChart>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <ComparisonChart
                  icon={'money bill alternate'}
                  metricName={'$ SAVED'}
                  userData={321}
                  communityData={167}
                  userTransportation={ this.props.userTransportation }
                  textStyle={textStyle}
                  metric={'dollars'}
                  container
              >
                <Grid columns={2} container>
                  <Grid.Column>
                    <Grid.Row>
                      <Image height="80%" width="80%" src="images/temp_bar.png" centered/>
                    </Grid.Row>
                  </Grid.Column>
                  <Grid.Column>
                    <Grid.Row>
                      <Header textAlign='left' textStyle={textStyle} as={'h3'}>
                        This is an explanatory text that explains stuff about this metric.
                        Perhaps one could talk about how this metric has impact on the island of
                        Hawaii or discuss a fun fact about
                      </Header>
                    </Grid.Row>
                    <Grid.Row>
                      <Divider/>
                    </Grid.Row>
                    <Grid.Row>
                      <Header as={'h4'} style={textStyle} color='blue'>Learn more</Header>
                    </Grid.Row>
                  </Grid.Column>
                </Grid>
              </ComparisonChart>
            </Grid.Column>
          </Grid.Row>

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
  const sub1 = Meteor.subscribe(UserTransportation.communityPublicationName);
  return {
    userTransportation: UserTransportation.collection.find({}).fetch(),
    ready: sub1.ready(),
  };
})(Community);
