import { Meteor } from 'meteor/meteor';
// import { _ } from 'meteor/underscore';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { UserInfo } from '../../api/userData/UserInfo';
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
if (UserInfo.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default Profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
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

if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 3)) {
  Meteor.users.find().fetch().forEach(user => console.log(user));
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
}

// if there's no transport log
  // get the 7 or less accounts id on start up
  // add 7 transport log for each user
  // two this week, three between this month and last two months, two between this week to last 3 months
if (UserTransportation.count() === 0) {
  console.log(`current transportation log count: ${UserTransportation.count()}`);

  console.log('Currently active users:');
  UserInfo.getActive().forEach(user => console.log(`user: ${user.name} id: ${user.userID}`));
}
