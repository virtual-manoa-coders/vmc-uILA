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
  constructor(props) {
    super(props);
    this.state = {
      vehicle: '',
    };
    this.vehicle = React.createRef();
    this.submit = this.submit.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  // handleChange(event) {
  //   const vehicle = this.props.userVehicles.find(v => v.carName === event.vehicle.carName);
  //   this.setState({ vehicle: vehicle });
  // }

  // handleClick() {
  //   this.setState({ isSelected: true });
  // }

   handleChange = (e) => {
      const selectedVehicle = e.value;
      this.setState({ selectedVehicle });
    }

  /** On log your commute submit, insert the data into UserTransportation. */
  submit(data, formRef) {
    const { date, transport, miles } = data;
    const userID = Meteor.user()._id;
    const mpg = this.props.carMPG;

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

  onVehicleChange(event) {
    this.setState({ vehicle: event.target.value });
    const vehicle = this.vehicle.current.value;
    console.log('Vehicle changed to: ' + vehicle);
  }

  transportationLog() {
    const user = Meteor.user().username;
    const userVehicles = _.where(UserVehicles.collection.find().fetch(), { owner: user });
    console.log(userVehicles);

    const options = this.props.userVehicles.map((vehicle, index) => ({
        label: vehicle.carName,
        value: vehicle.carName,
        key: index,
      }));

    // const { selectedVehicle, options } = this.state;

    let fRef = null;
    return (
        <Grid centered>
          <Grid.Column>
            <AutoForm ref={ref => {
              fRef = ref;
            }}
                      schema={bridge}
                      onSubmit={data => this.submit(data, fRef)}
                      onChange={(key, value) => {
                        console.log(key, value);
                      }}
            >
              <Segment>
              <Header style={{ color: '#2292b3' }} textAlign='center' as='h3'>Log a Trip</Header>
                <DateField name='date'
                           max={new Date()}
                           min={new Date(2017, 1, 1)}
                />
                <SelectField name='transport'/>
                <SelectField name='vehicle'
                             value={this.state.vehicle}
                             // onSelect={this.handleChange}
                             options={options}
                />
                <NumField name='miles' decimal={false}/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <Button id='view-trips' as={NavLink} activeClassName="active" exact to="/list-transport-entries" key='list-transport-entries'> View/Edit Your Trips
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
