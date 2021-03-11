import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** This collection contains the user's transportation usage */
class UserTransportationCollection {
  constructor() {
    // The name of this collection.
    this.name = 'UserTransportationCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      transport: {
        type: String,
        allowedValues: ['Telecommute', 'Walk', 'Bike', 'Carpool', 'Bus', 'Car'],
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
    this.communityPublicationName = `${this.name}.publication.community`;
  }

  define({ transport, date, miles, mpg, userID }) {
    return this._collection.insert({ transport, date, miles, mpg, userID });
  }

  update(id, { transport, date, miles, mpg }) {
    const entry = this.entryDoesExist(id);

    if (!entry) {
      throw new Meteor.Error('No such record exists');
    } else {
      return this._collection.update({ _id: id }, { $set: { transport, date, miles, mpg } });
    }
  }

  remove(id) {
    const entry = this.entryDoesExist(id);

    if (!entry) {
      throw new Meteor.Error('No such record exists');
    } else {
      return this._collection.remove({ _id: id });
    }
  }

  entryDoesExist(id) {
    return this._collection.findOne({ _id: id });
  }

  publish() {
    Meteor.publish(this.communityPublicationName, () => this.collection.find());
  }

  subscribe(name) {
    if (Meteor.isClient) {
      Meteor.subscribe(name || this.communityPublicationName);
    }
  }
}

export const UserTransportation = new UserTransportationCollection();
