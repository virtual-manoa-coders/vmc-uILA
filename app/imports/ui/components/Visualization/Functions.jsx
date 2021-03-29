import { Meteor } from 'meteor/meteor';

const GHGperGallon = 19.59;

/*
 * Litte note on making a standalone function:
 * - Export all functions (Even the internal ones)
 * - Don't use this.function()
 * - Var name can't be the same as the another function in the file
 *
 */

/**
 * Calculate the fuel saved
 * @param milesSaved The miles saved from not using a car
 * @param milesPerGallon The car's miles per gallon
 * @returns {number} Fuel saved by gallon
 */
export const fuelSaved = (milesSaved, milesPerGallon) => {
  return milesSaved / milesPerGallon;
};

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
export const userTransportDataFilter = (data) => {
  return data.filter(doc => doc.userID === Meteor.userId());
};

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
      result[existingIndex].fuelSaved = result[existingIndex].fuelSaved + doc.fuelSaved;
    } else { // if the item isn't in the result list, just push it to the list
      result.push(doc);
    }
  });

  return result;
};

export const CO2CalculationTimespan = (data, timeStart, timeEnd, type) => {
  const timeNow = timeEnd || Date.now();
  const afterDateAndCar = data.filter(doc => doc.date > timeStart && doc.date < timeNow && doc.transport !== 'Car');
  if (afterDateAndCar.length === 0) {
    return 0;
  }
  let result = 0;
  if (type === 'average') {
    const fuelSavedVar = calculateFuelSavedForAllUsers(afterDateAndCar);
    const aggregateFuelSaved = aggregateIndividualFuelSaved(fuelSavedVar);
    const combinedFuelSaved = aggregateFuelSaved.map(doc => doc.fuelSaved).reduce((accumulator, currentValue) => accumulator + currentValue);
    const averageFuelSaved = combinedFuelSaved / aggregateFuelSaved.length;
    const averageCO2Reduced = (averageFuelSaved * GHGperGallon).toFixed(2);

    result = averageCO2Reduced;
  } else if (type === 'user') {
    const userData = userTransportDataFilter(afterDateAndCar);
    if (userData.length === 0) {
      return 0;
    }
    result = userCO2Aggregate(userData);
  }
  return result;
};
