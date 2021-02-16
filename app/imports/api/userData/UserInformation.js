import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class UserInformationCollection {
  constructor() {
    // The name of this collection.
    this.name = 'UserInformationCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      userID: String,
      //legalName: String,
      informationEntered: Boolean,
      carMake: { type: String, optional: true },
      carModel: { type: String, optional: true },
      savedMilesPerGallon: { type: Number, optional: true },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const UserInformation = new UserInformationCollection();
