import { Meteor } from 'meteor/meteor';
import * as fs from 'fs';
import * as Functions from './StartUpFunctions';

/* eslint-disable no-console */

/* Main Workflow */
if (Meteor.settings.useJSONDefaultData) {
  const fileName = 'defaultData.json';
  const path = `/private/${fileName}`;
  // const rawData = fs.readFileSync(`${path}`, 'utf8'); // can't find path :c
  // console.log(rawData);
  const jsonData = JSON.parse(Assets.getText(fileName));

  console.log(`Loading data from ${path}`);
  Functions.addJSONCars(jsonData.defaultCars);
  Functions.addJSONProfile(jsonData.defaultAccounts);
  Functions.addJsonTransport(jsonData.defaultTransport);
} else {
  console.log('Generating data using built-in methonds and settings.development.json');
  Functions.addDefaultCar();
  Functions.addDefaultProfiles();
  Functions.addDefaultTransport();
}

/** Initialize the DB if empty (no users defined.) Kinda redundant? */
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


