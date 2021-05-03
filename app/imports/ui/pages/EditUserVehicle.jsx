import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  NumField,
  SelectField,
  SubmitField, TextField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';

/** Create a schema to specify the structure of the data to appear in the logging form. */
const formSchema = new SimpleSchema({
  carName: { type: String, label: 'Name your car', optional: true },
  carMake: { type: String, optional: true,
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
    ] },
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

/** Renders the Page for editing a single document. */
class EditUserVehicle extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      carName: '',
      carMake: '',
      carModel: '',
      carYear: 0,
      carMPG: 0,
      carPrice: 0,
      redirectToReferer: false,
    };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { carName, carMake, carModel, carYear, carMPG, carPrice, _id } = data;
    UserVehicles.collection.update(_id, { $set: { carName, carMake, carModel, carYear, carMPG, carPrice } }, (error) => {
      if (error) {
        this.setState({ error: error.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/list-user-vehicles' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid id='page-style' container centered>
          <Grid.Column>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <Header style={{ color: '#2292b3' }} textAlign='center' as='h3'>Edit Vehicle</Header>
                <TextField id='carName' name='carName' showInlineError={true} placeholder='Name your car'/>
                <SelectField id='carMake' name='carMake' showInlineError={true} placeholder='Car make'/>
                <TextField id='carModel' name='carModel' showInlineError={true} placeholder='Car model'/>
                <SelectField id='carYear' name='carYear' showInlineError={true} placeholder='Car year'/>
                <NumField id='carMPG' name='carMPG' showInlineError={true} placeholder='Average miles per gallon'/>
                <NumField id='carPrice' name='carPrice' showInlineError={true} placeholder='Car Price'/>
                <SubmitField value='Update Vehicle'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditUserVehicle.propTypes = {
  doc: PropTypes.object,
  userVehicles: PropTypes.array,
  location: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(UserVehicles.userPublicationName);
  return {
    doc: UserVehicles.collection.findOne(documentId),
    userVehicles: UserVehicles.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(EditUserVehicle);
