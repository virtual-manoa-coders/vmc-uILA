import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, FormInput, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { UserInfo } from '../../api/userData/UserInfo';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', confirmPassword: '', error: '', errorConfirm: false, redirectToReferer: false };
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
    const { email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match, try again' });
    } else {
      Accounts.createUser({ email, username: email, password }, (err) => {
        if (err) {
          this.setState({ error: err.reason });
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
          UserInfo.collection.insert({ email });
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
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
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
                      id="signup-form-password"
                      icon="lock"
                      iconPosition="left"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <FormInput
                      id="form-input-control-first-name"
                      label="First Name"
                      placeholder="First Name"
                    />
                    <FormInput
                        id="form-input-control-last-name"
                        label="Last Name"
                        placeholder="Last Name"
                      />
                    <FormInput
                        id="form-input-control-dob"
                        label="Date of Birth"
                        icon="birthday"
                        iconPosition="left"
                        placeholder="MM/DD/YYYY"
                      />
                      <FormInput
                          id="form-input-control-Address"
                          label="Street Address"
                          icon="address card"
                          iconPosition="left"
                          placeholder="1234 Street Address"
                        />
                        <FormInput
                            id="form-input-control-state"
                            label="State"
                            icon="info"
                            iconPosition="left"
                            placeholder="State"
                          />
                          <FormInput
                              id="form-input-control-city"
                              label="City"
                              placeholder="City"
                            />
                            <FormInput
                                id="form-input-control-zip"
                                label="Zip Code"
                                placeholder="12345-1234"
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

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
