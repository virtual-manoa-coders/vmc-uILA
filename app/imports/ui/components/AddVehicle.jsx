import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';
import { UserInfoVehicles } from '../../api/userVehicles/UserInfoVehicles';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  carName: { type: String, label: 'Name your car', optional: true },
  carMake: {
    type: String, optional: true,
    allowedValues: [
      'Acura',
      'Alfa Romeo',
      'Audi',
      'BMW',
      'Bentley',
      'Buick',
      'Cadillac',
      'Chevrolet',
      'Chrysler',
      'Dodge',
      'Fiat',
      'Ford',
      'GMC',
      'Genesis',
      'Honda',
      'Hyundai',
      'Infiniti',
      'Jaguar',
      'Jeep',
      'Kia',
      'Land Rover',
      'Lexus',
      'Lincoln',
      'Lotus',
      'Maserati',
      'Mazda',
      'Mercedes-Benz',
      'Mercury',
      'Mini',
      'Mitsubishi',
      'Nikola',
      'Nissan',
      'Polestar',
      'Pontiac',
      'Porsche',
      'Ram',
      'Rivian',
      'Rolls-Royce',
      'Saab',
      'Saturn',
      'Scion',
      'Smart',
      'Suzuki',
      'Tesla',
      'Toyota',
      'Volkswagen',
      'Volvo',
    ],
  },
  carModel: { type: String, label: 'Car model', optional: true },
  carYear: {
    type: String,
    label: 'Car year',
    optional: true,
    allowedValues: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008',
      '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
  },
  carMPG: { type: Number, label: 'Car MPG' },
  carPrice: { type: Number, label: 'Price' },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddVehicle extends React.Component {
  /** On submit, insert the data. */
  submit(data, formRef) {
    const { carName, carMake, carModel, carYear, carMPG, carPrice } = data;
    const owner = Meteor.user().username;

    UserVehicles.collection.insert({ owner, carName, carMake, carModel, carYear, carMPG, carPrice },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Vehicle added successfully', 'success');
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
            <Header style={{ color: '#2292b3' }} textAlign='center' as='h3'>Add a Vehicle
            </Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField id='carName' name='carName' optional='true' showInlineError={true}
                           placeholder='Name your car'/>
                <Form.Group widths='equal'>
                  <SelectField id='carMake' name='carMake' showInlineError={true} placeholder='Car make'/>
                  <TextField id='carModel' name='carModel' showInlineError={true} placeholder='Car model'/>
                </Form.Group>
                <Form.Group widths='equal'>
                  <SelectField id='carYear' name='carYear' showInlineError={true} placeholder='Car year'/>
                  <NumField id='carMPG' name='carMPG' showInlineError={true} placeholder='Average miles per gallon'/>
                  <NumField id='carPrice' name='carPrice' showInlineError={true} placeholder='Car Price'/>
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

AddVehicle.propTypes = {
  UserInfoVehicles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub1 = Meteor.subscribe(UserVehicles.userPublicationName);
  const sub2 = Meteor.subscribe(UserInfoVehicles.userPublicationName);
  return {
    AllUserVehicles: UserInfoVehicles.collection.find({}).fetch,
    ready: sub1.ready() && sub2.ready(),
  };
})(AddVehicle);
