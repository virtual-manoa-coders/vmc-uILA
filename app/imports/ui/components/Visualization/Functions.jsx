import { Meteor } from 'meteor/meteor';
import { UserTransportationTypeEnum } from '../../../api/userData/UserTransportation-Utilities';
import { adminFindMeteorID } from '../../../startup/both/Methods';

/*
 * A little note on making a standalone function:
 * - Export all functions (Even the internal ones)
 * - Don't use this.function()
 * - Var name can't be the same as the another function in the file
 */

export const GHGperGallon = 19.59;
export const gasPrice = 3.57;

/**
 * Calculate the fuel saved
 * @param milesSaved The miles saved from not using a car
 * @param milesPerGallon The car's miles per gallon
 * @returns {number} Fuel saved by gallon
 */
export const fuelSaved = (milesSaved, milesPerGallon) => milesSaved / milesPerGallon;

/**
 * Calculate the CO2 saved for one user
 * @param data The fetched userTransport collection; i.e. data = this.props.userTransportation
 * @returns {number} A number of pounds of CO2 reduced
 */
export const userCO2Aggregate = (data) => {
  const fuelSavedVar = data.map(doc => fuelSaved(doc.miles, doc.mpg));
  const fuelSavedSum = fuelSavedVar.reduce((acc, curr) => acc + curr);
  const CO2Reduced = (fuelSavedSum * GHGperGallon).toFixed(2);
  return CO2Reduced;
};

/**
 * Calculate fuelsaved and add it to each document and this should be good for both one user and all users
 * @param data An array of user transportation log objects
 * @returns An array of user transportation log for the currently logged in user
 */
export const userTransportDataFilter = (data) =>
  // TODO: This uses UserInfo id, no meteor id
  // Perhaps add meteoruserid to transport
    // eslint-disable-next-line implicit-arrow-linebreak
  data.filter(doc => doc.userID === Meteor.userId());

/**
 * Calculate fuelsaved and add it to each document and this should be good for both one user and all users
 * @param data An array of user transportation log objects
 * @returns An array of user transportation log that has an attribute fuelSaved
 */
export const calculateFuelSavedForAllUsers = (data) => {
  const fuelSavedVar = data.map(doc => ({
    ...doc,
    fuelSaved: fuelSaved(doc.miles, doc.mpg),
  }));
  return fuelSavedVar;
};

/**
 * This combine individual user's fuelsaved over timespan. Code inspired by: https://stackoverflow.com/a/33850667
 * @param data Array of objects with the timespan and fuelsaved already calculated
 * @returns a list of each user's total fuelsaved
 */
export const aggregateIndividualFuelSaved = (data) => {
  const result = [];

  data.forEach(function (doc) {
    const existing = result.filter(function (v) {
      return v.userID === doc.userID;
    });

    if (existing.length) { // if the item is already in the result
      const existingIndex = result.indexOf(existing[0]);
      // eslint-disable-next-line operator-assignment
      result[existingIndex].fuelSaved = result[existingIndex].fuelSaved + doc.fuelSaved;
    } else { // if the item isn't in the result list, just push it to the list
      result.push(doc);
    }
  });

  return result;
};

export const CO2CalculationTypeEnum = {
  average: 'average',
  user: 'user',
};

/**
 * Calculate the number of CO2 reduced either from one user or the averaged of the community
 * @param data {UserTransportation[]} fetched userTransport collection; i.e. data = this.props.userTransportation
 * @param timeStart {Date} earliest time of the time range
 * @param timeEnd {Date} latest time of the time range
 * @param type {UserTransportationTypeEnum} types are: user (for one user) or average (the community average)
 * @returns {number} pounds of CO2 reduced
 */
