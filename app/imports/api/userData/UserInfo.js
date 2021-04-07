import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

/** This collection contains the user's vehicle data */
class UserInfoCollection {
  /*
   * TODO:
   *  - not linked with built-in Meteor user accounts, add Meteor.userID()?
   */
  constructor() {
    // The name of this collection.
    this.name = 'UserInfoCollection';
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
        .fetch().map(user => {
          return {
            userID: user._id,
            name: user.name,
          };
        }).slice(0, max);
  }
}

export const UserInfo = new UserInfoCollection();
