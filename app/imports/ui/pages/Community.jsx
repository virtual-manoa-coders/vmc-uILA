import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Grid, Table, Divider, Loader, Header, Segment, Image } from 'semantic-ui-react';
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
import { CO2CalculationTimespan, userTransportDataFilter, moneySavedCalculator, CO2CalculationTypeEnum } from '../components/Visualization/Functions';
import CommunityWhatIfCO2 from '../components/Visualization/CommunityWhatIfCO2';

const textStyle = { fontFamily: 'Merriweather' };

/** A simple static component to render some text for the landing page. */
class Community extends React.Component {

  dashboard() {
    const data = this.props.userTransportation;

    return (
        <Grid id='page-style' verticalAlign='middle' textAlign='center'>
          <Grid.Row>
            <Grid.Column>
              <Section
                  background='/images/honolulu.jpg'
                  topMargin='-60px'
                  childMargin='5vh'>
                <Grid id='community' container verticalAlign='middle'>
                  <Grid.Row>
                    <Grid.Column className='community-text' width={5} verticalAlign='middle'>
                      <Grid.Row>
                        This is you vs. the average person in your city.
                      </Grid.Row>
                      <Divider hidden/>
                      <Grid.Row>
                        You are doing x% better than the average person in your city.
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
              <CO2Table data={data}/>
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
                      <TransportationMethodPieChart userTransportation={ userTransportDataFilter(this.props.userTransportation) } timeSpan={moment().subtract(1, 'months')}/>
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
                  metricName={'GHG Saved'}
                  userData={CO2CalculationTimespan(data, moment().subtract(1, 'w'), null, CO2CalculationTypeEnum.user)}
                  communityData={CO2CalculationTimespan(data, moment().subtract(1, 'w'), null, CO2CalculationTypeEnum.average)}
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
                        A greenhouse gas (sometimes abbreviated GHG) is a gas that absorbs and emits radiant energy
                        within the thermal infrared range, causing the greenhouse effect. This gas is one of your main
                        contribution to climate change, so the higher you reduce your carbon footprint, the better.
                      </Header>
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
                      <Image height="80%" width="80%" src="images/temp_bar.png" centered/>
                    </Grid.Row>
                  </Grid.Column>
                  <Grid.Column>
                    <Grid.Row>
                      <Header textAlign='left' textStyle={textStyle} as={'h3'}>
                        An electric car will save you $632 per year on average over its gas-powered counterpart.
                        Generally, it costs $1,117 per year to run a new gas-powered vehicle, and only $485 per
                        year to run a new electric one.
                      </Header>
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
