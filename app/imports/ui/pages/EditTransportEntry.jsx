import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import {
  AutoForm,
  DateField,
  ErrorsField,
  NumField,
  SelectField,
  SubmitField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { UserTransportation } from '../../api/userData/UserTransportation';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';
import { UserTransportationTypeEnum, getMPG } from '../../api/userData/UserTransportation-Utilities';
import { UserInfo } from '../../api/userData/UserInfo';

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

/** Renders the Page for editing a single document. */
class EditTransportEntry extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      date: 0,
      miles: 0,
      error: '',
      redirectToReferer: false,
      selectedTransport: 'Telecommute',
      selectedVehicle: null,
      show: false,
    };
    this.handleTransportChange = this.handleTransportChange.bind(this);
    this.handleVehicleChange = this.handleVehicleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleTransportChange = (transport) => {
    if (transport === 'Car') {
      // eslint-disable-next-line no-console
      this.setState({
        selectedTransport: transport,
        show: true,
      }, () => console.log('Transport selected: ', (this.state.selectedTransport)));
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
    const userVehicles = _.where(UserVehicles.collection.find().fetch(), { owner: email });
    const userCar = userVehicles.filter(car => car._id === profile.carID)[0];
    if (vehicle === null) {
      this.setState({ selectedVehicle: userCar }, () => console.log('Vehicle selected: ', this.state.selectedVehicle));
    }
    this.setState({ selectedVehicle: vehicle }, () => console.log('Vehicle selected: ', this.state.selectedVehicle));
  }

  /** On successful submit, insert the data. */
  submit = (data) => {
    const { date, miles, _id } = data;
    const user = Meteor.user().username;
    const userVehicles = _.where(UserVehicles.collection.find().fetch(), { owner: user });
    const transport = this.state.selectedTransport;
    const vehicle = this.state.selectedVehicle;
    const mpg = getMPG(vehicle, userVehicles);
    console.log(this.props.doc.vehicle);

    UserTransportation.collection.update(_id, { $set: { date, transport, vehicle, miles, mpg } }, (error) => {
      if (error) {
        this.setState({ error: error.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/list-transport-entries' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const user = Meteor.user().username;
    const userVehicles = _.where(UserVehicles.collection.find().fetch(), { owner: user });

    const transportOptions = UserTransportationTypeEnum.Array.map((transport) => ({
      key: transport,
      label: transport,
      value: transport,
    }));

    const vehicleOptions = userVehicles.map((vehicle) => ({
      key: vehicle._id,
      label: vehicle.carName || `${vehicle.carYear} ${vehicle.carMake} ${vehicle.carModel}`,
      value: vehicle.carName || `${vehicle.carYear} ${vehicle.carMake} ${vehicle.carModel}`,
      mpg: vehicle.carMPG,
      vehicle: vehicle,
    }));

    const bridge = new SimpleSchema2Bridge(formSchema);

    return (
        <Grid id='page-style' container centered style={{ marginTop: '50px' }}>
          <Grid.Column>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <Header style={{ color: '#2292b3' }} textAlign='center' as='h3'>Edit
                  Transport Entry</Header>
                <DateField id='date'
                           name='date'
                           max={new Date()}
                           min={new Date(2017, 1, 1)}
                />
                <SelectField
                    id='transport'
                    name='transport'
                    type='string'
                    options={transportOptions}
                    value={this.state.selectedTransport}
                    onChange={this.handleTransportChange}
                    showInlineError={true}
                    placeholer='Select transport'
                />
                {this.state.show && (
                    <SelectField id='vehicle'
                                 name='vehicle'
                                 options={vehicleOptions}
                                 value={this.state.selectedVehicle}
                                 onChange={this.handleVehicleChange}
                                 placeholder='Select vehicle'
                                 showInlineError={true}
                    />
                )}
                <NumField id='miles' name='miles' showInlineError={true} decimal={false}/>
                <ErrorsField/>
                <SubmitField value='Update Entry'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditTransportEntry.propTypes = {
  doc: PropTypes.object,
  userTransportation: PropTypes.array,
  location: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const EditTransportEntryContainer = withTracker(({ match }) => {
  const documentId = match.params._id;
  const sub1 = Meteor.subscribe(UserInfo.userPublicationName);
  const sub2 = Meteor.subscribe(UserTransportation.userPublicationName);
  const sub3 = Meteor.subscribe(UserVehicles.userPublicationName);
  return {
    doc: UserTransportation.collection.findOne(documentId),
    userTransportation: UserTransportation.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(EditTransportEntry);

export default withRouter(EditTransportEntryContainer);
