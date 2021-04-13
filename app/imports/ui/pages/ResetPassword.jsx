import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { Link, Redirect } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

/**
 * ResetPassword page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class ResetPassword extends React.Component {

    /** Initialize component state with properties for login and redirection. */
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', redirectToReferer: false };
    }

    /** Update the form controls each time the user interacts with them. */
    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    /** Handle ResetPassword submission using Meteor's account mechanism. */
    submit = () => {
        /*
        TODO:
           -add functionality to reset user password if need be
        */
    }

    /** Render the ResetPassword form. */
    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        // if correct authentication, redirect to page instead of login screen
        if (this.state.redirectToReferer) {
            return <Redirect to={from}/>;
        }
        // Otherwise return the Login form.
        return (
            <Container id="ResetPassword-page">
                <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
                    <Grid.Column>
                        <Header as="h2" textAlign="center" >
                            Reset your password
                        </Header>
                        <Form onSubmit={this.submit}>
                            <Segment stacked>
                                <Form.Input
                                    label="Enter your email"
                                    id="ResetPassword-form-email"
                                    icon="user"
                                    iconPosition="left"
                                    name="email"
                                    type="email"
                                    placeholder="E-mail address"
                                    onChange={this.handleChange}
                                />
                                <Form.Button id="ResetPassword-form-submit" content="Submit"/>
                            </Segment>
                        </Form>
                        {this.state.error === '' ? (
                            ''
                        ) : (
                            <Message
                                error
                                header="Reset was not successful"
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
ResetPassword.propTypes = {
    location: PropTypes.object,
};