export const CO2CalculationTimespan = (data, timeStart, timeEnd, type) => {
  const timeNow = timeEnd || Date.now();
  const afterDateAndCar = data.filter(doc => doc.date > timeStart && doc.date < timeNow &&
      doc.transport !== UserTransportationTypeEnum.Car);
  if (afterDateAndCar.length === 0) {
    return 0;
  }
  let result = 0;
  if (type === CO2CalculationTypeEnum.average) {
    const fuelSavedVar = calculateFuelSavedForAllUsers(afterDateAndCar);
    const aggregateFuelSaved = aggregateIndividualFuelSaved(fuelSavedVar);
    const combinedFuelSaved = aggregateFuelSaved.map(doc => doc.fuelSaved).reduce((accumulator, currentValue) => accumulator + currentValue);
    const averageFuelSaved = combinedFuelSaved / aggregateFuelSaved.length;
    const averageCO2Reduced = (averageFuelSaved * GHGperGallon).toFixed(2);

    result = averageCO2Reduced;
  } else if (type === CO2CalculationTypeEnum.user) {
    const userData = userTransportDataFilter(afterDateAndCar);
    if (userData.length === 0) {
      return 0;
    }
    result = userCO2Aggregate(userData);
  }
  return result;
};

/**
 * Filter out a transport type within a time range
 * @param data {UserTransportation[]} raw data from UserTransportation
 * @param exclude {string []} array of transportation types
 * @param timeStart {Date} earliest time in the time range
 * @param timeEnd {Date} latest time in the time range
 * @returns {*} an array of filtered data
 */
export const FilterOutTransportType = (data, exclude, timeStart, timeEnd) => {
  const timeNow = timeEnd || Date.now();
  const start = timeStart || 0;
  const afterDate = data.filter(doc => doc.date > start && doc.date < timeNow);
  if (afterDate.length === 0) {
    return afterDate;
  }
  let array = data;
  exclude.forEach(transportType => {
    array = array.filter(doc => doc.transport !== transportType);
  });
  return array;
};

/**
 * Returned the GHG produced after removing telecommute, walk, bike, carpool, and bus. Other transport method will be
 * used in the calculation.
 * @param data {UserTransportation[]} raw data from UserTransportation.
 * @param timeStart {Date} earliest time in the time range.
 * @param timeEnd {Date} latest time in the time range.
 * @param type {UserTransportationTypeEnum} types are: user (for one user) or average (the community average)
 * @returns {number} GHG produced in that time span
 */
export const GHGProduced = (data, timeStart, timeEnd, type) => {
  const timeNow = timeEnd || Date.now();
  const start = timeStart || 0;
  const afterDateJustCar = FilterOutTransportType(data, [
    UserTransportationTypeEnum.Telecommute,
    UserTransportationTypeEnum.Walk,
    UserTransportationTypeEnum.Bike,
    UserTransportationTypeEnum.Carpool,
    UserTransportationTypeEnum.Bus,
  ], start, timeNow);
  if (afterDateJustCar.length === 0) {
    return 0;
  }

  let result = 0;
  if (type === CO2CalculationTypeEnum.average) {
    const fuelSavedVar = calculateFuelSavedForAllUsers(afterDateJustCar);
    const aggregateFuelSaved = aggregateIndividualFuelSaved(fuelSavedVar);
    const combinedFuelSaved = aggregateFuelSaved.map(doc => doc.fuelSaved).reduce((accumulator, currentValue) => accumulator + currentValue);
    const averageFuelSaved = combinedFuelSaved / aggregateFuelSaved.length;
    const averageCO2Reduced = (averageFuelSaved * GHGperGallon).toFixed(2);

    result = averageCO2Reduced;
  } else if (type === CO2CalculationTypeEnum.user) {
    const userData = userTransportDataFilter(afterDateJustCar);
    if (userData.length === 0) {
      return 0;
    }
    result = userCO2Aggregate(userData);
  }
  return result;
};

/**
 *
 * @param data raw data from UserTransportation
 * @param timeSpan earliest time range
 * @param type transportation type
 * @returns {number} money saved from not using a car in dollars
 */
