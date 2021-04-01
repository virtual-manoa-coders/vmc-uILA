import React from 'react';
import { Redirect } from 'react-router-dom';
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
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { UserTransportation } from '../../api/userData/UserTransportation';

/** Create a schema to specify the structure of the data to appear in the logging form. */
const formSchema = new SimpleSchema({
  transport: {
    type: String,
    allowedValues: ['Telecommute', 'Walk', 'Bike', 'Carpool', 'Bus', 'Car'],
  },
  date: Date,
  miles: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for editing a single document. */
class EditTransportEntry extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      date: 0,
      transport: '',
      miles: 0,
      error: '',
      redirectToReferer: false,
    };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { date, transport, miles, _id } = data;
    UserTransportation.collection.update(_id, { $set: { date, transport, miles } }, (error) => {
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
    return (
        <Grid container centered>
          <Grid.Column>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <Header style={{ fontFamily: 'Comfortaa', color: '#2292b3' }} textAlign='center' as='h4'>Edit
                  Transport Entry</Header>
                <DateField id='date'
                           name='date'
                           max={new Date()}
                           min={new Date(2017, 1, 1)}
                />
                <SelectField id='transport' name='transport' showInlineError={true}/>
                <NumField id='miles' name='miles' showInlineError={true} decimal={false}/>
                <SubmitField value='Update Entry'/>
                <ErrorsField/>
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
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(UserTransportation.userPublicationName);
  return {
    doc: UserTransportation.collection.findOne(documentId),
    userTransportation: UserTransportation.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(EditTransportEntry);
