import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { UserTransportationTypeEnum } from './UserTransportation-Utilities';

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
      mpg: { type: Number, optional: true },
      userID: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    // TODO: might have to write publication method for different types of publication if needed
    // Can make a get function for the collection name, then use that with publish method
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
   * @returns {String} representing all of the documents in this collection.
   */
  toString() {
    return this.collection.find()
        .fetch();
  }

  /**
   * Find the length of a transport array in terms of days total
   * @param {transportArray[]}
   * @returns {Number} Days of transport array
   * @private
   */
  _findDays(transportArray) {
    return transportArray.map(transport => transport.date)
        .map(date => date.toDateString()).filter((x, i, a) => a.indexOf(x) === i).length;
  }

  /**
   * Get the number of days a transport has been used in total for a user.
   * @param {MeteorUserId} meteorUserId
   * @param {String} transportType UserTransportationTypeEnum
   * @returns {Number} The number of days that a transport has been used
   */
  getTransportDayCount(meteorUserId, transportType) {
    const test = this.collection.find({ userID: meteorUserId }).fetch().filter(transport => transport.transport === transportType);
    return this._findDays(test);
  }
}

export const UserTransportation = new UserTransportationCollection();
