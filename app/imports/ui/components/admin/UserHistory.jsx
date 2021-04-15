import React from 'react';
import { Grid, Card, Button, Input, Table } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserInfo } from '../../../api/userData/UserInfo';
import ListTransportEntry from '../ListTransportEntry';
import { UserTransportation } from '../../../api/userData/UserTransportation';

/** A simple static component to render some text for the landing page. */
class UserHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null,
            sortColumn: {
                name: 'createdAt',
                isDescending: true,
            },
        };
        console.log(this.props.userList);

        this.handleRowSelection = this.handleRowSelection.bind(this);
    }

    // componentDidUpdate(prevProps) {
    //     console.log(this.props, prevProps)
    //
    //     if (prevProps.ready != this.props.ready) {
    //         initUserEntries
    //     }
    // }

    deleteUser(user) {
        UserInfo.collection.remove({ _id: user._id });
    }

    sort(name) {
        const sortColumn = {
            name: name,
            isDescending: this.state.sortColumn.name !== name ? true : !this.state.sortColumn.isDescending,
        };
        console.log(this.state.sortColumn, name, this.state.sortColumn.name);
        console.log(this.state.sortColumn.name !== name ? true : !this.state.sortColumn.isDescending);

        this.setState({ sortColumn });
    }

    handleRowSelection(index) {
        let selectedIndex = index;

        // Deselect the row if it is clicked again
        if (selectedIndex === this.state.selectedIndex) {
            selectedIndex = null;
        }

        this.setState({ selectedIndex });
    }

    render() {
        return (
            this.props.entries.map((entry) => (
                    <ListTransportEntry key={entry._id}
                                        entry={entry} admin
                                        UserTransportation={UserTransportation} />
                ))
        );
    }
}

UserHistory.propTypes = {
    currentUser: PropTypes.string,
    entries: PropTypes.array.isRequired,
};

const UserHistoryContainer = withTracker((props) => {
    console.log(props, props.user.email);
    const sub1 = Meteor.subscribe(UserTransportation.adminPublicationName);
    const sub2 = Meteor.subscribe(UserInfo.adminPublicationName);
    console.log(Meteor.users.find({}).fetch(), Meteor.users.findOne({ username: props.user.email.trim() }));
    // console.log(UserInfo.findMeteorID('user1@foo.com'));

    return {
        currentUser: Meteor.user() ? Meteor.user().username : '',
        entries: UserTransportation.collection.find({ userID: UserInfo.findMeteorID(props.user.email) }, { sort: { date: -1 } }).fetch(),
        ready: sub1.ready() && sub2.ready(),
    };
})(UserHistory);

export default withRouter(UserHistoryContainer);
