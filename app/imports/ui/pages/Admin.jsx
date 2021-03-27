import React from 'react';
import { Grid, Button, Icon, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** A simple static component to render some text for the landing page. */
class Admin extends React.Component {
    render() {
        return (
            <Container>
                <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
                    <Grid.Row>
                        Welcome Administrator {this.props.currentUser} <br/>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid columns={'equal'} style={{ width: '100%' }}>
                            <Grid.Column>
                                <Button inverted fluid size={'massive'}>Manage Users</Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Button inverted fluid size={'massive'}>Manage Vehicles</Button>
                            </Grid.Column>
                        </Grid>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

/** Declare the types of all properties. */
Admin.propTypes = {
    currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const LandingContainer = withTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Admin);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(LandingContainer);
