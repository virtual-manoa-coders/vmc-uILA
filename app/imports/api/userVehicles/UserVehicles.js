import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class UserVehiclesCollection {
  constructor() {
    //Name of collection
    this.name = 'UserVehiclesCollection';
    //Sets the name of the Mongo Collection
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      /**
       * Should these all be separate databases, or should this all stay in one collection? Not
       * too sure if the focus was going to primarily be on cars for now. If it is, I will add the information
       * on the current collection of cars I found here today.
       * Base info: mpg, cost, fuel capacity, electronic equivalent.
       */
      //Define the car database

      //Define the bike database

      //Define the walk database

      //Define the carpool database

      //Define the bus database
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}