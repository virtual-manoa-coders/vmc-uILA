import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { UserTransportationTypeEnum } from './UserInfo-Utilities';

/** This collection contains the user's transportation usage */
class UserTransportationCollection {
  /* TODO:
   * - Extends from BaseCollection
   * - restrict this.collection into this._collection
   * - write new methods that replace this.collection usage
   * - Find usage of UserTransportationCollection.collection in other files and use the new methods
   * - Make a enum file for the allowed values
   * Not urgent:
   * - add validation in get, set, etc methods
   */
  constructor() {
    // The name of this collection.
    this.name = 'UserTransportationCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      transport: {
        type: String,
        allowedValues: UserTransportationTypeEnum.Array,
      },
      date: Date,
      miles: Number,
      mpg: Number,
      userID: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    // TODO: might have to write publication method for different types of publication if needed
    // Can make a get funciton for the collection name, then use that with publish method
    this.communityPublicationName = `${this.name}.publication.community`;
  }

  define({ transport, date, miles, mpg, userID }) {
    return this.collection.insert({ transport, date, miles, mpg, userID });
  }

  update(id, { transport, date, miles, mpg }) {
    const entry = this.entryDoesExist(id);

    if (!entry) {
      throw new Meteor.Error('No such record exists');
    } else {
      return this.collection.update({ _id: id }, { $set: { transport, date, miles, mpg } });
    }
  }

  remove(id) {
    const entry = this.entryDoesExist(id);

    if (!entry) {
      throw new Meteor.Error('No such record exists');
    } else {
      return this.collection.remove({ _id: id });
    }
  }

  entryDoesExist(id) {
    return this.collection.findOne({ _id: id });
  }

  publish() {
    if (Meteor.isServer) {
      Meteor.publish(this.communityPublicationName, () => this.collection.find());
    }
  }

  subscribe(name) {
    if (Meteor.isClient) {
      Meteor.subscribe(name || this.communityPublicationName);
    }
  }

  /**
   * Returns the number of documents in this collection. NOTE: better place in parent class
   * @returns { Number } The number of elements in this collection.
   */
  count() {
    return this.collection.find()
        .count();
  }

  /**
   * Returns a string representing all of the documents in this collection.
   * @returns {String}
   */
  toString() {
    return this.collection.find()
        .fetch();
  }

}

export const UserTransportation = new UserTransportationCollection();
