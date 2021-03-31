import React from 'react';
import { Grid, Button, Icon, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import UserManagement from '../components/admin/UserManagement';
import VehicleManagement from '../components/admin/VehicleManagement';
import { UserInfo } from '../../api/userData/UserInfo';
import { UserTransportation } from '../../api/userData/UserTransportation';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';

/** A simple static component to render some text for the landing page. */
class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageView: 'overview',
        };

        console.log(props);

        this.handleViewChange = this.handleViewChange.bind(this);
    }

    handleViewChange(view) {
        console.log(this.props);
        this.setState({ currentPageView: view });
    }

    renderOverview() {
        return (
            <Grid id='admin-page' verticalAlign='middle' textAlign='center' container>
                <Grid.Row>
                    Welcome Administrator {this.props.currentUser} <br/>
                </Grid.Row>
                <Grid.Row>
                    <Grid columns={'equal'} style={{ width: '100%' }}>
                        <Grid.Column>
                            <Button inverted fluid size={'massive'} onClick={() => this.handleViewChange('user')}>Manage Users</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button inverted fluid size={'massive'} onClick={() => this.handleViewChange('vehicle')}>Manage Vehicles</Button>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            </Grid>
        );
    }

    render() {
        return (
            <Container>
                {
                    this.state.currentPageView === 'overview' &&
                    this.renderOverview()
                }
                {
                    this.state.currentPageView === 'user' &&
                    <UserManagement userList={this.props.users}/>
                }
                {
                    this.state.currentPageView === 'vehicle' &&
                    <VehicleManagement/>
                }
            </Container>
        );
    }
}

/** Declare the types of all properties. */
Admin.propTypes = {
    currentUser: PropTypes.string,
    userTransportation: PropTypes.array.isRequired,
    userVehicles: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to UserInfo documents.
    const sub1 = Meteor.subscribe(UserInfo.adminPublicationName);
    const sub2 = Meteor.subscribe(UserTransportation.adminPublicationName);
    const sub3 = Meteor.subscribe(UserVehicles.adminPublicationName);
    return {
        currentUser: Meteor.user() ? Meteor.user().username : '',
        userVehicles: UserVehicles.collection.find({}).fetch(),
        userTransportation: UserTransportation.collection.find({}).fetch(),
        users: UserInfo.collection.find({}).fetch(),
        ready: sub1.ready() && sub2.ready() && sub3.ready(),
    };
})(Admin);
