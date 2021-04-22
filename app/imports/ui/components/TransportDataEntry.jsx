import React from 'react';
import { Grid, Header, Loader, Segment, Button, Checkbox } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, DateField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserTransportation } from '../../api/userData/UserTransportation';
import { UserInfo } from '../../api/userData/UserInfo';
import { SavedTrip } from '../../api/userData/SavedTrip';

/*
TODO:
- Add page to enter basic info before letting you enter mileage
- After you're done, take you back to dashboard or community
 */

/** Create a schema to specify the structure of the data to appear in the logging form. */
const formSchema = new SimpleSchema({
  trips: {
    type: String,
    allowedValues: ['Work', 'School', 'Grandmas house'],
  },
  transport: {
    type: String,
    allowedValues: ['Telecommute', 'Walk', 'Bike', 'Carpool', 'Bus', 'Car'],
    defaultValue: 'Telecommute',
  },
  date: Date,
  miles: Number,
  saveTrip: Checkbox,
  nameTrip: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class TransportDataEntry extends React.Component {
  /** By default save name field should be disabled and not required */
  constructor(props) {
    super(props);
    this.state = { saveDisabled: true };
    this.state = { saveRequired: true };
    this.saveTrip = false;
  }

  /** When called, the nameTrip field gets enabled. */
  EnableName = (val, x) => {
    if (x.checked) {
      this.setState({ saveDisabled: false });
      this.setState({ saveRequired: true });
      this.saveTrip = true;
    } else {
        this.setState({ saveDisabled: true });
        this.setState({ saveRequired: false });
        this.saveTrip = false;
    }
  }

  /** On log your commute submit, insert the data into UserTransportation. Then, insert the miles for a saved trip to data if toggled */
  submit(data, formRef) {
    const { date, transport, miles, nameTrip } = data;
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
    if (this.saveTrip) { // If user checked "Save this trip for future use"
      SavedTrip.collection.insert({
            nameTrip,
            miles,
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

  }

  transportationLog() {
    let fRef = null;
    return (
        <Grid centered>
          <Grid.Column>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
              <Header style={{ color: '#2292b3' }} textAlign='center' as='h3'>Log a Trip</Header>
                <SelectField required={false} name='trips' label='Saved Trips'/>
                <DateField name='date'
                           max={new Date()}
                           min={new Date(2017, 1, 1)}
                />
                <SelectField name='transport'/>
                <NumField name='miles' decimal={false}/>
                <Checkbox required={false} name='saveTrip' onClick={this.EnableName} label ='Save this trip for future use'/>
                <TextField required={this.state.saveRequired} disabled={this.state.saveDisabled} name='nameTrip' label='Name trip'/>
                <ErrorsField/>
                <SubmitField value='Submit'/>
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
  carMPG: PropTypes.number.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to userInfo documents.
  const subscription = Meteor.subscribe(UserInfo.userPublicationName);
  return {
    userInfo: UserInfo.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(TransportDataEntry);