export const moneySavedCalculator = (data, timeSpan, type) => {
  let result;
  const afterDateAndCar = data.filter(doc => doc.date > timeSpan && doc.transport !== UserTransportationTypeEnum.Car);
  if (afterDateAndCar.length === 0) {
    return 0;
  }
  const fuelSavedVar = calculateFuelSavedForAllUsers(afterDateAndCar);
  const aggregateFuelSaved = aggregateIndividualFuelSaved(fuelSavedVar);
  if (type === CO2CalculationTypeEnum.user) {
    const userData = userTransportDataFilter(aggregateFuelSaved);
    if (userData.length === 0) {
      return 0;
    }
    result = userData[0].fuelSaved;
  } else if (type === CO2CalculationTypeEnum.average) {
    const combinedFuelSaved = aggregateFuelSaved.map(doc => doc.fuelSaved).reduce((accumulator, currentValue) => accumulator + currentValue);
    const averageFuelSaved = combinedFuelSaved / aggregateFuelSaved.length;
    result = averageFuelSaved;
  }

  return (result * gasPrice).toFixed(2);
};

/**
 * Returns the user's performance vs the community in percent
 * @param data raw data from UserTransportation
 * @param timeStart earliest time range
 * @param timeEnd latest time range
 * @returns {number} the percentage of how well the user is doing vs community
 */
export const getUserCO2Percent = (data, timeStart, timeEnd) => {
  const afterDateAndCar = FilterOutTransportType(data, [UserTransportationTypeEnum.Car], timeStart, timeEnd);
  if (afterDateAndCar.length === 0) {
    return 0;
  }

  const fuelSavedVar = calculateFuelSavedForAllUsers(afterDateAndCar);
  const aggregateFuelSaved = aggregateIndividualFuelSaved(fuelSavedVar);

  aggregateFuelSaved.sort((a, b) => {
    const keyA = a.fuelSaved;
    const keyB = b.fuelSaved;
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });

  const index = aggregateFuelSaved.findIndex(doc => doc.userID === Meteor.userId()) + 1;
  const percent = (index / aggregateFuelSaved.length) * 100;
  return percent % 100;
};

/**
 * Calculate the number of times of travel one user took from the point of profile creation
 * @param timeSpan Only select data from today to the timespan
 * @param data The methods of transportation to retrieve
 * @returns {number[]} A 6-element array of # of mode of transport
 */
export const travelPatternsFunction = (data, timeSpan) => {
  const afterDateAndCar = data.filter(doc => doc.date > timeSpan);
  if (afterDateAndCar.length === 0) {
    return [0];
  }
  const transportMethod = afterDateAndCar.map(doc => doc.transport);
  const dataArray = [0, 0, 0, 0, 0, 0]; // We can only use an array for the Pie component. don't change
  transportMethod.forEach(doc => {
    switch (doc) {
      case 'Telecommute':
        dataArray[0] += 1;
        break;
      case 'Walk':
        dataArray[1] += 1;
        break;
      case 'Bike':
        dataArray[2] += 1;
        break;
      case 'Carpool':
        dataArray[3] += 1;
        break;
      case 'Bus':
        dataArray[4] += 1;
        break;
      case 'Car':
        dataArray[5] += 1;
        break;
      default:
        console.log('Error: Unexpected transport type');
        break;
    }
  });
  return dataArray;
};

/**
 * Clone an array by value. WARNING: Any JS object will turn into string representations; very computationally expensive!
 */
export const cloneArray = (array) => JSON.parse(JSON.stringify(array));

/**
 * Asks the server for the user's Meteor ID, and perform operations using callback.
 * This is asyncronus, so always use the userId in the callback.
 * @param userEmail is the target user's email (is actually the DB's username key on the server-side).
 * @param callback function to be called when the userID is returned from server.
 * @returns user's Meteor ID, but async. undefined if can't find user. Warning: use only with await mode or async functions.
 */
export const getMeteorId = (userEmail, callback) => {
  Meteor.call(adminFindMeteorID, { email: userEmail }, (err, res) => {
    if (err) {
      console.log('Error: ', err.message);
    } else {
      callback(res);
      return res;
    }
    return undefined;
  });
};
