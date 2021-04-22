import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';

/**
 * This is a partial BaseCollection implementation of the transport collection
 */
// eslint-disable-next-line no-unused-vars
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
