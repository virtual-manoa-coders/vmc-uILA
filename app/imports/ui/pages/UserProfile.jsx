import React from 'react';
import { Card, Header, Loader, Image, Grid, Segment, Form, Tab } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import moment from 'moment';
import { UserInfo } from '../../api/userData/UserInfo';
import { UserTransportation } from '../../api/userData/UserTransportation';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';
import TravelPatterns from '../components/Visualization/TravelPatterns';
import TransportDataEntry from '../components/TransportDataEntry';
import ListUserVehicles from '../components/ListUserVehicles';
import ListTransportEntries from '../components/ListTransportEntries';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: { type: String, label: 'Name', optional: true },
  image: { type: String, label: 'Profile picture', optional: true },
  carMake: { type: String, label: 'Car make', optional: true },
  carModel: { type: String, label: 'Car model', optional: true },
  carYear: {
    type: String,
    optional: true,
    allowedValues: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008',
      '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
  },
  carMPG: { type: Number, label: 'Average miles per gallon', optional: true },
});

/*
TODO:
-add the function to calculate what modes of transportation the user has taken
 */
/** Renders the Profile page */
class UserProfile extends React.Component {
  /** create a startDate variable to display data from one year out */
  constructor(props) {
    super(props);
    this.state = { startDate: moment().subtract(1, 'years').toDate() };
  }

  /** On submit, insert the data. */
  submit(data) {
    const { carID, name, image, carMake, carModel, carYear, carMPG } = data;
    UserInfo.collection.update(carID, { $set: { name, image } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully.');
      }
    });
    UserVehicles.collection.update(carID, { $set: { carMake, carModel, carYear, carMPG } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully.', 'success');
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const pageStyle = { marginTop: '10px' };
    const email = Meteor.user().username;
    const bridge = new SimpleSchema2Bridge(formSchema);
    const profile = UserInfo.collection.findOne({ email });
    // operate under assumption that the car exists, error otherwise (WIP)
    const userCar = this.props.userVehicles.filter(car => car._id === profile.carID)[0];

    const panes = [
      {
        menuItem: 'Log a Trip',
        render: () => <Tab.Pane attached={false}>
              <TransportDataEntry carMPG={userCar.carMPG} userTransportation={this.props.userTransportation}/>
        </Tab.Pane>,
      },
      {
        menuItem: 'View/Edit Trips',
        render: () => <Tab.Pane attached={false}>
          <ListTransportEntries/>
        </Tab.Pane>,
      },
      {
        menuItem: 'Edit Basic Info',
        render: () => <Tab.Pane attached={false}>
          <AutoForm model={profile} schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Header style={{ color: '#2292b3' }} textAlign='center' as='h3'>Edit Your Information</Header>
              <Form.Group widths='equal'>
                <TextField id='name' name='name' showInlineError={true} placeholder={'Your name'}/>
                <TextField id='image' name='image' showInlineError={true} placeholder={'Image URL'}/>
              </Form.Group>
              <SubmitField id='update-profile' value='Update Profile'/>
            </Segment>
          </AutoForm>
        </Tab.Pane>,
      },
      {
        menuItem: 'View/Edit Vehicles',
        render: () => <Tab.Pane attached={false}>
          <ListUserVehicles
              style={{ topMargin: '0' }}/>
        </Tab.Pane>,
      },
    ];
    return (
        <Grid id='page-style' container stackable centered verticalAlign='middle' style={pageStyle}>
          <Header style={{ fontFamily: 'Merriweather', fontSize: '2.0em' }} as="h2" textAlign="center"
                  inverted>Aloha, {profile.name} </Header>
          <Grid.Row columns={2}>
            <Grid.Column verticalAlign='middle' width={5}>
              <Card fluid>
                <Card.Content>
                  <Image src={profile.image}
                         size='small'/>
                  <Card.Meta style={{ fontSize: '0.65em' }}>
                    <br/>
                    Email: {email}
                  </Card.Meta>
                  <Card.Description className='profile-card'>
                    CO2 reduced: {profile.CO2Reduced} pounds
                    <br/>
                    VMT
                    reduced: {profile.VMTReduced} miles
                    <br/>
                    Fuel saved: {profile.fuelSaved} gallons
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width={11}>
              <Card fluid>
                <Card.Content>
                  <TravelPatterns userTransportation={this.props.userTransportation} timeSpan={this.state.startDate}/>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
                <Tab style={{ overflow: 'auto', height: 600 }} menu={{ secondary: true, pointing: true }} panes={panes} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require an array of userProfile documents in the props. */
UserProfile.propTypes = {
  profile: PropTypes.array,
  userTransportation: PropTypes.array.isRequired,
  userVehicles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to UserInfo documents.
  const sub1 = Meteor.subscribe(UserInfo.userPublicationName);
  const sub2 = Meteor.subscribe(UserTransportation.userPublicationName);
  const sub3 = Meteor.subscribe(UserVehicles.userPublicationName);
  return {
    userVehicles: UserVehicles.collection.find({}).fetch(),
    userTransportation: UserTransportation.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(UserProfile);
