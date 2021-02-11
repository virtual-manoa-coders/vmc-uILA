import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
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
        defaultValue: 'Telecommute',
      },
      month: {
        type: String,
        allowedValues: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'],
      },
      day: {
        type: String,
        allowedValues: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',
          '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      },
      year: {
        type: String,
        allowedValues: ['2021', '2022', '2023', '2024', '2025'],
      },
      miles: Number,
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const UserTransportation = new UserTransportationCollection();
