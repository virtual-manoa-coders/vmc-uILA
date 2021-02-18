import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** This collection contains the user's vehicle data */
class UserInfoCollection {
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
      carMake: { type: String, optional: true },
      carModel: { type: String, optional: true },
      year: { type: String, optional: true, allowedValues: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008',
          '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'] },
      mpg: Number,
      ghgReduced: Number,
      vmtReduced: Number,
      fuelSaved: Number,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.communityPublicationName = `${this.name}.publication.community`;
  }
}

export const UserInfo = new UserInfoCollection();
