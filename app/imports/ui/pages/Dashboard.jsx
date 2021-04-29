import React from 'react';
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line no-unused-vars
import { Grid, Icon, Divider, Segment, Header, Loader, Tab, Card, Container, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import TransportPieChartWithDates from '../components/Visualization/TransportPieChartWithDates';
import { UserInfo } from '../../api/userData/UserInfo';
import { UserTransportation } from '../../api/userData/UserTransportation';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';
import TransportDataEntry from '../components/TransportDataEntry';
import ListTransportEntries from '../components/ListTransportEntries';
import AddVehicle from '../components/AddVehicle';
import ListUserVehicles from '../components/ListUserVehicles';
import Section from '../components/Section';
import { UserInfoMethods } from '../../startup/both/Methods';

class Dashboard extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    Meteor.call(UserInfoMethods.getDashboardStatistics, {}, (err, res) => {
      if (err) {
        console.log('Error: ', err.message);
      } else {
        console.log(res);
      }
    });
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const userInfo = this.props.userInfo
        .filter(user => user.email === this.props.currentUser.username)[0];
    const userCar = this.props.userVehicles.filter(car => car._id === userInfo.carID)[0];

    const panes = [
      {
        menuItem: 'Log a Trip',
        render: () => <Tab.Pane attached={false}>
          <TransportDataEntry carMPG={userCar.carMPG} userTransportation={this.props.userTransportation}/>
        </Tab.Pane>,
      },
      {
        menuItem: 'View/Edit Trips',
        render: () => <Tab.Pane attached={false}>
          <ListTransportEntries/>
        </Tab.Pane>,
      },
      {
        menuItem: 'Add a Vehicle',
        render: () => <Tab.Pane attached={false}>
          <AddVehicle/>
        </Tab.Pane>,
      },
      {
        menuItem: 'View/Edit Vehicles',
        render: () => <Tab.Pane attached={false}>
          <ListUserVehicles/>
        </Tab.Pane>,
      },
    ];

    return (
        <Section
            background='/images/dashboardpic.jpg'
        >
        <Container padded verticalAlign='middle'>
        <Grid id='dashboard' padded container
              textAlign='center' columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Divider hidden/>
              <h1></h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column verticalAlign='middle'>
              <Card>
                <Card.Content>
                  <Icon name='big arrow circle down'/><br/>
                  <Card.Meta>GHG Reduced</Card.Meta>
                  <Card.Description>205,721 lbs</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Divider hidden/>
            <Grid.Column verticalAlign='middle'>
              <Card>
                <Card.Content>
                  <Icon name='big taxi'/><br/>
                  <Card.Meta>VMT Reduced</Card.Meta>
                  <Card.Description>231,547 miles</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Divider hidden/>
            <Grid.Column verticalAlign='middle'>
              <Card>
                <Card.Content>
                  <Icon name='big road'/><br/>
                  <Card.Meta>Gas Saved</Card.Meta>
                  <Card.Description>10,500 gallons</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Divider hidden/>
            <Grid.Column verticalAlign='middle'>
              <Card>
                <Card.Content>
                  <Icon name='big home'/><br/>
                  <Card.Meta>Telecommute</Card.Meta>
                  <Card.Description>32 days</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Divider hidden/>
            <Grid.Column verticalAlign='middle'>
              <Card>
                <Card.Content>
                  <Icon name='big bicycle'/><br/>
                  <Card.Meta>Biked To Work</Card.Meta>
                  <Card.Description>3 days</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} height='equal' width='equal'>
            <Grid.Column>
              <Segment>
                <Tab fluid style={{ overflow: 'auto', height: 450 }} menu={{ secondary: true, pointing: true }} panes={panes}/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Header textAlign='center' as='h3' style={{ color: '#2292b3' }}>Modes of Transportation</Header>
                <TransportPieChartWithDates userTransportation={this.props.userTransportation}/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
        </Section>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Dashboard.propTypes = {
  userInfo: PropTypes.any.isRequired,
  userTransportation: PropTypes.array.isRequired,
  userVehicles: PropTypes.array.isRequired,
  entries: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to UserInfo documents.
  const sub1 = Meteor.subscribe(UserInfo.userPublicationName);
  const sub2 = Meteor.subscribe(UserTransportation.userPublicationName);
  const sub3 = Meteor.subscribe(UserVehicles.userPublicationName);

  // Meteor.user() can be async, this is a quick fix; pulled all UserInfo, should change before final
  let currentUser = null;
  currentUser = Meteor.user();

  return {
    userInfo: UserInfo.collection.find({}).fetch(),
    userVehicles: UserVehicles.collection.find({}).fetch(),
    userTransportation: UserTransportation.collection.find({}).fetch(),
    entries: UserTransportation.collection.find({}, { sort: { date: -1 } }).fetch(),
    currentUser: currentUser,
    ready: sub1.ready() && sub2.ready() && sub3.ready() && currentUser != null,
  };
})(Dashboard);
