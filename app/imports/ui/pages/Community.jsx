import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Table, Divider, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { UserInformation } from '../../api/userData/UserInformation';

/** A simple static component to render some text for the landing page. */
class Community extends React.Component {
  dashboard() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

          <Grid padded relaxed verticalAlign='middle'>
            <Grid.Row id='space-row'>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3} verticalAlign='middle'>
                <Grid.Row>
                  This is you vs. the average person in your city.
                </Grid.Row>
                <Divider hidden/>
                <Grid.Row>
                  You are doing x% better than the average person in your city.
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={13}>
                <Table padded basic definition id="community-table">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell>You</Table.HeaderCell>
                      <Table.HeaderCell>Average</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Today</Table.Cell>
                      <Table.Cell>#g</Table.Cell>
                      <Table.Cell>#g</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Week</Table.Cell>
                      <Table.Cell>#g</Table.Cell>
                      <Table.Cell>#g</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Month</Table.Cell>
                      <Table.Cell>#g</Table.Cell>
                      <Table.Cell>#g</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Annual</Table.Cell>
                      <Table.Cell>#g</Table.Cell>
                      <Table.Cell>#g</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>

          </Grid>

          <Divider hidden/>

        </Grid>
    );
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.dashboard() : <Loader active>Getting data</Loader>;
  }
}

/** Require an array of Stuff documents in the props. */
Community.propTypes = {
  userInformation: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(UserInformation.userPublicationName);
  return {
    userInformation: UserInformation.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Community);
