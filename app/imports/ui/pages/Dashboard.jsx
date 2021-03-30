import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Icon, Divider, Image, Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { UserTransportation } from '../../api/userData/UserTransportation';
import TransportPieChartWithDates from '../components/Visualization/TransportPieChartWithDates';
import { UserInfo } from '../../api/userData/UserInfo';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';

/** A simple static component to render some text for the landing page. */
class Dashboard extends React.Component {
  render() {
    return (
        <Grid id='dash' padded verticalAlign='middle' container>
          <Grid textAlign='center' padded columns={4}>
            <Grid.Row>
              <Grid.Column>
                <Divider hidden/>
                <h1>Environmental Impact</h1>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column verticalAlign='middle'>
                <Icon name='huge arrow circle down'/>
              </Grid.Column>
              <Grid.Column textAlign='left'>
                Green House Gas (GHG) Reduced<br/>
                <h2># lbs</h2>
              </Grid.Column>
            </Grid.Row>
            <Divider hidden/>

            <Grid.Row>
              <Grid.Column verticalAlign='middle'>
                <Icon name='huge taxi'/>
              </Grid.Column>
              <Grid.Column textAlign='left'>
                Vehicle Miles Traveled (VMT) Reduced<br/>
                <h2># miles</h2>
              </Grid.Column>
            </Grid.Row>
            <Divider hidden/>

            <Grid.Row>
              <Grid.Column verticalAlign='middle'>
                <Icon name='huge road'/>
              </Grid.Column>
              <Grid.Column textAlign='left'>
                Gallons of Gas Saved<br/>
                <h2># gallons</h2>
              </Grid.Column>
            </Grid.Row>
            <Divider hidden/>

            <Grid.Row>
              <Grid.Column verticalAlign='middle' >
                <Icon name='huge home'/>
              </Grid.Column>
              <Grid.Column textAlign='left'>
                Days worked at home<br/>
                <h2># days</h2>
              </Grid.Column>
            </Grid.Row>
            <Divider hidden/>
            <Grid.Row>
              <Grid.Column verticalAlign='middle'>
                <Icon name='huge bicycle'/>
              </Grid.Column>
              <Grid.Column textAlign='left'>
                Days biked to work<br/>
                <h2># days</h2>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row id='space-row'>
            </Grid.Row>
            <Grid.Row columns={2} height='equal' width='equal'>
              <Grid.Column>
                <Segment>
                  <Header style={{ fontFamily: 'Comfortaa' }} textAlign='center' as='h2'>Log Your Commute</Header>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Header style={{ fontFamily: 'Comfortaa' }} textAlign='center' as='h2'>Modes of Transportation</Header>
                  <TransportPieChartWithDates userTransportation={this.props.userTransportation}/>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid>

    );
  }
}

/** Require an array of Stuff documents in the props. */
Dashboard.propTypes = {
  userTransportation: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to UserInfo documents.
  const sub1 = Meteor.subscribe(UserInfo.userPublicationName);
  const sub2 = Meteor.subscribe(UserTransportation.userPublicationName);
  const sub3 = Meteor.subscribe(UserVehicles.userPublicationName);
  return {
    userVehicles: UserVehicles.collection.find({}).fetch(),
    userTransportation: UserTransportation.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(Dashboard);
