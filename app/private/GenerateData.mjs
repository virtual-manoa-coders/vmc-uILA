import moment from 'moment';

import * as fs from 'fs';

console.log('== Running GenerateData.js UwU ==');

/* Constants Here */
const credentials = {
  password: 'changeme',
  image: ' https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
};

// Due to limitations of non ES6, this is has the be the exact same as defined in UserTransportationCollection.jsx
const UserTransportationTypeEnum = {
  Telecommute: 'Telecommute',
  Walk: 'Walk',
  Bike: 'Bike',
  Carpool: 'Carpool',
  Bus: 'Bus',
  Car: 'Car',
  Array: ['Telecommute', 'Walk', 'Bike', 'Carpool', 'Bus', 'Car'],
};

const defaultCars = [
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2012', carMPG: 28, carPrice: 13000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2018', carMPG: 36, carPrice: 20000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2013', carMPG: 31, carPrice: 11000 },
  { carMake: 'Honda', carModel: 'Fit', carYear: '2014', carMPG: 29, carPrice: 12000 },
];

/* This JSON will be modified and wrote into a file */
const outputJson = {
  defaultAccounts: [
    { email: 'admin@foo.com', password: credentials.password, role: 'admin' },
  ],
  defaultCars: defaultCars,
  defaultTransport: [],
};

/**
 * Return random Date within the date
 * @param start Date object
 * @param end Date object
 */
const getRandomTimeInRange = (start, end) => new Date(start.valueOf() + Math.random() *
    (end.valueOf() - start.valueOf()));

// function to pick random array element out of array
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Function to generate random number
function randomInt(min, max) {
  return parseInt((Math.random() * (max - min) + min), 10);
}

function momentToDate(momentObject) {
  return moment(momentObject.toDate()).subtract(10, 'hours').toDate();
}

// function to add user
function addUser(JSONArray, name) {
  const car = randomElement(defaultCars);
  JSONArray.push({
    name: name,
    email: `${name}@foo.com`,
    password: credentials.password,
    image: credentials.image,
    carMake: car.carMake,
    carModel: car.carModel,
    carYear: car.carYear,
    carMPG: car.carMPG,
    CO2Reduced: randomInt(900, 2000),
    VMTReduced: randomInt(3000, 4000),
    fuelSaved: randomInt(80, 140),
  });
}

// function to generate 20 users
function userGeneration(iterations) {
  for (let i = 0; i < iterations; i++) {
    addUser(outputJson.defaultAccounts, `user${i + 1}`);
  }
}

// function to generate a log
function addTransport(JSONArray, date, leastMiles, maxMiles, username, mpg, forceCar) {
  // TODO: Make this pulls from UserTransportation-Utilities.jsx, make babel run in cli somehow
  const transportType = forceCar ? UserTransportationTypeEnum.Car : randomElement(UserTransportationTypeEnum.Array);
  JSONArray.push({
    transport: transportType,
    date: date.valueOf(),
    miles: randomInt(leastMiles, maxMiles),
    mpg: mpg,
    username: username,
  });
}

// function to generate 5 logs in weekdays
  // have to make sure this doesn't exceed the current day
  // do: add transport to moment().endOf(current week).days(5,4,3,2,1)
function generateTransportsForWeek(currentDate, user) {
  let now = moment(currentDate).add(0, 'day').endOf('day');
  let day;
  if (now.day() === 0) {
    now = now.subtract(1, 'week').endOf('week');
    day = 5;
  } else if (now.day() === 6) {
    day = 5;
  } else {
    day = now.day();
  }

  for (let i = day; i > 0; i--) {
    // date and moment uses different timezones, I'm so sorry for this monstrosity
    const nowAdjusted = moment(now.day(i).toDate()).subtract(10, 'hours');
    addTransport(outputJson.defaultTransport, nowAdjusted.toDate(), 5, 20,
        user.email, user.carMPG);
  }
}

function generateExtraTransport(currentDate, user) {
  const now = moment(currentDate);
  const monthStart = momentToDate(now.startOf('month'));
  const monthEnd = momentToDate(now.endOf('month'));
  for (let i = 0; i < 2; i++) {
    addTransport(outputJson.defaultTransport, getRandomTimeInRange(monthStart, monthEnd), 3, 40,
        user.email, user.carMPG);
  }
}

// function to do this every week for 3 months
  // do this week
  // subtract one week from moment
  // do this for 12 weeks (3 months)
function generateTransport(user) {
  const now = moment();
  for (let i = 12; i >= 1; i--) {
    generateTransportsForWeek(now.toDate(), user);
    now.subtract(1, 'week');
  }
  const lenow = moment();
  for (let i = 3; i >= 1; i--) {
    generateExtraTransport(lenow.toDate(), user);
    lenow.subtract(1, 'month');
  }
}

/* Actual WorkFlow */
const JSONSettings = {
  userCount: 20,
  filename: 'defaultData.json',
};
console.log(`Creating ${JSONSettings.userCount} user(s)`);
userGeneration(JSONSettings.userCount);

outputJson.defaultAccounts.forEach(user => {
  if (user.role !== 'admin') {
    generateTransport(user);
  }
});

console.log(`Number of default accounts: ${outputJson.defaultAccounts.length} (including admin)`);
console.log(`Number of default transports: ${outputJson.defaultTransport.length}`);

fs.writeFileSync(`./private/${JSONSettings.filename}`, JSON.stringify(outputJson));
console.log(`File wrote to: ./private/${JSONSettings.filename}`);

console.log('End of data generation');
