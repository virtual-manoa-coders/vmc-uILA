import React from 'react';
import { Grid, Card, Button, Input, Table } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserInfo } from '../../../api/userData/UserInfo';
import ListTransportEntry from '../ListTransportEntry';
import { UserTransportation } from '../../../api/userData/UserTransportation';

/** A simple static component to render some text for the landing page. */
class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null,
            sortColumn: {
                name: 'createdAt',
                isDescending: true,
            },
        };
        console.log(this.props.userList);

        this.handleRowSelection = this.handleRowSelection.bind(this);
    }

    // componentDidUpdate(prevProps) {
    //     console.log(this.props, prevProps)
    //
    //     if (prevProps.ready != this.props.ready) {
    //         initUserEntries
    //     }
    // }

    deleteUser(user) {
        UserInfo.collection.remove({ _id: user._id });
    }

    sort(name) {
        const sortColumn = {
            name: name,
            isDescending: this.state.sortColumn.name !== name ? true : !this.state.sortColumn.isDescending,
        };
        console.log(this.state.sortColumn, name, this.state.sortColumn.name);
        console.log(this.state.sortColumn.name !== name ? true : !this.state.sortColumn.isDescending);

        this.setState({ sortColumn });
    }

    handleRowSelection(index) {
        let selectedIndex = index;

        // Deselect the row if it is clicked again
        if (selectedIndex === this.state.selectedIndex) {
            selectedIndex = null;
        }

        this.setState({ selectedIndex });
    }

    render() {
        return (
            <div>
                <div>
                    <Button onClick={() => this.props.handleViewChange('overview')}>Go Back</Button>
                </div>
                <Card fluid>
                    <Card.Content>
                        <h3>Filter Options</h3>
                    </Card.Content>
                    <Card.Content>
                        Name Search
                        <Input/>
                        Email Search
                        <Input/>
                        <Button>Clear All</Button>
                        <Button>Filter</Button>
                    </Card.Content>
                </Card>
                <Card className={'user-management'} fluid>
                    <Card.Content>
                        <Grid>
                            <Grid.Row columns={'equal'}>
                                <Grid.Column onClick={() => this.sort('name')}>Name</Grid.Column>
                                <Grid.Column onClick={() => this.sort('email')}>Email</Grid.Column>
                                <Grid.Column onClick={() => this.sort('CO2Reduced')}>CO2 Reduced</Grid.Column>
                                <Grid.Column onClick={() => this.sort('VMTReduced')}>VMT Reduced</Grid.Column>
                                <Grid.Column onClick={() => this.sort('fuelSaved')}>Fuel Saved</Grid.Column>
                                <Grid.Column>Action</Grid.Column>
                            </Grid.Row>
                            {
                                this.props.userList.sort((a, b) => {
                                    if (a[this.state.sortColumn.name] < b[this.state.sortColumn.name]) {
                                        return this.state.sortColumn.isDescending ? -1 : 1;
                                    }

                                    if (a[this.state.sortColumn.name] > b[this.state.sortColumn.name]) {
                                        return this.state.sortColumn.isDescending ? 1 : -1;
                                    }

                                    return 0;
                                })
                                .map((user, index) => (
                                    <Grid.Row key={index} style={{ paddingBottom: 0 }}>
                                        <Grid columns={'equal'}
                                              className={`admin-table-row ${this.state.selectedIndex === index ? 'active-index' : ''}`}
                                              onClick={() => this.handleRowSelection(index)}>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    {user.name}
                                                </Grid.Column>
                                                <Grid.Column>
                                                    {user.email}
                                                </Grid.Column>
                                                <Grid.Column>
                                                    {user.CO2Reduced}
                                                </Grid.Column>
                                                <Grid.Column>
                                                    {user.VMTReduced}
                                                </Grid.Column>
                                                <Grid.Column>
                                                    {user.fuelSaved}
                                                </Grid.Column>
                                                <Grid.Column onClick={() => this.deleteUser(user)}>
                                                    <Button color={'red'} disabled={user.email === this.props.currentUser}>Delete User</Button>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                        {
                                            this.state.selectedIndex === index &&
                                            <Grid.Row className={'admin-travel-history'}>
                                                <Table celled basic={'very'}>
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell>Date</Table.HeaderCell>
                                                            <Table.HeaderCell>Transport</Table.HeaderCell>
                                                            <Table.HeaderCell>Miles</Table.HeaderCell>
                                                            <Table.HeaderCell>Delete</Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Header>
                                                    <Table.Body>
                                                        {
                                                            this.props.entries.map((entry) => <ListTransportEntry key={entry._id}
                                                                                                                    entry={entry} admin
                                                                                                                    UserTransportation={UserTransportation} />)
                                                        }
                                                    </Table.Body>
                                                </Table>
                                            </Grid.Row>
                                        }
                                    </Grid.Row>
                                ))
                            }
                            {
                                this.props.userList.length < 1 &&
                                <Grid.Row>
                                    <div className={'auto-margin'}>No users exist</div>
                                </Grid.Row>
                            }
                        </Grid>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

/** Declare the types of all properties. */
UserManagement.propTypes = {
    currentUser: PropTypes.string,
    userList: PropTypes.array.isRequired,
    entries: PropTypes.array.isRequired,
    handleViewChange: PropTypes.func.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const UserManagementContainer = withTracker(() => {
    const sub = Meteor.subscribe(UserTransportation.adminPublicationName);
    return {
        currentUser: Meteor.user() ? Meteor.user().username : '',
        entries: UserTransportation.collection.find({}, { sort: { date: -1 } }).fetch(),
        ready: sub.ready(),
    };
})(UserManagement);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(UserManagementContainer);
