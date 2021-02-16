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
     * Car Database:
     * Car Make, Model, MPG, Price, Subsidiary
     */
    //List of all of the car make (Dropdown for model will depend on selection of make)
    carMake: {
      type: String,
      allowedValues: ['...',
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
          'Volvo'
      ],
      //If no car model is chosen, the default parameter
      defaultValue: '...',
    },
      //Car miles per gallon
      carMPG: Number,
      //Price of car
      carPrice: Number
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}