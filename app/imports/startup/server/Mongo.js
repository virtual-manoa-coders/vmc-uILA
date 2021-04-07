import { Meteor } from 'meteor/meteor';
// import { _ } from 'meteor/underscore';
import moment from 'moment';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { UserInfo } from '../../api/userData/UserInfo';
import {
  getRandomTimeInRange,
  getRandomTransportType,
  getRandomInt, UserTransportationTypeEnum, coinFilp,
} from '../../api/userData/UserInfo-Utilities';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';
import { UserTransportation } from '../../api/userData/UserTransportation';

/* eslint-disable no-console */


// carMake, carModel, year, mpg isn't really needed, but is left here due to legacy code
function addProfile({ name, email, image, carMake, carModel, carYear, carMPG, CO2Reduced, VMTReduced, fuelSaved }) {
  const createdAt = new Date();
  const carID = UserVehicles.collection.find().fetch().filter(car => car.carModel === carModel && car.carYear === carYear)[0]._id;
  console.log(carID);
  if (carID) {
    console.log(` Defining profile: ${email} with car: ${carYear} ${carModel} carID: ${carID}`);
    UserInfo.collection.insert({ name, email, image, carID, CO2Reduced, VMTReduced, fuelSaved, createdAt });
  } else {
    console.log(` Unable to define ${email} with car ${carYear} ${carModel}`);
  }
}

function addTransport(startDate, endDate, leastMiles, maxMiles, userID, mpg, forceCar) {
  const transportType = forceCar ? UserTransportationTypeEnum.Car : getRandomTransportType();

  const transportLog = {
    transport: transportType,
    date: getRandomTimeInRange(startDate, endDate),
    miles: getRandomInt(leastMiles, maxMiles),
    mpg: mpg,
    userID: userID,
  };
  UserTransportation.define(transportLog);
}

function userTransportGeneraton(iterations, userID, startTime, endTime) {
  for (let i = 0; i < iterations; i++) {
    addTransport(startTime, endTime, 1, 30, userID, 23, coinFilp()); // TODO: user user car's mpg
  }
};

function addCar({ carName, carMake, carModel, carYear, carMPG, carPrice }) {
  console.log(` Defining car: ${carModel}`);
  UserVehicles.collection.insert({ carName, carMake, carModel, carYear, carMPG, carPrice });
  // console.log(UserVehicles.collection.find().fetch());
}

if (UserVehicles.collection.find().count() === 0) {
  if (Meteor.settings.defaultCars) {
    console.log('Creating default cars');
    Meteor.settings.defaultCars.map(car => addCar(car));
  } else {
    console.log('Cannot initialize the database. Please invoke meteor with a settings file.');
  }
}

/** Initialize the collection if empty. */
if ((Meteor.settings.loadAssetsFile) && UserInfo.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default Profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
}

/** Initialize the DB if empty (no users defined.) */
// if (Meteor.users.find().count() === 0) {
//   if (Meteor.settings.defaultProfiles) {
//     if (UserVehicles.find().count() !== 0) {
//       console.log('Creating default profiles');
//       Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
//     }
//     console.log('Error: Unable to find cars');
//   } else {
//     console.log('Cannot initialize the database. Please invoke meteor with a settings file.');
//   }
// }

// if there's no transport log
  // get the 7 or less accounts id on start up
  // add 7 transport log for each user
  // two this week, three between this month and last two months, two between this week to last 3 months
// TODO: take mpg from user's car, the first one they have is probably fine
if (UserTransportation.count() === 0) {
  console.log('Active users:');
  UserInfo.getActive(10).forEach(user => {
    userTransportGeneraton(10, UserInfo.findMeteorID(user.email), moment().subtract(1, 'months').toDate(), new Date());
    console.log(`Adding 10 random transport this month to user: ${user.name} id: ${user.userID}`);
  });
  console.log(`current transportation log count: ${UserTransportation.count()}`);
}
