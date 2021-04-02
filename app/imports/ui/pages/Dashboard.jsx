import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Icon, Divider, Segment, Header, Loader, Tab, Container, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import TransportPieChartWithDates from '../components/Visualization/TransportPieChartWithDates';
import { UserInfo } from '../../api/userData/UserInfo';
import { UserTransportation } from '../../api/userData/UserTransportation';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';
import TransportDataEntry from '../components/TransportDataEntry';
import ListTransportEntry from '../components/ListTransportEntry';
import AddVehicle from '../components/AddVehicle';
import ListUserVehicles from './ListUserVehicles';

class Dashboard extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const email = Meteor.user().username;
    const userInfo = UserInfo.collection.findOne({ email });
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
          <Container>
            <Header as="h3" textAlign="center" style={{ color: '#2292b3' }}>Your Trip History</Header>
            <Table unstackable celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Transport</Table.HeaderCell>
                  <Table.HeaderCell>Miles</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                  <Table.HeaderCell className='edit'>Edit</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.entries.map((entry) => <ListTransportEntry key={entry._id} entry={entry} UserTransportation={UserTransportation} />)}
              </Table.Body>
            </Table>
          </Container>
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
        <Grid id='dash' padded verticalAlign='middle' container
              textAlign='center' columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Divider hidden/>
              <h1></h1>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column verticalAlign='middle'>
              <Icon name='big arrow circle down'/><br/>
              GHG Reduced<br/>
              <h2>205,721 lbs</h2>
            </Grid.Column>
            <Divider hidden/>
            <Grid.Column verticalAlign='middle'>
              <Icon name='big taxi'/><br/>
              VMT Reduced<br/>
              <h2>231,547 miles</h2>
            </Grid.Column>
            <Divider hidden/>
            <Grid.Column verticalAlign='middle'>
              <Icon name='big road'/><br/>
              Gas Saved<br/>
              <h2>10,500 gallons</h2>
            </Grid.Column>
            <Divider hidden/>
            <Grid.Column verticalAlign='middle'>
              <Icon name='big home'/><br/>
              Telecommute<br/>
              <h2>32 days</h2>
            </Grid.Column>
            <Divider hidden/>
            <Grid.Column verticalAlign='middle'>
              <Icon name='big bicycle'/><br/>
              Biked to Work<br/>
              <h2>3 days</h2>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row id='space-row'>
          </Grid.Row>
          <Grid.Row columns={2} height='equal' width='equal'>
            <Grid.Column>
              <Segment>
              <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
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

    );
  }
}

/** Require an array of Stuff documents in the props. */
Dashboard.propTypes = {
  userInfo: PropTypes.array,
  userTransportation: PropTypes.array.isRequired,
  userVehicles: PropTypes.array.isRequired,
  entries: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to UserInfo documents.
  const sub1 = Meteor.subscribe(UserInfo.userPublicationName);
  const sub2 = Meteor.subscribe(UserTransportation.userPublicationName);
  const sub3 = Meteor.subscribe(UserVehicles.userPublicationName);
  return {
    userInfo: UserInfo.collection.find({}).fetch(),
    userVehicles: UserVehicles.collection.find({}).fetch(),
    userTransportation: UserTransportation.collection.find({}).fetch(),
    entries: UserTransportation.collection.find({}, { sort: { date: -1 } }).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(Dashboard);
