import React from 'react';
import { Grid, Button, Icon, Container, Card } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserVehicles } from '../../../api/userVehicles/UserVehicles';

/** A simple static component to render some text for the landing page. */
class VehicleManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // state will be added later
        };
    }

    deleteUser(vehicle) {
        UserVehicles.collection.remove({ _id: vehicle._id });
    }

    render() {
        return (
            <div>
                <div>
                    <Button onClick={() => this.props.handleViewChange('overview')}>Go Back</Button>
                </div>
                <Card className={'user-management'} fluid>
                    <Card.Content>
                        <Grid>
                            <Grid.Row columns={'equal'}>
                                <Grid.Column>Make</Grid.Column>
                                <Grid.Column>Model</Grid.Column>
                                <Grid.Column>Price</Grid.Column>
                                <Grid.Column>MPG</Grid.Column>
                                {/* <Grid.Column>Fuel Saved</Grid.Column> */}
                                <Grid.Column>Action</Grid.Column>
                            </Grid.Row>
                            {
                                this.props.vehicleList.map((user, index) => (
                                    <Grid.Row columns={'equal'} key={index}>
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
                                            <Button color={'red'}>Delete Vehicle</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                ))
                            }
                            {
                                this.props.vehicleList.length < 1 &&
                                <Grid.Row>
                                    <div className={'auto-margin'}>No vehicles exist</div>
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
VehicleManagement.propTypes = {
    currentUser: PropTypes.string,
    vehicleList: PropTypes.array.isRequired,
    handleViewChange: PropTypes.func.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const VehicleManagementContainer = withTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
}))(VehicleManagement);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(VehicleManagementContainer);
