import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table, Button, Modal } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ListTransportEntry from '../components/ListTransportEntry';
import { UserInfo } from '../../api/userData/UserInfo';
import { UserTransportation } from '../../api/userData/UserTransportation';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';
import TransportDataEntry from '../components/TransportDataEntry';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListTransportEntries extends React.Component {
  state = {
    modalOpen: false,
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const email = Meteor.user().username;
    const userInfo = UserInfo.collection.findOne({ email });
    const userCar = this.props.userVehicles.filter(car => car._id === userInfo.carID)[0];

    return (
        <Container>
          <Header as="h3" textAlign="center" style={{ color: '#2292b3' }}>Your Trips</Header>
          <Button id='transport-data-entry' onClick={this.handleOpen}> Log a Trip
          </Button>
          <Modal
              open={this.state.modalOpen}
              onClose={this.handleClose}
              closeIcon
          >
            <Modal.Header>
              Log a Trip
            </Modal.Header>
            <Modal.Content>
              <TransportDataEntry carMPG={userCar.carMPG} userTransportation={this.props.userTransportation} handleClose={this.handleClose}/>
            </Modal.Content>
          </Modal>
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
    );
  }
}
/** Require an array of Stuff documents in the props. */
ListTransportEntries.propTypes = {
  userInfo: PropTypes.array,
  userTransportation: PropTypes.array.isRequired,
  userVehicles: PropTypes.array.isRequired,
  entries: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const sub1 = Meteor.subscribe(UserInfo.userPublicationName);
  const sub2 = Meteor.subscribe(UserTransportation.userPublicationName);
  const sub3 = Meteor.subscribe(UserVehicles.userPublicationName);
  return {
    userInfo: UserInfo.collection.find({}).fetch(),
    userVehicles: UserVehicles.collection.find({}).fetch(),
    userTransportation: UserTransportation.collection.find({}).fetch(),
    entries: UserTransportation.collection.find({}, { sort: { carMake: +1 } }).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(ListTransportEntries);
