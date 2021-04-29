import { Meteor } from 'meteor/meteor';
import { UserInfo } from '../../api/userData/UserInfo';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';
import { UserTransportation } from '../../api/userData/UserTransportation';
import { UserTransportationTypeEnum } from '../../api/userData/UserTransportation-Utilities';

const adminFindMeteorID = 'UserInfo.adminFindMeteorID';
const adminGrabAllVehicles = 'UserVehicles.adminGrabAllVehicles';

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
  'UserVehicles.adminGrabAllVehicles'() {
    let vehicles = null;
    if (Meteor.isServer) {
      UserVehicles.checkIsAdmin(this.userId);
      vehicles = UserVehicles.collection.find({}).fetch();
    }

    return vehicles;
  },
});

const UserInfoMethods = {
  getDashboardStatistics: 'UserInfo.getDashboardStatistics',
};

Meteor.methods({
  'UserInfo.getDashboardStatistics'() {
    let stats = null;

    if (Meteor.isServer && this.userId) {
      const { CO2Reduced, VMTReduced, fuelSaved } = UserInfo.findDoc(this.userId);
      stats = {
        CO2Reduced: CO2Reduced,
        VMTReduced: VMTReduced,
        fuelSaved: fuelSaved,
        telecommuteDays: UserTransportation.getTransportDayCount(this.userId, UserTransportationTypeEnum.Telecommute),
        bikeDays: UserTransportation.getTransportDayCount(this.userId, UserTransportationTypeEnum.Bike),
      };
    }

    return stats;
  },
});

export { adminFindMeteorID, adminGrabAllVehicles, UserInfoMethods };
