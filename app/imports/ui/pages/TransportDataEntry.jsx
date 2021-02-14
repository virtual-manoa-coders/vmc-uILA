import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, DateField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { UserTransportation } from '../../api/userTransportation/UserTransportation';

/*
TODO:
- Add a milage input through map feature
- Add a calendar feature
- After you're done, take you back to dasboard or community
 */

/** Create a schema to specify the structure of the data to appear in the form. */
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

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { date, transport, miles } = data;
    const ownerID = Meteor.user()._id;
    UserTransportation.collection.insert({
          transport,
          date,
          miles,
          ownerID,
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

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
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
}

export default TransportDataEntry;
