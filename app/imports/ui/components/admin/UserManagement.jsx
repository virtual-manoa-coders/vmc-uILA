import React from 'react';
import { Header, Table, Card } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** A simple static component to render some text for the landing page. */
class UserManagement extends React.Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Table basic='very' celled collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Employee</Table.HeaderCell>
                                <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Header.Content>
                                            Lena
                                            <Header.Subheader>Human Resources</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>22</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Header.Content>
                                            Matthew
                                            <Header.Subheader>Fabric Design</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>15</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Header.Content>
                                            Lindsay
                                            <Header.Subheader>Entertainment</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>12</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        <Header.Content>
                                            Mark
                                            <Header.Subheader>Executive</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>11</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
        );
    }
}

/** Declare the types of all properties. */
UserManagement.propTypes = {
    currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const UserManagementContainer = withTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
}))(UserManagement);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(UserManagementContainer);
