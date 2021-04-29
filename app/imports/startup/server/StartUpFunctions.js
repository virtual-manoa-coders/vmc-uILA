import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';
import { UserInfo } from '../../api/userData/UserInfo';
import {
  coinFilp,
  getRandomInt,
  getRandomTimeInRange,
  getRandomTransportType,
  UserTransportationTypeEnum,
} from '../../api/userData/UserTransportation-Utilities';
import { UserTransportation } from '../../api/userData/UserTransportation';

/** Add a car to the UserVehicle */
function addCar({ carName, carMake, carModel, carYear, carMPG, carPrice, owner }) {
  console.log(` Defining car: ${carYear} ${carMake} ${carModel}`);
  UserVehicles.collection.insert({ carName, carMake, carModel, carYear, carMPG, carPrice, owner });
}

/** Add default vehicles from settings.development.json */
export function addDefaultCar() {
  if (UserVehicles.collection.find().count() === 0) {
    if (Meteor.settings.defaultCars) {
      console.log('Creating default cars');
      Meteor.settings.defaultCars.map(car => addCar(car));
    } else {
      console.log('Cannot initialize the database. Please invoke meteor with a settings file.');
    }
  }
}

/** Add default cars to UserVehicles from default JSON file */
export function addJSONCars(defaultCarsArray) {
  if (UserVehicles.collection.find().count() === 0) {
    if (defaultCarsArray) {
      console.log('Creating default cars');
      defaultCarsArray.map(car => addCar(car));
    } else {
      console.log('Cannot initialize the database. Unable to find parameter: defaultCarsArray');
    }
  }
}

/** Add profiles to UserInfo from settings.development.json */
// carMake, carModel, year, mpg isn't really needed, but is left here due to legacy code
function addProfile({ name, email, image, carModel, carYear, CO2Reduced, VMTReduced, fuelSaved }) {
  const createdAt = new Date();
  const userCar = UserVehicles.findOne({
    $and: [
      { carYear: carYear },
      { carModel: carModel },
    ] }, { sort: { carYear: -1 } });
  const carID = userCar._id;
  if (userCar) {
    console.log(` Defining UserProfile document: ${email} with car: ${userCar.carYear} ${userCar.carModel} carID: ${carID}`);
    UserInfo.collection.insert({ name, email, image, carID, CO2Reduced, VMTReduced, fuelSaved, createdAt });
  } else {
    console.log(` Unable to define ${email}, can't find car: ${userCar.carYear} ${userCar.carModel}`);
  }
}

/** Initialize the the default UserInfo from settings.development and private/data.json */
export function addDefaultProfiles() {
  if ((Meteor.settings.loadAssetsFile) && UserInfo.collection.find().count() === 0) {
    if (Meteor.settings.defaultProfiles) {
      console.log('Creating default Profiles.');
      Meteor.settings.defaultProfiles.map(data => addProfile(data));
    }
    const fileName = 'data.json';
    console.log(`Loading data from private/${fileName}`);
    const jsonData = JSON.parse(Assets.getText(fileName));
    jsonData.profiles.map(profile => addProfile(profile));
  }
}

/* This assumes that the profiles are added to Meteor Users collection first in Account.jsx */
/** Add default profiles to UserInfo from default JSON file */
export function addJSONProfile(accountArrays) {
  if (UserInfo.collection.find().count() === 0) {
    console.log('Creating default Profiles.');
    accountArrays.forEach(profile => {
      // admin doesn't have profile data
      if (profile.role !== 'admin') {
        addProfile(profile);
      }
    });
  }
}

/** Add a transport logs to UserTransportation */
function addTransport({ transport, date, miles, mpg, username }) {
  const userID = UserInfo.findMeteorID(username);
  const dateObject = new Date(date);
  console.log(`Adding ${miles} miles of ${transport} on ${dateObject.toString()} to user ${username} userID: ${userID}`);
  UserTransportation.define({ transport, date: dateObject, miles, mpg, userID });
}

/** Load transport from default JSON file */
export function addJsonTransport(transportArray) {
  if (UserTransportation.count() === 0) {
    transportArray.forEach(transport => {
      addTransport(transport);
    });
  }
}

/**
 * Add a transport with random miles within a random time range
 * @param startDate earliest possible time
 * @param endDate latest possible time
 * @param leastMiles smallest number of miles
 * @param maxMiles largest number of miles
 * @param userID user's id
 * @param mpg car miles per gallon
 * @param forceCar boolean, will make the type be Car if true
 */
function addRandomTransport(startDate, endDate, leastMiles, maxMiles, userID, mpg, forceCar) {
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

/**
 * Add an arbitrary number of transport logs to a user
 * @param iterations
 * @param userID
 * @param startTime
 * @param endTime
 */
function userTransportGeneraton(iterations, userID, startTime, endTime) {
  for (let i = 0; i < iterations; i++) {
    addRandomTransport(startTime, endTime, 1, 30, userID, 23, coinFilp()); // TODO: use the user car's mpg
  }
}

/** Add the seed transport log to the current 10 users, with random time and miles traveled */
export function addDefaultTransport() {
  if (UserTransportation.count() === 0) {
    // TODO: take mpg from user's car, the first one they have is probably fine
    console.log('Active users:');
    UserInfo.getActive(10).forEach(user => {
      userTransportGeneraton(10, UserInfo.findMeteorID(user.email), moment().subtract(1, 'months').toDate(), new Date());
      console.log(`Adding 10 random transport this month to user: ${user.name} id: ${user.userID}`);
    });
    console.log(`current transportation log count: ${UserTransportation.count()}`);
  }
}
