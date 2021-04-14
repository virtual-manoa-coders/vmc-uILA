/**
 * The enumeration object for user transportation types
 * @type {{Walk: string, Array: string[], Bus: string, Carpool: string, Car: string, Bike: string, Telecommute: string}}
 */
export const UserTransportationTypeEnum = {
  Telecommute: 'Telecommute',
  Walk: 'Walk',
  Bike: 'Bike',
  Carpool: 'Carpool',
  Bus: 'Bus',
  Car: 'Car',
  Array: ['Telecommute', 'Walk', 'Bike', 'Carpool', 'Bus', 'Car'],
};

/**
 * @returns a dynamically created array of the current transportation types
 */
export const UserTransportationTypeEnumArray = () => {
  const values = [];
  Object.keys(UserTransportationTypeEnum).forEach(key => {
    values.push(UserTransportationTypeEnum[key]);
  });
  return values;
};

/**
 * @returns a random transport type of the current types
 */
export const getRandomTransportType = () => UserTransportationTypeEnum.Array[Math.floor(Math.random() *
    UserTransportationTypeEnum.Array.length)];

/**
 * Return random Date within the date
 * @param start Date object
 * @param end Date object
 */
export const getRandomTimeInRange = (start, end) => new Date(start.valueOf() + Math.random() *
    (end.valueOf() - start.valueOf()));

export const getRandomInt = (min, max) => {
  if (min) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  return Math.floor(Math.random() * max);
};

/**
 * @return Return true or false randomly
 */
export const coinFilp = () => {
  const flip = Math.random();
  if (flip < 0.5) { return true; }
  return false;
};
