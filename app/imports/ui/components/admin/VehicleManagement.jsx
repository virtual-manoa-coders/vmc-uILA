import React from 'react';
import { Grid, Button, Card, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserVehicles } from '../../../api/userVehicles/UserVehicles';
import { adminGrabAllVehicles } from '../../../startup/both/Methods';

/** A simple static component to render some text for the landing page. */
class VehicleManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleList: [],
            sortColumn: {
                name: '',
                isDescending: true,
            },
        };

        this.grabVehicles = this.grabVehicles.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        this.grabVehicles();
    }

    grabVehicles() {
        Meteor.call(adminGrabAllVehicles, {}, (err, res) => {
            if (err) {
                console.log('Error: ', err.message);
            } else {
                console.log(res);
                this.setState({ vehicleList: res });
            }
            return undefined;
        });
    }

    deleteVehicle(vehicle) {
        UserVehicles.collection.remove({ _id: vehicle._id }, this.grabVehicles);
    }

    sort(name) {
        const sortColumn = {
            name: name,
            isDescending: this.state.sortColumn.name !== name ? true : !this.state.sortColumn.isDescending,
        };

        this.setState({ sortColumn });
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
                            <Grid.Row columns={'equal'} className={'admin-table-header'}>
                                <Grid.Column onClick={() => this.sort('carMake')}>
                                    Make
                                    {this.state.sortColumn.name === 'carMake' && <Icon name={this.state.sortColumn.isDescending ? 'caret down' : 'caret up'}/>}
                                </Grid.Column>
                                <Grid.Column onClick={() => this.sort('carModel')}>
                                    Model
                                    {this.state.sortColumn.name === 'carModel' && <Icon name={this.state.sortColumn.isDescending ? 'caret down' : 'caret up'}/>}
                                </Grid.Column>
                                <Grid.Column onClick={() => this.sort('carYear')}>
                                    Year
                                    {this.state.sortColumn.name === 'carYear' && <Icon name={this.state.sortColumn.isDescending ? 'caret down' : 'caret up'}/>}
                                </Grid.Column>
                                <Grid.Column onClick={() => this.sort('carPrice')}>
                                    Price
                                    {this.state.sortColumn.name === 'carPrice' && <Icon name={this.state.sortColumn.isDescending ? 'caret down' : 'caret up'}/>}
                                </Grid.Column>
                                <Grid.Column onClick={() => this.sort('carMPG')}>
                                    MPG
                                    {this.state.sortColumn.name === 'carMPG' && <Icon name={this.state.sortColumn.isDescending ? 'caret down' : 'caret up'}/>}
                                </Grid.Column>
                                <Grid.Column>Action</Grid.Column>
                            </Grid.Row>
                            {
                                this.state.vehicleList
                                .sort((a, b) => {
                                    if (a[this.state.sortColumn.name] < b[this.state.sortColumn.name]) {
                                        return this.state.sortColumn.isDescending ? -1 : 1;
                                    }

                                    if (a[this.state.sortColumn.name] > b[this.state.sortColumn.name]) {
                                        return this.state.sortColumn.isDescending ? 1 : -1;
                                    }

                                    return 0;
                                })
                                .map((vehicle, index) => (
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

    return {
        currentUser: Meteor.user() ? Meteor.user().username : '',
        ready: sub1.ready(),
    };
})(VehicleManagement);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(VehicleManagementContainer);
