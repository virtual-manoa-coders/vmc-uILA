import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class AllUserVehiclesCollection {
  constructor() {
    // Name of collection
    this.name = 'AllUserVehiclesCollection';
    // Sets the name of the Mongo Collection
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      /**
       * Car Database:
       * Car Make, Model, MPG, Price, Subsidiary
       */
      // List of all of the car make (Dropdown for model will depend on selection of make)
      userID: String,
      carName: String,
      carMake: String,
      carModel: String,
      carYear: String,
      carMPG: Number,
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const AllUserVehicles = new AllUserVehiclesCollection();
