import React from 'react';
import { Grid, Header, Loader, Segment, Button } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, DateField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
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

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
export class TransportDataEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTransport: 'Telecommmute',
      selectedVehicle: null,
    };
  }

  // state = {
  //   // selectedTransport: null,
  //   selectedVehicle: null,
  // };

  handleTransportChange = (transport) => {
    if (transport === 'Car') {
      this.handleVehicleChange();
      // eslint-disable-next-line no-console
      this.setState({ selectedTransport: transport, show: true }, () => console.log('Transport selected: ', (transport)));
    } else {
      // eslint-disable-next-line no-console
      this.setState({ selectedTransport: transport, show: false }, () => console.log('Transport selected: ', (transport)));
    }
  };

  handleVehicleChange = selectedVehicle => {
    this.setState({ selectedVehicle }, () => console.log('Vehicle selected: ', selectedVehicle));
  }

  /** On log your commute submit, insert the data into UserTransportation. */
  handleSubmit = (data, formRef) => {
    const userData = {};
    userData.date = data.date;
    userData.transport = this.state.selectedTransport;
    userData.vehicle = this.state.selectedVehicle;
    userData.miles = data.miles;
    userData.mpg = getMPG(userData.vehicle, this.props.userVehicles);
    userData.userID = Meteor.user()._id;
    console.log(userData);
    UserTransportation.collection.insert({
      userData,
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Log entry added successfully', 'success');
            formRef.reset();
          }
        });
  }

  transportationLog() {
    const { selectedVehicle } = this.state;
    const { selectedTransport } = this.state;

    console.log(UserTransportationTypeEnum.Array);
    const transportOptions = UserTransportationTypeEnum.Array.map((transport, index) => ({
      key: index,
      label: transport,
      value: transport,
    }));
    console.log(transportOptions);

    const vehicleOptions = this.props.userVehicles.map((vehicle) => ({
      key: vehicle._id,
      label: vehicle.carName || `${vehicle.carYear} ${vehicle.carMake} ${vehicle.carModel}`,
      value: vehicle.carName || `${vehicle.carYear} ${vehicle.carMake} ${vehicle.carModel}`,
      // label: `${vehicle.carModel} ${vehicle.carYear}`,
      // value: `${vehicle.carModel} ${vehicle.carYear}`,
      mpg: vehicle.carMPG,
      vehicle: vehicle,
    }));

    console.log(vehicleOptions);

    let fRef = null;
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
                             options={transportOptions}
                             value={selectedTransport}
                             onChange={this.handleTransportChange}
                             placeholder='Select transport'
                />
                {this.state.show && (
                <SelectField name='vehicle'
                             options={vehicleOptions}
                             value={selectedVehicle}
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

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (this.props.ready) ?
        this.transportationLog()
        : <Loader active>Getting data</Loader>;
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

export default withTracker(() => {
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
