import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Header, Loader, Modal, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ListUserVehicle from '../components/ListUserVehicle';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';
import AddVehicle from '../components/AddVehicle';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListUserVehiclesPage extends React.Component {
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
    return (
        <Container>
          <Header as="h3" textAlign="center" style={{ color: '#2292b3' }}>Your Vehicles</Header>
          <Button id='list-user-vehicles' onClick={this.handleOpen}> Add a Vehicle
          </Button>
          <Modal
              open={this.state.modalOpen}
              onClose={this.handleClose}
              closeIcon
          >
            <Modal.Header>
              Add a Vehicle
            </Modal.Header>
            <Modal.Content>
              <AddVehicle handleClose={this.handleClose}/>
            </Modal.Content>
          </Modal>
          {/* <Table unstackable celled> */ }
          {/*  <Table.Header> */}
          {/*    <Table.Row> */}
          {/*      <Table.HeaderCell>Car Name</Table.HeaderCell> */}
          {/*      <Table.HeaderCell>Car Make</Table.HeaderCell> */}
          {/*      <Table.HeaderCell>Car Model</Table.HeaderCell> */}
          {/*      <Table.HeaderCell>Car Year</Table.HeaderCell> */}
          {/*      <Table.HeaderCell>Car MPG</Table.HeaderCell> */}
          {/*      <Table.HeaderCell>Car Price</Table.HeaderCell> */}
          {/*      <Table.HeaderCell>Delete</Table.HeaderCell> */}
          {/*      <Table.HeaderCell className='edit'>Edit</Table.HeaderCell> */}
          {/*    </Table.Row> */}
          {/*  </Table.Header> */}
          {/*  <Table.Body> */}
          {/*    {this.props.entries.map((entry) => <ListUserVehicle key={entry._id} entry={entry} */}
          {/*                                                        UserVehicles={UserVehicles}/>)} */}
          {/*  </Table.Body> */}
          {/* </Table> */}
          <Card.Group>
            {this.props.entries.map((entry) => <ListUserVehicle key={entry._id} entry={entry}
                                                                UserVehicles={UserVehicles}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListUserVehiclesPage.propTypes = {
  entries: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe(UserVehicles.userPublicationName);
  return {
    entries: UserVehicles.collection.find({}, { sort: { date: -1 } }).fetch(),
    ready: subscription.ready(),
  };
})(ListUserVehiclesPage);
