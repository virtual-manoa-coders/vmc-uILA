import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Button, Container, Header, Loader, Modal, Table, Card, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ListUserVehicle from '../components/ListUserVehicle';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';
import AddVehicle from '../components/AddVehicle';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListUserVehicles extends React.Component {
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
        <div>
          <Header as="h3" textAlign="center" style={{ color: '#2292b3' }}>Your Vehicles</Header>
          <Grid>
            <Grid.Row>
              <Grid.Column floated='right'>
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
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Container>
                <Card.Group centered>
                  {this.props.entries.map((entry) => <ListUserVehicle key={entry._id} entry={entry}
                                                                      UserVehicles={UserVehicles}/>)}
                </Card.Group>
              </Container>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

ListUserVehicles.propTypes = {
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
})(ListUserVehicles);
