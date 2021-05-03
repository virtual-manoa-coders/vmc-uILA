import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
// eslint-disable-next-line no-unused-vars
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

class UserVehiclesCollection {
  constructor() {
    // Name of collection
    this.name = 'UserVehiclesCollection';
    // Sets the name of the Mongo Collection
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
    /**
     * Car Database:
     * Car Make, Model, MPG, Price, Subsidiary
     */
    // List of all of the car make (Dropdown for model will depend on selection of make)
    carName: { type: String, optional: true },
    carMake: {
      type: String,
      allowedValues: this.cmAllowedValues,
      // If no car model is chosen, the default parameter
      defaultValue: '...',
    },
      carModel: { type: String, optional: true },
      carYear: { type: String, optional: true, allowedValues: this.cyAllowedValues },
      // Car miles per gallon
      carMPG: Number,
      // Price of car
      carPrice: Number,
      owner: { type: String, optional: true },
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.cmAllowedValues = ['...',
            'Acura',
            'Alfa Romeo',
            'Audi',
            'BMW',
            'Bentley',
            'Buick',
            'Cadillac',
            'Chevrolet',
            'Chrysler',
            'Dodge',
            'Fiat',
            'Ford',
            'GMC',
            'Genesis',
            'Honda',
            'Hyundai',
            'Infiniti',
            'Jaguar',
            'Jeep',
            'Kia',
            'Land Rover',
            'Lexus',
            'Lincoln',
            'Lotus',
            'Maserati',
            'Mazda',
            'Mercedes-Benz',
            'Mercury',
            'Mini',
            'Mitsubishi',
            'Nikola',
            'Nissan',
            'Polestar',
            'Pontiac',
            'Porsche',
            'Ram',
            'Rivian',
            'Rolls-Royce',
            'Saab',
            'Saturn',
            'Scion',
            'Smart',
            'Suzuki',
            'Tesla',
            'Toyota',
            'Volkswagen',
            'Volvo',
    ];
    this.cyAllowedValues = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008',
        '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];
  }

  /**
   * Runs findOne on this collection.
   * @see {@link http://docs.meteor.com/#/full/findOne|Meteor Docs on Mongo Find}
   * @param { Object } selector A MongoDB selector.
   * @param { Object } options MongoDB options.
   * @returns {Mongo.Cursor}
   */
  findOne(selector, options) {
    const theSelector = (typeof selector === 'undefined') ? {} : selector;
    return this.collection.findOne(theSelector, options);
  }

  /**
   * Returns a string representing all of the documents in this collection.
   * @returns {String}
   */
  toString() {
    return this.collection.find({})
        .fetch();
  }

  /**
   * Internal helper function to simplify definition of the assertValidRoleForMethod method.
   * @param userId The userID.
   * @param roles An array of roles.
   * @throws { Meteor.Error } If userId is not defined or user is not in the specified roles.
   * @returns True if no error is thrown.
   * @ignore
   */
  checkIsAdmin(userId) {
      if (!userId) {
          throw new Meteor.Error('unauthorized', 'You must be logged in.', '', Error().stack);
      } else if (!Roles.userIsInRole(userId, ['admin'])) {
          throw new Meteor.Error('unauthorized', `You must be one of the following roles: ${['admin']}`, '', Error().stack);
      }
      return true;
    }

  carMakeToIndex(carMake) {
    return this.cmAllowedValues.findIndex(make => make === carMake);
  }

  carYearToIndex(carYear) {
    return this.cyAllowedValues.findIndex(year => year === carYear);
  }
}

export const UserVehicles = new UserVehiclesCollection();
