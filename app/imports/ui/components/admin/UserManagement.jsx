import React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserInfo } from '../../../api/userData/UserInfo';

/** A simple static component to render some text for the landing page. */
class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        console.log(props);
    }

    deleteUser(user) {
        UserInfo.collection.remove({ _id: user._id });
    }

    render() {
        return (
            <Card className={'user-management'} fluid>
                <Card.Content>
                    <Grid>
                        <Grid.Row columns={'equal'}>
                            <Grid.Column>Name</Grid.Column>
                            <Grid.Column>Email</Grid.Column>
                            <Grid.Column>CO2 Reduced</Grid.Column>
                            <Grid.Column>VMT Reduced</Grid.Column>
                            <Grid.Column>Fuel Saved</Grid.Column>
                            <Grid.Column>Action</Grid.Column>
                        </Grid.Row>
                        {
                            this.props.userList.map((user, index) => (
                                <Grid.Row columns={'equal'} key={index}>
                                    <Grid.Column>
                                        {user.name}
                                    </Grid.Column>
                                    <Grid.Column>
                                        {user.email}
                                    </Grid.Column>
                                    <Grid.Column>
                                        {user.CO2Reduced}
                                    </Grid.Column>
                                    <Grid.Column>
                                        {user.VMTReduced}
                                    </Grid.Column>
                                    <Grid.Column>
                                        {user.fuelSaved}
                                    </Grid.Column>
                                    <Grid.Column onClick={() => this.deleteUser(user)}>
                                        x
                                    </Grid.Column>
                                </Grid.Row>
                            ))
                        }
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}

/** Declare the types of all properties. */
UserManagement.propTypes = {
    currentUser: PropTypes.string,
    userList: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const UserManagementContainer = withTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
}))(UserManagement);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(UserManagementContainer);
