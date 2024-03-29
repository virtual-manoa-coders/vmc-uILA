import React from 'react';
import { Grid, Card, Button, Table, Loader, Input, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserInfo } from '../../../api/userData/UserInfo';
import UserHistory from '../../components/admin/UserHistory';
import { UserTransportation } from '../../../api/userData/UserTransportation';
import { getMeteorId } from '../Visualization/Functions';

/** A simple static component to render some text for the landing page. */
class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null,
            sortColumn: {
                name: 'createdAt',
                isDescending: true,
                loading: false,
            },
            subSortColumn: {
                name: 'createdAt',
                isDescending: true,
            },
            collapseFilter: false,
            nameFilter: '',
            emailFilter: '',
        };

        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event, data) {
        this.setState({ [data.name]: data.value });
    }

    toggleFilterView() {
        this.setState({ collapseFilter: !this.state.collapseFilter });
    }

    deleteUser(user) {
        UserInfo.collection.remove({ _id: user._id });
    }

    sort(name, isSub) {
        const sortColumn = {
            name: name,
            isDescending: this.state.sortColumn.name !== name ? true : !this.state.sortColumn.isDescending,
        };
        if (isSub) {
            sortColumn.isDescending = this.state.subSortColumn.name !== name ? true : !this.state.subSortColumn.isDescending;
            this.setState({ subSortColumn: sortColumn });
        } else {
            this.setState({ sortColumn, selectedIndex: null });
        }
    }

    handleRowSelection(index, user) {
        let selectedIndex = index;

        // Deselect the row if it is clicked again
        if (selectedIndex === this.state.selectedIndex) {
            selectedIndex = null;
        } else {
            // This is asyncronus, so the return value will be undefined, even though it will be a valid ID later
            // so render transports inside the callback, i.e. here
            getMeteorId(user.email, (userId) => {
                if (userId) {
                    setTimeout(() => {
                        this.setState({ selectedUserId: userId, loading: false });
                    }, 1000);
                }
            });
        }

        this.setState({ selectedIndex, loading: true });
    }

    render() {
        return (
            <div>
                <div>
                    <Button onClick={() => this.props.handleViewChange('overview')}>Go Back</Button>
                </div>
                 <Card fluid>
                    <Card.Content className={'admin-filter-options'}>
                        <Grid>
                            <Grid.Row>
                                <h3>Filter Options</h3>
                                <Icon onClick={this.toggleFilterView.bind(this)} name={this.state.collapseFilter ? 'plus' : 'minus'}/>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                    <Card.Content style={this.state.collapseFilter ? { display: 'none' } : {}}>
                        <Grid>
                            <Grid.Row columns={'equal'}>
                                <Grid.Column>
                                    Name Filter <br/>
                                    <Input
                                        fluid
                                        name={'nameFilter'}
                                        onChange={(event, data) => {
                                          this.handleInputChange(event, data);
                                        }}/>
                                </Grid.Column>
                                <Grid.Column>
                                    Email Filter <br/>
                                    <Input
                                        fluid
                                        name={'emailFilter'}
                                        onChange={(event, data) => {
                                            this.handleInputChange(event, data);
                                        }}/>
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>
                    </Card.Content>
                 </Card>
                <Card className={'user-management'} fluid>
                    <Card.Content>
                        <Grid>
                            <Grid.Row columns={'equal'} className={'admin-table-header'}>
                                <Grid.Column onClick={() => this.sort('name')}>Name</Grid.Column>
                                <Grid.Column onClick={() => this.sort('email')}>Email</Grid.Column>
                                <Grid.Column onClick={() => this.sort('CO2Reduced')}>CO2 Reduced</Grid.Column>
                                <Grid.Column onClick={() => this.sort('VMTReduced')}>VMT Reduced</Grid.Column>
                                <Grid.Column onClick={() => this.sort('fuelSaved')}>Fuel Saved</Grid.Column>
                                <Grid.Column>Action</Grid.Column>
                            </Grid.Row>
                            {
                                this.props.userList
                                .filter((user) => {
                                    if ((this.state.nameFilter.length < 1 && this.state.emailFilter < 1) ||
                                        (user.email.includes(this.state.emailFilter) && user.name.includes(this.state.nameFilter))) {
                                        return true;
                                    }
                                    return false;
                                })
                                .sort((a, b) => {
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
                                              onClick={() => this.handleRowSelection(index, user)}>
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
                                          this.state.selectedIndex === index && (this.state.loading ?
                                          <Grid.Row style={{ padding: '1em' }}><Loader active inline={'centered'}>Fetching user&apos;s travel history</Loader></Grid.Row>
                                          :
                                          <Grid.Row className={'admin-travel-history'}>
                                            <Table celled basic={'very'}>
                                              <Table.Header>
                                                <Table.Row>
                                                  <Table.HeaderCell onClick={() => this.sort('date', true)}>Date</Table.HeaderCell>
                                                  <Table.HeaderCell onClick={() => this.sort('transport', true)}>Transport</Table.HeaderCell>
                                                  <Table.HeaderCell onClick={() => this.sort('miles', true)}>Miles</Table.HeaderCell>
                                                  <Table.HeaderCell>Delete</Table.HeaderCell>
                                                </Table.Row>
                                              </Table.Header>
                                              <Table.Body>
                                                {
                                                  <UserHistory subSortColumn={this.state.subSortColumn} selectedUserId={this.state.selectedUserId}/>
                                                }
                                              </Table.Body>
                                            </Table>
                                          </Grid.Row>)
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
    const sub1 = Meteor.subscribe(UserTransportation.adminPublicationName);
    const sub2 = Meteor.subscribe(UserInfo.adminPublicationName);

    return {
        currentUser: Meteor.user() ? Meteor.user().username : '',
        entries: UserTransportation.collection.find({}, { sort: { date: -1 } }).fetch(),
        ready: sub1.ready() && sub2.ready(),
    };
})(UserManagement);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(UserManagementContainer);
