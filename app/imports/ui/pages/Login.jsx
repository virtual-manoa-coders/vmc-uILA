import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/** A simple static component to render some text for the Login page. */
class Login extends React.Component {
    render() {
        return (

            <div className='Login Page'>
                <Grid container stackable centered columns={2}>

                    <Grid.Column textAlign='left center'>
                        <h1 className='header' inverted>Sign Up to begin tracking your emissions or Log In if you&apos;re a returning user </h1>
                    </Grid.Column>
                    <Grid.Column textAlign='right center'>
                        <Button.Group className ='login'>
                            <Button class="massive ui white button" as={NavLink} exact to="/signup" >Sign Up</Button>
                            <Button.Or size={'massive'}/>
                            <Button class="massive ui white button" as={NavLink} exact to="/signin" >Log In</Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

Login.propTypes = {
    currentUser: PropTypes.string,
};

const LoginContainer = withTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Login);

export default withRouter(LoginContainer);
