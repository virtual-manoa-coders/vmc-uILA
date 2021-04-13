import { Meteor } from 'meteor/meteor';
// import { _ } from 'meteor/underscore';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { UserInfo } from '../../api/userData/UserInfo';
import { UserVehicles } from '../../api/userVehicles/UserVehicles';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// carMake, carModel, year, mpg isn't really needed, but is left here due to legacy code
// eslint-disable-next-line no-unused-vars
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

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
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
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    if (UserVehicles.find().count() !== 0) {
      console.log('Creating default profiles');
      Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
    }
    console.log('Error: Unable to find cars');
  } else {
    console.log('Cannot initialize the database. Please invoke meteor with a settings file.');
  }
}

if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 7)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
}
