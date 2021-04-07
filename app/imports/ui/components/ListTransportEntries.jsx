import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ListTransportEntry from '../components/ListTransportEntry';
import { UserTransportation } from '../../api/userData/UserTransportation';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListTransportEntries extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h3" textAlign="center" style={{ color: '#2292b3' }}>Your Trips</Header>
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
  entries: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe(UserTransportation.userPublicationName);
  return {
    entries: UserTransportation.collection.find({}, { sort: { carMake: +1 } }).fetch(),
    ready: subscription.ready(),
  };
})(ListTransportEntries);
