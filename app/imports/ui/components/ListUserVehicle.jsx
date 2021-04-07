import React from 'react';
import { Table, Modal, Button, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Transport Entries table. See pages/ListTransportEntriesPage.jsx. */
class ListUserVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  setOpen(value) {
    this.setState({ open: value });
  }

  removeVehicle(docID) {
    this.props.UserVehicles.collection.remove(docID);
    this.setOpen(false);
  }

  render() {
    // const date = ` ${this.props.entry.date} `;
    // const shortenedDate = moment(date).format('L');
    return (
        <Table.Row className='entry-table'>
          <Table.Cell>{this.props.entry.carName}</Table.Cell>
          <Table.Cell>{this.props.entry.carMake}</Table.Cell>
          <Table.Cell>{this.props.entry.carModel}</Table.Cell>
          <Table.Cell>{this.props.entry.carYear}</Table.Cell>
          <Table.Cell>{this.props.entry.carMPG}</Table.Cell>
          <Table.Cell>{this.props.entry.carPrice}</Table.Cell>
          <Table.Cell>
            <Modal
                closeIcon
                open={this.state.open}
                trigger={<Button basic size='tiny' color='black' icon='trash alternate' />}
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
            >
              <Header icon='trash alternate' content='Delete Entry' />
              <Modal.Content>
                <p style={{ color: 'black' }}>
                  Are you sure you want to delete this vehicle?
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button color='red' onClick={() => this.setOpen(false)}>
                  <Icon name='x' /> No
                </Button>
                <Button color='green' onClick={() => this.removeVehicle(this.props.entry._id)}>
                  <Icon name='checkmark' /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/edit-vehicle/${this.props.entry._id}`}>
              <Icon name='edit'/>
            </Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ListUserVehicle.propTypes = {
  entry: PropTypes.object.isRequired,
  UserVehicles: PropTypes.object.isRequired,
};

export default withRouter(ListUserVehicle);
