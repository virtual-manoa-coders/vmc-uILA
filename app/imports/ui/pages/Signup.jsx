import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { UserInfo } from '../../api/userData/UserInfo';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';

function addProfile({ name, email, image, carModel, carYear }) {
  const createdAt = new Date();
  const carID = this.props.userVehicles.filter(car => car.carMake === carModel && car.carYear === carYear)[0]._id;
  console.log(carID);
  if (carID) {
    console.log(` Defining profile: ${email} with car: ${carYear} ${carModel} carID: ${carID}`);
    UserInfo.collection.insert({ name: name, email: email, image: image, carID: carID, createdAt: createdAt });
  } else {
    console.log(` Unable to define ${email} with car ${carYear} ${carModel}`);
  }
}
/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', confirmPassword: '', carMake: '', carYear: '', error: '', errorConfirm: false, redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }
  /*
  TODO:
  - Create the  UserData Database
  - Add code that creates new user data every time a new user sign up
  - Add code that checks if a user is already created
   */

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, confirmPassword, carMake, carYear } = this.state;
    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match, try again' });
    } else {
      Accounts.createUser({ email: email, username: email, password: password }, (err) => {
        if (err) {
          this.setState({ error: err.reason });
          console.log(err.reason);
        } else {
          this.setState({ error: '', redirectToReferer: true });
          // add the UserDatabase code here
          // console.log('Adding user to userInformation');
          // const userID = Accounts.userId();
          // const informationEntered = false;
          // console.log(userID);
          // console.log(UserInformation.collection.insert({
          //   userID,
          //   informationEntered,
          // }));

          addProfile({ name: 'CHANGE PLOX', email: email, carMake: carMake, carYear: carYear });
        }
      });
    }
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Container id="signup-page">
          <Grid id='page-style' textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Register your account
              </Header>
              <Form onSubmit={this.submit}>
                <Segment stacked>
                  <Form.Input
                      label="Email"
                      id="signup-form-email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Password"
                      id="signup-form-password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Confirm Password"
                      id="signup-form-confirmPassword"
                      icon="lock"
                      iconPosition="left"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <Form.Select
                      id="signup-form-carMake"
                      fluid
                      label='Car Make'
                      name='carMake'
                      options={UserVehicles.cmAllowedValues.map(function (currentValue, index) {
                          return { key: index, text: currentValue, value: currentValue };
                        })
                      }
                      placeholder='Car Make'
                      onChange={this.handleChange}
                  />
                  <Form.Select
                      id="signup-form-carYear"
                      fluid
                      label='Car Year'
                      name='carYear'
                      options={UserVehicles.cyAllowedValues.map(function (currentValue, index) {
                        return { key: index, text: currentValue, value: currentValue };
                      })
                    }
                    placeholder='Car Year'
                    onChange={this.handleChange}
                  />
                  <Form.Button id="signup-form-submit" content="Submit"/>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Signup.propTypes = {
  location: PropTypes.object,
  userVehicles: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to UserInfo documents.
  const sub3 = Meteor.subscribe(UserVehicles.userPublicationName);
  return {
    userVehicles: UserVehicles.collection.find({}).fetch(),
    ready: sub3.ready(),
  };
})(Signup);
