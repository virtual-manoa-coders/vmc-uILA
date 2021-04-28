import React from 'react';
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
    const sub1 = Meteor.subscribe(UserTransportation.adminPublicationName);
    const sub2 = Meteor.subscribe(UserInfo.adminPublicationName);

    return {
        currentUser: Meteor.user() ? Meteor.user().username : '',
        entries: UserTransportation.collection.find({ userID: props.selectedUserId }, { sort: { date: -1 } }).fetch(),
        ready: sub1.ready() && sub2.ready(),
    };
})(UserHistory);

export default withRouter(UserHistoryContainer);
