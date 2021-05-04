import React from 'react';
import { Grid, Header, Loader, Segment, Button } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, DateField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { UserTransportation } from '../../api/userData/UserTransportation';
import { UserInfo } from '../../api/userData/UserInfo';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';
import { UserTransportationTypeEnum, getMPG } from '../../api/userData/UserTransportation-Utilities';

/*
TODO:
- Add page to enter basic info before letting you enter milage
- After you're done, take you back to dasboard or community
 */

/** Create a schema to specify the structure of the data to appear in the logging form. */
const formSchema = new SimpleSchema({
  transport: {
    type: String,
  },
  date: Date,
  miles: Number,
  mpg: { type: Number, optional: true },
  vehicle: { type: String, optional: true },
});

/** Renders the Page for adding a document. */
class TransportDataEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTransport: 'Telecommute',
      selectedVehicle: null,
      show: false,
    };
    this.handleTransportChange = this.handleTransportChange.bind(this);
    this.handleVehicleChange = this.handleVehicleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // state = {
  //   // selectedTransport: null,
  //   selectedVehicle: null,
  // };

  handleTransportChange = (transport) => {
    if (transport === 'Car') {
      // this.handleVehicleChange();
      // eslint-disable-next-line no-console
      this.setState({
        selectedTransport: transport,
        show: true,
      }, () => console.log('Transport selected: ', (transport)));
    } else {
      // eslint-disable-next-line no-console
      this.setState({
        selectedTransport: transport,
        show: false,
      }, () => console.log('Transport selected: ', this.state.selectedTransport));
    }
  };

  handleVehicleChange = (vehicle) => {
    const email = Meteor.user().username;
    const profile = UserInfo.collection.findOne({ email });
    const userCar = this.props.userVehicles.filter(car => car._id === profile.carID)[0];
    if (vehicle === null) {
      this.setState({ selectedVehicle: userCar }, () => console.log('Vehicle selected: ', this.state.selectedVehicle));
    }
    this.setState({ selectedVehicle: vehicle }, () => console.log('Vehicle selected: ', this.state.selectedVehicle));
  }

  /** On log your commute submit, insert the data into UserTransportation. */
  handleSubmit = (data, formRef) => {
    const { date, miles } = data;
    const transport = this.state.selectedTransport;
    const vehicle = this.state.selectedVehicle;
    const mpg = getMPG(vehicle, this.props.userVehicles);
    const userID = Meteor.user()._id;

    UserTransportation.collection.insert({ date, transport, vehicle, mpg, miles, userID,
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Log added successfully', 'success').then(() => formRef.reset());
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (this.props.ready) ?
        this.transportationLog()
        : <Loader active>Getting data</Loader>;
  }

  transportationLog = () => {

    const transportOptions = UserTransportationTypeEnum.Array.map((transport) => ({
      key: transport,
      label: transport,
      value: transport,
    }));

    const vehicleOptions = this.props.userVehicles.map((vehicle) => ({
      key: vehicle._id,
      label: vehicle.carName || `${vehicle.carYear} ${vehicle.carMake} ${vehicle.carModel}`,
      value: vehicle.carName || `${vehicle.carYear} ${vehicle.carMake} ${vehicle.carModel}`,
      mpg: vehicle.carMPG,
      vehicle: vehicle,
    }));

    let fRef = null;
    const bridge = new SimpleSchema2Bridge(formSchema);
    return (
        <Grid centered>
          <Grid.Column>
            <AutoForm ref={ref => {
              fRef = ref;
            }}
                      schema={bridge}
                      onSubmit={data => this.handleSubmit(data, fRef)}
            >
              <Segment>
                <Header style={{ color: '#2292b3' }} textAlign='center' as='h3'>Log a Trip</Header>
                <DateField name='date'
                           max={new Date()}
                           min={new Date(2017, 1, 1)}
                />
                <SelectField name='transport'
                             type='string'
                             options={transportOptions}
                             value={this.state.selectedTransport}
                             onChange={this.handleTransportChange}
                             placeholder='Select transport'
                />
                {this.state.show && (
                    <SelectField name='vehicle'
                                 options={vehicleOptions}
                                 value={this.state.selectedVehicle}
                                 onChange={this.handleVehicleChange}
                                 placeholder='Select vehicle'
                    />
                )}
                <NumField name='mpg'
                          decimal={false}
                          hidden={true}
                />
                <NumField name='miles' decimal={false}/>
                <ErrorsField/>
                <SubmitField value='Submit'/>
                <Button id='view-trips' as={NavLink} activeClassName="active" exact to="/list-transport-entries"
                        key='list-transport-entries'> View/Edit Your Trips
                </Button>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of userInfo documents in the props. */
TransportDataEntry.propTypes = {
  userInfo: PropTypes.array.isRequired,
  // userTransport: PropTypes.array.isRequired,
  userVehicles: PropTypes.array.isRequired,
  carMPG: PropTypes.number.isRequired,
  ready: PropTypes.bool.isRequired,
};

const TransportDataEntryContainer = withTracker(() => {
  // Get access to documents.
  const sub1 = Meteor.subscribe(UserInfo.userPublicationName);
  const sub2 = Meteor.subscribe(UserVehicles.userPublicationName);
  const user = Meteor.user().username;

  return {
    userInfo: UserInfo.collection.find({}).fetch(),
    // userTransport: _.pluck(UserTransportation.collection.find().fetch(), 'allowedValues'),
    userVehicles: _.where(UserVehicles.collection.find().fetch(), { owner: user }),
    ready: sub1.ready() && sub2.ready(),
  };

})(TransportDataEntry);

export default withRouter(TransportDataEntryContainer);
