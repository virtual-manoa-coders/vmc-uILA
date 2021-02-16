import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { UserTransportation } from '../../api/userData/UserTransportation';
import { UserInformation } from '../../api/userData/UserInformation';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(UserTransportation.userPublicationName, function () {
  if (this.userId) {
    return UserTransportation.collection.find({ userID: this.userId });
  }
  return this.ready();
});

// community-level publication.
// If logged in, then publish documents with user id redacted. Otherwise publish nothing.
// TODO: Only publish Dates, Miles, and MPG, nothing else
Meteor.publish(UserTransportation.communityPublicationName, function () {
  if (this.userId) {
    return UserTransportation.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(UserTransportation.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return UserTransportation.collection.find();
  }
  return this.ready();
});

// User Information

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(UserInformation.userPublicationName, function () {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username; I'm too scared to remove this, is here for now
    return UserInformation.collection.find({ userID: this.userId });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(UserInformation.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return UserInformation.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
