import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Roles } from 'meteor/alanning:roles';

/** This collection contains the user's vehicle data */
class UserInfoCollection {
  /*
   * TODO:
   *  - not linked with built-in Meteor user accounts, add Meteor.userID()?
   */
  constructor() {
    // The name of this collection.
    this.name = 'UserInfoCollection';
    // Type of data stored in the collection
    this._type = 'User Information';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: { type: String, optional: true },
      email: { type: String, index: true },
      image: { type: String, optional: true },
      carID: String,
      CO2Reduced: Number,
      VMTReduced: Number,
      fuelSaved: Number,
      createdAt: Date(),
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.communityPublicationName = `${this.name}.publication.community`;
  }

  /**
   * Return array of currently active user IDs.
   * Server-side only.
   */
  getActive(max) {
    if (!Meteor.isServer) {
      console.log('getActive() is not running on the server');
      return undefined;
    }
    return this.collection.find()
        .fetch().map(user => ({
            userID: user._id,
            name: user.name,
            email: user.email,
          })).slice(0, max);
  }

  /**
   * Internal helper function to simplify definition of the assertValidRoleForMethod method.
   * @param userId The userID.
   * @param roles An array of roles.
   * @throws { Meteor.Error } If userId is not defined or user is not in the specified roles.
   * @returns True if no error is thrown.
   * @ignore
   */
  _assertRole(userId, roles) {
    if (!userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in.', '', Error().stack);
    } else if (!Roles.userIsInRole(userId, roles)) {
      throw new Meteor.Error('unauthorized', `You must be one of the following roles: ${roles}`, '', Error().stack);
    }
    return true;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or Advisor.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or Advisor.
   */
  assertValidRoleForMethod(userId) {
    this._assertRole(userId, ['admin']);
  }

  /**
   * Find the user's Meteor Id using their email
   * Server-side only!
   * @param email UserInfo's email
   * @returns String The user's Meteor id
   * @throws { Meteor.Error } If the document cannot be found.
   */
  findMeteorID(email) {
    if (Meteor.isClient) {
      throw new Error('Calling findMeteorID in Client');
    }

    const doc = Meteor.users.findOne({ username: email });
    if (!doc) {
      if (typeof email !== 'string') {
        throw new Meteor.Error(`Email: '${JSON.stringify(email)}' isn't a string`, '', Error().stack);
      } else {
        throw new Meteor.Error(`${email} is undefined; can't be found in the database`, '', Error().stack);
      }
    }
    return doc._id;
  }

  /**
   * Find the user's UserInfo using their Meteor Id
   * Server-side only!
   * @param email UserInfo's email
   * @returns String The user's Meteor id
   * @throws { Meteor.Error } If the document cannot be found.
   */
  findUserInfoWithMeteorId(userId) {
    if (Meteor.isClient) {
      throw new Error('Calling findMeteorID in Client');
    }

    const userEmail = Meteor.users.findOne({ _id: userId }).username;
    const doc = this.collection.findOne({ email: userEmail });
    if (!doc) {
      if (typeof email !== 'string') {
        throw new Meteor.Error(`Email: '${JSON.stringify(userId)}' isn't a string`, '', Error().stack);
      } else {
        throw new Meteor.Error(`${userId} is undefined; can't be found in the database`, '', Error().stack);
      }
    }
    return doc._id;
  }

  /**
   * A stricter form of findOne, in that it throws an exception if the entity isn't found in the collection.
   * @param { String | Object } name Either the UserInfo's docID, user's Meteor.user() Id, or an object selector, or the 'name' field value.
   * Note: can use both MeteorId or UserInfoId.
   * @returns { Object } The document associated with name.
   * @throws { Meteor.Error } If the document cannot be found.
   */
  findDoc(name) {
    const doc = (
        this.collection.findOne(name)
        || this.collection.findOne({ name })
        || this.collection.findOne({ _id: name })
        || this.collection.findOne({ username: name })
        || this.collection.findOne({ _id: this.findUserInfoWithMeteorId(name) }));
    if (!doc) {
      if (typeof name !== 'string') {
        throw new Meteor.Error(`${JSON.stringify(name)} is not a defined ${this._type}`, '', Error().stack);
      } else {
        throw new Meteor.Error(`${name} is not a defined ${this._type}`, '', Error().stack);
      }
    }
    return doc;
  }
}

export const UserInfo = new UserInfoCollection();
