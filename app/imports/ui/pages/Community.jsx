import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Grid, Statistic, Divider, Loader, Header, Segment, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import { UserTransportation } from '../../api/userData/UserTransportation';
import TransportationMethodPieChart from '../components/Visualization/TransportMethodPieChart';
import ComparisonChart from '../components/Visualization/ComparisonChart';
import Section from '../components/Section';
import { SectionHeader } from '../components/Visualization/SectionHeader';
import CO2GraphWithTimeRange from '../components/Visualization/CO2GraphWithTimeRange';
import CO2Table from '../components/Visualization/CO2Table';
import {
  userTransportDataFilter,
  moneySavedCalculator,
  CO2CalculationTypeEnum,
  getUserCO2Percent,
  GHGProduced,
} from '../components/Visualization/Functions';

const textStyle = { fontFamily: 'Merriweather' };

class Community extends React.Component {

  dashboard() {
    const data = this.props.userTransportation;
    console.log(GHGProduced(data, moment().subtract(1, 'months'), null, CO2CalculationTypeEnum.user));
    console.log(GHGProduced(data, moment().subtract(1, 'months'), null, CO2CalculationTypeEnum.average));
    return (
        <Grid id='community-page' verticalAlign='middle' textAlign='center'>
          <Grid.Row>
            <Grid.Column>
              <Section
                  background='/images/honolulu.jpg'
                  topMargin='-60px'
                  childMargin='5vh'>
                <Grid id='community' container verticalAlign='middle'>
                  <Grid.Row>
                    <Grid.Column className='community-text' width={5} verticalAlign='right'>
                      <Grid.Row>
                        For the community to move forward with CO2 reduction, the change must start with you.
                      </Grid.Row>
                      <Divider hidden/>
                      <Grid.Row>
                        This is how you are contributing compared to the average of your community.
                      </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Header style={textStyle} textAlign='center' as='h2' inverted>CO2 Saved by Alternative Transport</Header>
                      <CO2GraphWithTimeRange data={data}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Section>
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal/>
          <Grid.Row>
            <Grid.Column>
              <SectionHeader container textStyle={textStyle}>
                CO2 Saved Summary
              </SectionHeader>
              <CO2Table data={data} backgroundImage='/images/cloud.jpg'/>
              <Divider hidden/>
              <Grid columns={3} container verticalAlign='middle'>
                <Grid.Row>
                  <Grid.Column floated='right' textAlign='right'>
                    <Header as={'h1'} style={textStyle}>You are doing better than</Header>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Statistic horizontal>
                      <Statistic.Value>{getUserCO2Percent(data, moment().subtract(1, 'months'), null)}</Statistic.Value>
                      <Statistic.Label>%</Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                  <Grid.Column floated='left' textAlign='left'>
                    <Header as={'h1'} style={textStyle}>of your community</Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider hidden/>
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal/>
          <Grid.Row>
            <Grid.Column>
              <Section
                  background='/images/traffic.jpg'
                  childMargin='5vh'>
                <Grid container>
                  <Grid.Row>
                    <Grid.Column verticalAlign='middle'>
                      <SectionHeader inverted textStyle={textStyle}>
                        Modes of Transportation This Month
                      </SectionHeader>
                      <Header style={textStyle} as={'h2'} inverted>
                        There are many options for CO2-free travel.
                        See how much you are <br/> utilizing the transportation methods
                        in your community.
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2} stretched>
                    <Grid.Column verticalAlign='middle'>
                      <Segment>
                        <Header style={textStyle} textAlign='center' as='h2'>Your travel this month</Header>
                        <TransportationMethodPieChart userTransportation={ userTransportDataFilter(this.props.userTransportation) } timeSpan={moment().subtract(1, 'months')}/>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                      <Segment>
                        <Header style={textStyle} textAlign='center' as='h2'>Community travel this month</Header>
                        <TransportationMethodPieChart userTransportation={ this.props.userTransportation } timeSpan={moment().subtract(1, 'months')}/>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Section>
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
              {
                // TODO: Change this into GHG produced
              }
              <ComparisonChart
                  icon={'cloud'}
                  metricName={'GHG Made'}
                  userData={GHGProduced(data, moment().subtract(1, 'w'), null, CO2CalculationTypeEnum.user)}
                  communityData={GHGProduced(data, moment().subtract(1, 'w'), null, CO2CalculationTypeEnum.average)}
                  userTransportation={ this.props.userTransportation }
                  textStyle={textStyle}
                  metric={'pounds'}
                  invertArrowColor
                  container
              >
                <Grid columns={2} container>
                  <Grid.Column>
                    <Grid.Row>
                      <Image height="80%" width="80%" src="images/car_exhaust.jpg" centered/>
                    </Grid.Row>
                  </Grid.Column>
                  <Grid.Column>
                    <Grid.Row>
                      <Header textAlign='left' textStyle={textStyle} as={'h3'}>
                        A greenhouse gas (sometimes abbreviated GHG) is a gas that absorbs and emits radiant energy
                        within the thermal infrared range, causing the greenhouse effect. This gas is one of your main
                        contribution to climate change.
                      </Header>
                      <Header> The lower you produce, the better.</Header>
                    </Grid.Row>
                    <Grid.Row>
                      <Divider/>
                    </Grid.Row>
                    <Grid.Row>
                        <Header as={'a'} href={'https://www.epa.gov/ghgemissions/overview-greenhouse-gases'}
                                style={textStyle} color='blue'>Learn more</Header>
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
                  userData={moneySavedCalculator(data, moment().subtract(1, 'w'), CO2CalculationTypeEnum.user)}
                  communityData={moneySavedCalculator(data, moment().subtract(1, 'w'), CO2CalculationTypeEnum.average)}
                  userTransportation={ this.props.userTransportation }
                  textStyle={textStyle}
                  metric={'dollars'}
                  container
              >
                <Grid columns={2} container>
                  <Grid.Column>
                    <Grid.Row>
                      <Image height="80%" width="80%" src="images/gas_pump.jpg" centered/>
                    </Grid.Row>
                  </Grid.Column>
                  <Grid.Column>
                    <Grid.Row>
                      <Header textAlign='left' textStyle={textStyle} as={'h3'}>
                        An electric car will save you $632 per year on average over its gas-powered counterpart.
                        Generally, it costs $1,117 per year to run a new gas-powered vehicle, and only $485 per
                        year to run a new electric one.
                      </Header>
                      <Header> The higher you save, the better.</Header>
                    </Grid.Row>
                    <Grid.Row>
                      <Divider/>
                    </Grid.Row>
                    <Grid.Row>
                      <Header as={'a'} href={'https://www.capitalone.com/bank/money-management/life-events/do-electric-cars-save-money/'}
                              style={textStyle} color='blue'>Learn more</Header>
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
