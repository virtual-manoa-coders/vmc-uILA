import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Grid, Button, Icon, Container, Card } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserVehicles } from '../../../api/userVehicles/UserVehicles';
import { AllUserVehicles } from '../../../api/userVehicles/AllUserVehicles';
import { adminGrabAllVehicles } from '../../../startup/both/Methods';

/** A simple static component to render some text for the landing page. */
class VehicleManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleList: [],
        };

        this.grabVehicles = this.grabVehicles.bind(this);
    }

    componentDidMount() {
        this.grabVehicles();
    }

    grabVehicles() {
        Meteor.call(adminGrabAllVehicles, {}, (err, res) => {
            if (err) {
                console.log('Error: ', err.message);
            } else {
                this.setState({ vehicleList: res });
            }
            return undefined;
        });
    }

    deleteVehicle(vehicle) {
        UserVehicles.collection.remove({ _id: vehicle._id }, this.grabVehicles);
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
                                <Grid.Column>Year</Grid.Column>
                                <Grid.Column>Price</Grid.Column>
                                <Grid.Column>MPG</Grid.Column>
                                {/* <Grid.Column>Fuel Saved</Grid.Column> */}
                                <Grid.Column>Action</Grid.Column>
                            </Grid.Row>
                            {
                                this.state.vehicleList.map((vehicle, index) => (
                                    <Grid.Row columns={'equal'} key={index}>
                                        <Grid.Column>
                                            {vehicle.carMake}
                                        </Grid.Column>
                                        <Grid.Column>
                                            {vehicle.carModel}
                                        </Grid.Column>
                                        <Grid.Column>
                                            {vehicle.carYear}
                                        </Grid.Column>
                                        <Grid.Column>
                                            {vehicle.carPrice}
                                        </Grid.Column>
                                        <Grid.Column>
                                            {vehicle.carMPG}
                                        </Grid.Column>
                                        <Grid.Column onClick={() => this.deleteVehicle(vehicle)}>
                                            <Button color={'red'}>Delete Vehicle</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                ))
                            }
                            {
                                this.state.vehicleList.length < 1 &&
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
    handleViewChange: PropTypes.func.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const VehicleManagementContainer = withTracker(() => {
    const sub1 = Meteor.subscribe(UserVehicles.adminPublicationName);

    console.log(UserVehicles.collection.find({}).fetch());

    return {
        currentUser: Meteor.user() ? Meteor.user().username : '',
        ready: sub1.ready(),
    };
})(VehicleManagement);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(VehicleManagementContainer);
