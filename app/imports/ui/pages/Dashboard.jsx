import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Divider, Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { UserTransportation } from '../../api/userData/UserTransportation';
import TransportPieChartWithDates from '../components/TransportPieChartWithDates';

/** A simple static component to render some text for the landing page. */
class Dashboard extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' container>

            <Grid padded relaxed verticalAlign='middle'>
                <Grid.Row id='space-row'>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8} verticalAlign='middle'>
                        Your monthly emission
                        <Divider hidden/>
                        <img src="/images/emission-example.png" className="ui fluid image"/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        Monthly emission in Honolulu
                        <Divider hidden/>
                        <img src="/images/emission-example.png" className="ui fluid image"/>
                    </Grid.Column>
                </Grid.Row>

              <Grid.Row id='space-row'>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Segment>
                    <Header style={{ fontFamily: 'Comfortaa' }} textAlign='center' as='h2'>Modes of Transportation</Header>
                    <TransportPieChartWithDates userTransportation={this.props.userTransportation}/>
                  </Segment>
                </Grid.Column>
              </Grid.Row>

            </Grid>

            <Divider hidden/>

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
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(UserTransportation.userPublicationName);
  return {
    userTransportation: UserTransportation.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Dashboard);
