import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
// eslint-disable-next-line no-unused-vars
import { Tracker } from 'meteor/tracker';

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
    carMake: {
      type: String,
      allowedValues: this.cmAllowedValues,
      // If no car model is chosen, the default parameter
      defaultValue: '...',
    },
      carModel: String,
      carYear: { type: String, optional: true, allowedValues: this.cyAllowedValues },
      // Car miles per gallon
      carMPG: Number,
      // Price of car
      carPrice: Number,
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
}

export const UserVehicles = new UserVehiclesCollection();
