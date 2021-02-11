import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { UserTransportation} from '../../api/userTransportation/UserTransportation';

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
  day: String,
  miles: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class TransportDataEntry extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { transport, day, miles } = data;
    const owner = Meteor.user().username;
    UserTransportation.collection.insert({ transport, day, miles, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
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
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <SelectField name='transport'/>
                <TextField name='day'/>
                <NumField name='miles' decimal={false}/>
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
