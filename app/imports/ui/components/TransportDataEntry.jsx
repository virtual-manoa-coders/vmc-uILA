import React, { useState } from 'react';
import { Grid, Header, Loader, Segment, Button, Dropdown } from 'semantic-ui-react';
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

/*
TODO:
- Add page to enter basic info before letting you enter milage
- After you're done, take you back to dasboard or community
 */

/** Create a schema to specify the structure of the data to appear in the logging form. */
const formSchema = new SimpleSchema({
  transport: {
    type: String,
    allowedValues: ['Telecommute', 'Walk', 'Bike', 'Carpool', 'Bus', 'Car'],
    defaultValue: 'Telecommute',
  },
  date: Date,
  miles: Number,
  vehicle: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class TransportDataEntry extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     vehicle: { mpg: 0 },
  //   };
  //   this.vehicle = React.createRef();
  //   this.submit = this.submit.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  // }

  state = {
    selectedVehicle: null,
    transport: '',
  };

  displayWhenSelected = (transport, value, selectedVehicle) => {
    const selectedIndex = transport.selectedIndex;
    const isSelected = transport[selectedIndex].value === value;
    selectedVehicle.classList[isSelected ? 'add' : 'remove']('show');
  };

  handleChange = selectedVehicle => {
    this.setState({ selectedVehicle }, () =>
        console.log('Vehicle selected: ', selectedVehicle));
  }

  handleTransportChange = (transport) => {
    if (transport === 'Car') {
      this.handleChange();
      this.setState({ transport, show: true }, () =>
          console.log('Transport selected: ', transport));
    }
  }

  // transport.addEventListener('change', (e) => displayWhenSelected(transport,'Car', selectedVehicle))

  // transport.addEventListener('change',  displayWhenSelected(transport, 'Car', selectedVehicle));

  /** On log your commute submit, insert the data into UserTransportation. */
  submit(data, formRef) {
    const { date, transport, miles } = data;
    const userID = Meteor.user()._id;
    const user = Meteor.user().username;
    const userVehicles = _.where(UserVehicles.collection.find().fetch(), { owner: user });
    const mpg = userVehicles.carMPG;

    UserTransportation.collection.insert({
          transport,
          date,
          miles,
          mpg,
          userID,
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
    const { selectedVehicle, transport } = this.state;
    const user = Meteor.user().username;
    const userVehicles = _.where(UserVehicles.collection.find().fetch(), { owner: user });
    // console.log(userVehicles);
    const vehicleMPGs = _.pluck(userVehicles, 'carMPG');
    // console.log(vehicleMPGs);

    const options = this.props.userVehicles.map((vehicle) => ({
      key: vehicle._id,
      label: vehicle.carModel + vehicle.carYear,
      value: vehicle.carModel + vehicle.carYear,
      vehicle: vehicle,
    }));
    // console.log(options);

    let fRef = null;
    return (
        <Grid centered>
          <Grid.Column>
            <AutoForm ref={ref => {
              fRef = ref;
            }}
                      schema={bridge}
                      onSubmit={data => this.submit(data, fRef)}
                // onChange={(key, value) => {
                //   console.log(key, value);
                //
                // }}
            >
              <Segment>
                <Header style={{ color: '#2292b3' }} textAlign='center' as='h3'>Log a Trip</Header>
                <DateField name='date'
                           max={new Date()}
                           min={new Date(2017, 1, 1)}
                />
                <SelectField name='transport'
                             value={transport}
                             onChange={this.handleTransportChange}
                />
                {this.state.show && (
                <SelectField name='vehicle'
                             options={options}
                             value={selectedVehicle}
                             onChange={this.handleChange}
                             placeholder='Select vehicle'
                />
                )}
                <NumField name='miles' decimal={false}/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
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
  userVehicles: PropTypes.array.isRequired,
  carMPG: PropTypes.number.isRequired,
  // onChange: PropTypes.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to documents.
  const sub1 = Meteor.subscribe(UserInfo.userPublicationName);
  const sub2 = Meteor.subscribe(UserVehicles.userPublicationName);
  const user = Meteor.user().username;

  return {
    userInfo: UserInfo.collection.find({}).fetch(),
    userVehicles: _.where(UserVehicles.collection.find().fetch(), { owner: user }),
    // userVehicles: UserVehicles.collection.find().fetch(),
    ready: sub1.ready() && sub2.ready(),
  };

})(TransportDataEntry);
