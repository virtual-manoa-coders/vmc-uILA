import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, DateField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserTransportation } from '../../api/userData/UserTransportation';
import { UserInformation } from '../../api/userData/UserInformation';

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
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class TransportDataEntry extends React.Component {

  /** On log your commute submit, insert the data into UserTransportation. */
  submit(data, formRef) {
    const { date, transport, miles } = data;
    const userID = Meteor.user()._id;
    UserTransportation.collection.insert({
          transport,
          date,
          miles,
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
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header style={{ fontFamily: 'Comfortaa' }} textAlign='center' as='h2' inverted>Log Your Commute</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <Form.Group>
                  <DateField name='date'
                             max={new Date(2100, 1, 1)}
                             min={new Date(2000, 1, 1)}
                  />
                  <SelectField name='transport'/>
                  <NumField name='miles' decimal={false}/>
                </Form.Group>
                <SubmitField value='Submit'/>
                <ErrorsField/>
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

/** Require an array of Stuff documents in the props. */
TransportDataEntry.propTypes = {
  userInformation: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(UserInformation.userPublicationName);
  return {
    userInformation: UserInformation.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(TransportDataEntry);
