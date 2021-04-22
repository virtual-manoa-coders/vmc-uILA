import { Meteor } from 'meteor/meteor';
import { UserInfo } from '../../api/userData/UserInfo';

const adminFindMeteorID = 'UserInfo.adminFindMeteorID';

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  'UserInfo.adminFindMeteorID'({ email }) {
    let userID;

    if (Meteor.isServer) {
      UserInfo.assertValidRoleForMethod(this.userId);
      userID = UserInfo.findMeteorID(email);
    }

    return userID;
  },
});

export { adminFindMeteorID };
