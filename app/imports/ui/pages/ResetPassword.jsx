import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import json from '../../../.meteor/local/build/programs/server/packages/montiapm_agent';

export default class ResetPassword extends React.Component {

    /** Initialize component state with properties for login and redirection. */
    constructor(props) {
        super(props);
        this.state = { email: '', error: '', redirectToReferer: false };
    }

    /** Update the form controls each time the user interacts with them. */
    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    /** Handle Email submission using Accounts mechanism. */
    submit = () => {
        const checkEmail = Meteor.users.findOne({ 'emails.0.address': json.email });
        if (checkEmail) {
            const email = json.email;
            const userId = checkEmail._id;
            Accounts.sendResetPasswordEmail(userId, email);
        } else {
            console.log('error');
        }
    }

    /** Render the Reset Password form. */
    render() {
        return (
            <Container id="reset-page">
                <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
                    <Grid.Column>
                        <Header as="h2" textAlign="center" >
                            Enter your email to reset your password
                        </Header>
                        <Form onSubmit={this.submit}>
                            <Segment stacked>
                                <Form.Input
                                    label="Email"
                                    id="reset-form-email"
                                    icon="user"
                                    iconPosition="left"
                                    name="email"
                                    type="email"
                                    placeholder="E-mail address"
                                    onChange={this.handleChange}
                                />
                                <Form.Button id="reset-form-submit" content="Submit"/>
                            </Segment>
                        </Form>
                        {this.state.error === '' ? (
                            ''
                        ) : (
                            <Message
                                error
                                header="Login was not successful"
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
