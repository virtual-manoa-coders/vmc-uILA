import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */

if (Meteor.users.find().count() === 0) {
  const fileName = 'defaultData.json';
  const jsonData = JSON.parse(Assets.getText(fileName));
  if (!Meteor.settings.useDeprecatedDefaultData) {
    console.log(`Creating the default user(s) from ${fileName}`);
    jsonData.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
  } else if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s) from meteor.settings.development');
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
