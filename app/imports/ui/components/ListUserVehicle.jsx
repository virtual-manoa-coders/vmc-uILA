import React from 'react';
import { Modal, Button, Header, Icon, Card } from 'semantic-ui-react';
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

  // state = {
  //   modalOpen: false,
  // };
  //
  // handleOpen = () => this.setState({ modalOpen: true });
  //
  // handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
        // <Table.Row className='entry-table'>
        //   <Table.Cell>{this.props.entry.carName}</Table.Cell>
        //   <Table.Cell>{this.props.entry.carMake}</Table.Cell>
        //   <Table.Cell>{this.props.entry.carModel}</Table.Cell>
        //   <Table.Cell>{this.props.entry.carYear}</Table.Cell>
        //   <Table.Cell>{this.props.entry.carMPG}</Table.Cell>
        //   <Table.Cell>{this.props.entry.carPrice}</Table.Cell>
        //   <Table.Cell>
        //     <Modal
        //         closeIcon
        //         open={this.state.open}
        //         trigger={<Button basic size='tiny' color='black' icon='trash alternate' />}
        //         onClose={() => this.setOpen(false)}
        //         onOpen={() => this.setOpen(true)}
        //     >
        //       <Header icon='trash alternate' content='Delete Entry' />
        //       <Modal.Content>
        //         <p style={{ color: 'black' }}>
        //           Are you sure you want to delete this vehicle?
        //         </p>
        //       </Modal.Content>
        //       <Modal.Actions>
        //         <Button color='red' onClick={() => this.setOpen(false)}>
        //           <Icon name='x' /> No
        //         </Button>
        //         <Button color='green' onClick={() => this.removeVehicle(this.props.entry._id)}>
        //           <Icon name='checkmark' /> Yes
        //         </Button>
        //       </Modal.Actions>
        //     </Modal>
        //   </Table.Cell>
        //   <Table.Cell>
        //     <Link to={`/edit-vehicle/${this.props.entry._id}`}>
        //       <Icon name='edit'/>
        //     </Link>
        //     {/*<Button basic size='tiny' color='black' icon='edit' onClick={() => this.handleOpen(this.props.entry._id)}/>*/}
        //     {/*<Modal*/}
        //     {/*    open={this.state.modalOpen}*/}
        //     {/*    onClose={this.handleClose}*/}
        //     {/*    closeIcon*/}
        //     {/*>*/}
        //     {/*  <Modal.Header>*/}
        //     {/*    Edit Vehicle*/}
        //     {/*  </Modal.Header>*/}
        //     {/*  <Modal.Content>*/}
        //     {/*    <EditUserVehicle{this.props.entry._id}handleClose={this.handleClose}/>*/}
        //     {/*  </Modal.Content>*/}
        //     {/*</Modal>*/}
        //   </Table.Cell>
        // </Table.Row>
        <Card>
          <Card.Content>
            <Card.Description>
              <Header as='h4'>{this.props.entry.carName}</Header>
            </Card.Description>
            <Card.Description>
              {this.props.entry.carYear} {this.props.entry.carMake} {this.props.entry.carModel}<br/>
              {this.props.entry.carMPG} MPG<br/>
              ${this.props.entry.carPrice}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Modal
                closeIcon
                open={this.state.open}
                trigger={<Button basic size='tiny' color='black'>
                  Delete{'  '}
                  <Icon name='trash alternate'/>
                </Button>}
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
            >
              <Header icon='trash alternate' content='Delete Entry'/>
              <Modal.Content>
                <p style={{ color: 'black' }}>
                  Are you sure you want to delete this vehicle?
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button color='red' onClick={() => this.setOpen(false)}>
                  <Icon name='x'/> No
                </Button>
                <Button color='green' onClick={() => this.removeVehicle(this.props.entry._id)}>
                  <Icon name='checkmark'/> Yes
                </Button>
              </Modal.Actions>
            </Modal>
            <Button basic size='tiny' color='black'>
              <Link style={{ color: 'black' }} to={`/edit-vehicle/${this.props.entry._id}`}>
                Edit{'  '}
                <Icon name='edit'/>
              </Link>
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ListUserVehicle.propTypes = {
  entry: PropTypes.object.isRequired,
  UserVehicles: PropTypes.object.isRequired,
};

export default withRouter(ListUserVehicle);
