import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class UserInfoVehiclesCollection {
  constructor() {
    // Name of collection
    this.name = 'UserInfoVehiclesCollection';
    // Sets the name of the Mongo Collection
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      user: String,
      vehicles: String,
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const UserInfoVehicles = new UserInfoVehiclesCollection();
