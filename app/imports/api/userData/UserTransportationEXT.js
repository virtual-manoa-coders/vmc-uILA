import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import BaseCollection from '../base/BaseCollection';

/**
 * This is a partial BaseCollection implementation of the transport collection
 */
class UserTransportationCollectionEXT extends BaseCollection {
  constructor() {
    super('Projects', new SimpleSchema({
      transport: {
        type: String,
        allowedValues: ['Telecommute', 'Walk', 'Bike', 'Carpool', 'Bus', 'Car'],
      },
      date: Date,
      miles: Number,
      mpg: Number,
      userID: String,
    }));
  }
}
