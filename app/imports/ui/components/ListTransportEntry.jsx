import React from 'react';
import { Table, Modal, Button, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';

/** Renders a single row in the List Transport Entries table. See pages/ListTransportEntries.jsx. */
class ListTransportEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  setOpen(value) {
    this.setState({ open: value });
  }

  removeEntry(docID) {
    this.props.UserTransportation.collection.remove(docID);
    this.setOpen(false);
  }

  render() {
    const date = ` ${this.props.entry.date} `;
    const shortenedDate = moment(date).format('L');
    return (
        <Table.Row className='entry-table'>
          <Table.Cell>{shortenedDate}</Table.Cell>
          <Table.Cell>{this.props.entry.transport}</Table.Cell>
          <Table.Cell>{this.props.entry.miles}</Table.Cell>
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
                  Are you sure you want to delete this entry?
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button color='red' onClick={() => this.setOpen(false)}>
                  <Icon name='x' /> No
                </Button>
                <Button color='green' onClick={() => this.removeEntry(this.props.entry._id)}>
                  <Icon name='checkmark' /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </Table.Cell>
          {
            !this.props.admin &&
            <Table.Cell>
              <Link to={`/edit-transport-entry/${this.props.entry._id}`}>
                <Icon name='edit'/>
              </Link>
            </Table.Cell>
          }
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ListTransportEntry.propTypes = {
  entry: PropTypes.object.isRequired,
  UserTransportation: PropTypes.object.isRequired,
  admin: PropTypes.boolean,
};

export default withRouter(ListTransportEntry);
