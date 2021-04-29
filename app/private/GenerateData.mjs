import moment from 'moment';

import * as fs from 'fs';

console.log('== Running GenerateData.js UwU ==');

/* Constants Here */
const credentials = {
  password: 'changeme',
  image: ' https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
};

// This date will be the the last day the weekly data will be generated for
const latestDate = new Date(2021, 4, 5);

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
  { carMake: 'Acura', carModel: 'ILX', carYear: '2021', carMPG: 28, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'ILX', carYear: '2020', carMPG: 28, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'ILX', carYear: '2019', carMPG: 28, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'ILX', carYear: '2018', carMPG: 29, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'ILX', carYear: '2017', carMPG: 29, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'ILX', carYear: '2016', carMPG: 29, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'ILX', carYear: '2015', carMPG: 29, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'ILX', carYear: '2014', carMPG: 38, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'ILX', carYear: '2013', carMPG: 38, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'MDX', carYear: '2022', carMPG: 21, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'MDX', carYear: '2021', carMPG: 21, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'MDX', carYear: '2020', carMPG: 22, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'MDX', carYear: '2019', carMPG: 22, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'MDX', carYear: '2018', carMPG: 22, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'MDX', carYear: '2017', carMPG: 21, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'MDX', carYear: '2016', carMPG: 22, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'MDX', carYear: '2015', carMPG: 23, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'MDX', carYear: '2014', carMPG: 23, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'MDX', carYear: '2013', carMPG: 18, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'MDX', carYear: '2012', carMPG: 18, carPrice: 10000 },
  { carMake: 'Acura', carModel: 'MDX', carYear: '2011', carMPG: 18, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A3', carYear: '2020', carMPG: 30, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A3', carYear: '2018', carMPG: 83, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A3', carYear: '2017', carMPG: 83, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A3', carYear: '2016', carMPG: 86, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A3', carYear: '2015', carMPG: 35, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A3', carYear: '2013', carMPG: 32, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A3', carYear: '2012', carMPG: 32, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A3', carYear: '2011', carMPG: 32, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A3', carYear: '2010', carMPG: 32, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A8', carYear: '2021', carMPG: 53, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A8', carYear: '2020', carMPG: 54, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A8', carYear: '2018', carMPG: 22, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A8', carYear: '2016', carMPG: 28, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A8', carYear: '2015', carMPG: 28, carPrice: 10000 },
  { carMake: 'Audi', carModel: 'A8', carYear: '2014', carMPG: 28, carPrice: 10000 },
  { carMake: 'BMW', carModel: 'M', carYear: '2021', carMPG: 26, carPrice: 10000 },
  { carMake: 'BMW', carModel: 'M', carYear: '2020', carMPG: 25, carPrice: 10000 },
  { carMake: 'BMW', carModel: 'X4', carYear: '2021', carMPG: 25, carPrice: 10000 },
  { carMake: 'BMW', carModel: 'X4', carYear: '2020', carMPG: 25, carPrice: 10000 },
  { carMake: 'BMW', carModel: 'X4', carYear: '2019', carMPG: 25, carPrice: 10000 },
  { carMake: 'BMW', carModel: 'X4', carYear: '2018', carMPG: 23, carPrice: 10000 },
  { carMake: 'BMW', carModel: 'ActiveHybrid X6', carYear: '2011', carMPG: 18, carPrice: 10000 },
  { carMake: 'BMW', carModel: 'ActiveHybrid X6', carYear: '2010', carMPG: 18, carPrice: 10000 },
  { carMake: 'Buick', carModel: 'Cascada', carYear: '2019', carMPG: 24, carPrice: 10000 },
  { carMake: 'Buick', carModel: 'Cascada', carYear: '2018', carMPG: 24, carPrice: 10000 },
  { carMake: 'Buick', carModel: 'Cascada', carYear: '2017', carMPG: 23, carPrice: 10000 },
  { carMake: 'Buick', carModel: 'Cascada', carYear: '2016', carMPG: 23, carPrice: 10000 },
  { carMake: 'Buick', carModel: 'Encore', carYear: '2022', carMPG: 26, carPrice: 10000 },
  { carMake: 'Buick', carModel: 'Encore', carYear: '2021', carMPG: 26, carPrice: 10000 },
  { carMake: 'Buick', carModel: 'Encore', carYear: '2019', carMPG: 28, carPrice: 10000 },
  { carMake: 'Buick', carModel: 'Encore', carYear: '2018', carMPG: 30, carPrice: 10000 },
  { carMake: 'Buick', carModel: 'Encore', carYear: '2017', carMPG: 30, carPrice: 10000 },
  { carMake: 'Buick', carModel: 'Encore', carYear: '2016', carMPG: 30, carPrice: 10000 },
  { carMake: 'Buick', carModel: 'Encore', carYear: '2015', carMPG: 28, carPrice: 10000 },
  { carMake: 'Buick', carModel: 'Encore', carYear: '2014', carMPG: 28, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Equinox', carYear: '2021', carMPG: 27, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Equinox', carYear: '2020', carMPG: 27, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Equinox', carYear: '2019', carMPG: 32, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Equinox', carYear: '2018', carMPG: 32, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Equinox', carYear: '2017', carMPG: 23, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Equinox', carYear: '2016', carMPG: 23, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Equinox', carYear: '2015', carMPG: 23, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Equinox', carYear: '2014', carMPG: 23, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Equinox', carYear: '2013', carMPG: 23, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Equinox', carYear: '2012', carMPG: 23, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Equinox', carYear: '2011', carMPG: 23, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Equinox', carYear: '2010', carMPG: 23, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Tahoe', carYear: '2021', carMPG: 18, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Tahoe', carYear: '2020', carMPG: 18, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Tahoe', carYear: '2018', carMPG: 18, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Tahoe', carYear: '2016', carMPG: 18, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Tahoe', carYear: '2013', carMPG: 17, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Tahoe', carYear: '2012', carMPG: 17, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Tahoe', carYear: '2011', carMPG: 17, carPrice: 10000 },
  { carMake: 'Chevrolet', carModel: 'Tahoe', carYear: '2010', carMPG: 17, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Challenger', carYear: '2021', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Challenger', carYear: '2020', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Challenger', carYear: '2019', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Challenger', carYear: '2018', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Challenger', carYear: '2017', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Challenger', carYear: '2016', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Challenger', carYear: '2015', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Challenger', carYear: '2014', carMPG: 21, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Challenger', carYear: '2013', carMPG: 21, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Challenger', carYear: '2012', carMPG: 21, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Challenger', carYear: '2011', carMPG: 21, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Challenger', carYear: '2010', carMPG: 20, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Charger', carYear: '2021', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Charger', carYear: '2020', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Charger', carYear: '2019', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Charger', carYear: '2018', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Charger', carYear: '2017', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Charger', carYear: '2016', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Charger', carYear: '2015', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Charger', carYear: '2014', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Charger', carYear: '2013', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Charger', carYear: '2012', carMPG: 23, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Charger', carYear: '2011', carMPG: 21, carPrice: 10000 },
  { carMake: 'Doge', carModel: 'Charger', carYear: '2010', carMPG: 21, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'Edge', carYear: '2021', carMPG: 23, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'Edge', carYear: '2020', carMPG: 23, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'Edge', carYear: '2019', carMPG: 23, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'Edge', carYear: '2018', carMPG: 23, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'Edge', carYear: '2017', carMPG: 23, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'Edge', carYear: '2016', carMPG: 23, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'Edge', carYear: '2015', carMPG: 23, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'Edge', carYear: '2014', carMPG: 20, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'Edge', carYear: '2013', carMPG: 20, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'Edge', carYear: '2012', carMPG: 20, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'Edge', carYear: '2011', carMPG: 21, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'Edge', carYear: '2010', carMPG: 19, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'F150', carYear: '2020', carMPG: 24, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'F150', carYear: '2019', carMPG: 21, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'F150', carYear: '2018', carMPG: 21, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'F150', carYear: '2017', carMPG: 21, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'F150', carYear: '2016', carMPG: 21, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'F150', carYear: '2015', carMPG: 22, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'F150', carYear: '2014', carMPG: 18, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'F150', carYear: '2013', carMPG: 18, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'F150', carYear: '2012', carMPG: 19, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'F150', carYear: '2011', carMPG: 18, carPrice: 10000 },
  { carMake: 'Ford', carModel: 'F150', carYear: '2010', carMPG: 17, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Acadia', carYear: '2021', carMPG: 24, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Acadia', carYear: '2020', carMPG: 23, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Acadia', carYear: '2019', carMPG: 22, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Acadia', carYear: '2018', carMPG: 23, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Acadia', carYear: '2017', carMPG: 23, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Acadia', carYear: '2016', carMPG: 17, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Acadia', carYear: '2016', carMPG: 19, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Acadia', carYear: '2014', carMPG: 18, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Acadia', carYear: '2013', carMPG: 18, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Acadia', carYear: '2012', carMPG: 19, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Acadia', carYear: '2011', carMPG: 19, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Acadia', carYear: '2010', carMPG: 19, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Sierra', carYear: '2021', carMPG: 21, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Sierra', carYear: '2020', carMPG: 21, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Sierra', carYear: '2019', carMPG: 21, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Sierra', carYear: '2018', carMPG: 20, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Sierra', carYear: '2017', carMPG: 20, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Sierra', carYear: '2016', carMPG: 20, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Sierra', carYear: '2015', carMPG: 20, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Sierra', carYear: '2013', carMPG: 21, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Sierra', carYear: '2012', carMPG: 21, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Sierra', carYear: '2011', carMPG: 21, carPrice: 10000 },
  { carMake: 'GMC', carModel: 'Sierra', carYear: '2010', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Accord', carYear: '2021', carMPG: 33, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Accord', carYear: '2020', carMPG: 33, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Accord', carYear: '2019', carMPG: 33, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Accord', carYear: '2018', carMPG: 33, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Accord', carYear: '2017', carMPG: 30, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Accord', carYear: '2016', carMPG: 30, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Accord', carYear: '2015', carMPG: 30, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Accord', carYear: '2014', carMPG: 30, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Accord', carYear: '2013', carMPG: 30, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Accord', carYear: '2012', carMPG: 27, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Accord', carYear: '2011', carMPG: 26, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Accord', carYear: '2010', carMPG: 25, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2021', carMPG: 36, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2020', carMPG: 35, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2019', carMPG: 35, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2018', carMPG: 35, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2017', carMPG: 35, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2016', carMPG: 35, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2015', carMPG: 33, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2014', carMPG: 33, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2013', carMPG: 32, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2012', carMPG: 31, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2011', carMPG: 29, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Civic', carYear: '2010', carMPG: 29, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Element', carYear: '2011', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Element', carYear: '2010', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Fit', carYear: '2020', carMPG: 36, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Fit', carYear: '2019', carMPG: 36, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Fit', carYear: '2018', carMPG: 36, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Fit', carYear: '2017', carMPG: 36, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Fit', carYear: '2016', carMPG: 36, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Fit', carYear: '2015', carMPG: 36, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Fit EV', carYear: '2014', carMPG: 118, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Fit EV', carYear: '2013', carMPG: 118, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Fit', carYear: '2013', carMPG: 31, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Fit', carYear: '2012', carMPG: 31, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Fit', carYear: '2011', carMPG: 31, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Fit', carYear: '2010', carMPG: 31, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2022', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2021', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2020', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2019', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2018', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2017', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2016', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2015', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2014', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2013', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2012', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2011', carMPG: 22, carPrice: 10000 },
  { carMake: 'Honda', carModel: 'Odyssey', carYear: '2010', carMPG: 20, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Accent', carYear: '2021', carMPG: 36, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Accent', carYear: '2020', carMPG: 36, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Accent', carYear: '2019', carMPG: 32, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Accent', carYear: '2018', carMPG: 32, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Accent', carYear: '2017', carMPG: 31, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Accent', carYear: '2016', carMPG: 30, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Accent', carYear: '2015', carMPG: 30, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Accent', carYear: '2014', carMPG: 30, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Accent', carYear: '2013', carMPG: 32, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Accent', carYear: '2012', carMPG: 32, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Accent', carYear: '2011', carMPG: 30, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Accent', carYear: '2010', carMPG: 30, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Elantra', carYear: '2021', carMPG: 37, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Elantra', carYear: '2020', carMPG: 36, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Elantra', carYear: '2019', carMPG: 35, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Elantra', carYear: '2018', carMPG: 35, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Elantra', carYear: '2017', carMPG: 35, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Elantra', carYear: '2016', carMPG: 31, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Elantra', carYear: '2015', carMPG: 31, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Elantra', carYear: '2014', carMPG: 31, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Elantra', carYear: '2013', carMPG: 32, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Elantra', carYear: '2012', carMPG: 32, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Elantra', carYear: '2011', carMPG: 32, carPrice: 10000 },
  { carMake: 'Hyundai', carModel: 'Elantra', carYear: '2010', carMPG: 29, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Leaf', carYear: '2021', carMPG: 111, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Leaf', carYear: '2020', carMPG: 111, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Leaf', carYear: '2019', carMPG: 112, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Leaf', carYear: '2018', carMPG: 112, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Leaf', carYear: '2017', carMPG: 112, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Leaf', carYear: '2016', carMPG: 114, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Leaf', carYear: '2015', carMPG: 114, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Leaf', carYear: '2014', carMPG: 114, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Leaf', carYear: '2013', carMPG: 115, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Leaf', carYear: '2012', carMPG: 99, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Leaf', carYear: '2011', carMPG: 99, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Rogue', carYear: '2021', carMPG: 33, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Rogue', carYear: '2020', carMPG: 27, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Rogue', carYear: '2019', carMPG: 27, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Rogue', carYear: '2018', carMPG: 27, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Rogue', carYear: '2017', carMPG: 27, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Rogue', carYear: '2016', carMPG: 27, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Rogue', carYear: '2015', carMPG: 27, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Rogue', carYear: '2014', carMPG: 27, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Rogue', carYear: '2013', carMPG: 24, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Rogue', carYear: '2012', carMPG: 23, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Rogue', carYear: '2011', carMPG: 24, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Rogue', carYear: '2010', carMPG: 23, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2021', carMPG: 33, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2020', carMPG: 33, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2019', carMPG: 32, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2018', carMPG: 32, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2017', carMPG: 32, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2016', carMPG: 32, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2015', carMPG: 32, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2014', carMPG: 33, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2013', carMPG: 33, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2012', carMPG: 29, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2011', carMPG: 29, carPrice: 10000 },
  { carMake: 'Nissan', carModel: 'Sentra', carYear: '2010', carMPG: 29, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'S', carYear: '2021', carMPG: 110, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'S', carYear: '2020', carMPG: 110, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'S', carYear: '2019', carMPG: 104, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'S', carYear: '2018', carMPG: 102, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'S', carYear: '2017', carMPG: 99, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'S', carYear: '2016', carMPG: 99, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'S', carYear: '2015', carMPG: 95, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'S', carYear: '2014', carMPG: 95, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'S', carYear: '2013', carMPG: 95, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'S', carYear: '2012', carMPG: 89, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'X', carYear: '2021', carMPG: 86, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'X Long Range', carYear: '2020', carMPG: 96, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'X Long Range', carYear: '2019', carMPG: 96, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'X Performance', carYear: '2021', carMPG: 97, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'X Performance', carYear: '2020', carMPG: 90, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'X Standard', carYear: '2020', carMPG: 101, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'X AWD', carYear: '2017', carMPG: 93, carPrice: 10000 },
  { carMake: 'Tesla', carModel: 'X AWD', carYear: '2016', carMPG: 93, carPrice: 10000 },
  { carMake: 'Toyota', carModel: '4Runner', carYear: '2021', carMPG: 17, carPrice: 10000 },
  { carMake: 'Toyota', carModel: '4Runner', carYear: '2020', carMPG: 17, carPrice: 10000 },
  { carMake: 'Toyota', carModel: '4Runner', carYear: '2019', carMPG: 18, carPrice: 10000 },
  { carMake: 'Toyota', carModel: '4Runner', carYear: '2018', carMPG: 18, carPrice: 10000 },
  { carMake: 'Toyota', carModel: '4Runner', carYear: '2017', carMPG: 18, carPrice: 10000 },
  { carMake: 'Toyota', carModel: '4Runner', carYear: '2016', carMPG: 19, carPrice: 10000 },
  { carMake: 'Toyota', carModel: '4Runner', carYear: '2015', carMPG: 19, carPrice: 10000 },
  { carMake: 'Toyota', carModel: '4Runner', carYear: '2014', carMPG: 19, carPrice: 10000 },
  { carMake: 'Toyota', carModel: '4Runner', carYear: '2013', carMPG: 19, carPrice: 10000 },
  { carMake: 'Toyota', carModel: '4Runner', carYear: '2012', carMPG: 19, carPrice: 10000 },
  { carMake: 'Toyota', carModel: '4Runner', carYear: '2011', carMPG: 19, carPrice: 10000 },
  { carMake: 'Toyota', carModel: '4Runner', carYear: '2010', carMPG: 19, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2021', carMPG: 26, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2020', carMPG: 34, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2019', carMPG: 34, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2018', carMPG: 34, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2017', carMPG: 27, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2016', carMPG: 28, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2015', carMPG: 28, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2014', carMPG: 28, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2013', carMPG: 28, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2012', carMPG: 28, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2011', carMPG: 26, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Camry', carYear: '2010', carMPG: 26, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Corolla', carYear: '2021', carMPG: 34, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Corolla', carYear: '2020', carMPG: 34, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Corolla', carYear: '2019', carMPG: 32, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Corolla', carYear: '2018', carMPG: 32, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Corolla', carYear: '2017', carMPG: 32, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Corolla', carYear: '2016', carMPG: 32, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Corolla', carYear: '2015', carMPG: 32, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Corolla', carYear: '2014', carMPG: 32, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Corolla', carYear: '2013', carMPG: 29, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Corolla', carYear: '2012', carMPG: 29, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Corolla', carYear: '2011', carMPG: 29, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Corolla', carYear: '2010', carMPG: 29, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2021', carMPG: 52, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2020', carMPG: 52, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2019', carMPG: 52, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2018', carMPG: 52, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2017', carMPG: 52, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2016', carMPG: 52, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2015', carMPG: 48, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2015', carMPG: 48, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2014', carMPG: 48, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2013', carMPG: 48, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2012', carMPG: 48, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2011', carMPG: 48, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius', carYear: '2010', carMPG: 50, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius Hybrid', carYear: '2015', carMPG: 95, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius Hybrid', carYear: '2014', carMPG: 95, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius Hybrid', carYear: '2013', carMPG: 95, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Prius Hybrid', carYear: '2012', carMPG: 95, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Tacoma', carYear: '2021', carMPG: 21, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Tacoma', carYear: '2020', carMPG: 21, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Tacoma', carYear: '2019', carMPG: 21, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Tacoma', carYear: '2018', carMPG: 21, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Tacoma', carYear: '2017', carMPG: 21, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Tacoma', carYear: '2016', carMPG: 21, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Tacoma', carYear: '2015', carMPG: 21, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Tacoma', carYear: '2014', carMPG: 21, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Tacoma', carYear: '2013', carMPG: 21, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Tacoma', carYear: '2012', carMPG: 21, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Tacoma', carYear: '2011', carMPG: 21, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Tacoma', carYear: '2010', carMPG: 21, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Yaris', carYear: '2020', carMPG: 35, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Yaris', carYear: '2019', carMPG: 35, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Yaris', carYear: '2018', carMPG: 33, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Yaris', carYear: '2017', carMPG: 33, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Yaris', carYear: '2016', carMPG: 33, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Yaris', carYear: '2015', carMPG: 33, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Yaris', carYear: '2014', carMPG: 33, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Yaris', carYear: '2013', carMPG: 33, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Yaris', carYear: '2012', carMPG: 33, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Yaris', carYear: '2011', carMPG: 31, carPrice: 10000 },
  { carMake: 'Toyota', carModel: 'Yaris', carYear: '2010', carMPG: 32, carPrice: 10000 },

];

/** This JSON will be modified and wrote into a file */
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

/** @returns random array element out of array */
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/** @returns random Integer in range */
function randomInt(min, max) {
  return parseInt((Math.random() * (max - min) + min), 10);
}

/** @returns Date object of the momentjs object */
function momentToDate(momentObject) {
  return moment(momentObject.toDate()).subtract(10, 'hours').toDate();
}

/** Add a user object to the given JSONArray */
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

/** Generate {iterations} number of users users */
function userGeneration(iterations) {
  for (let i = 0; i < iterations; i++) {
    addUser(outputJson.defaultAccounts, `user${i + 1}`);
  }
}

/**
 * Add a transport object to the given JSONArray
 * @params leastMiles number of minimum random miles
 * @params maxMiles number of maximum random miles
 * @params forceCar boolean, true: force transport type to be Car
 */
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

/** Add a transport log to weekdays up to the currentDate  */
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

/** Add two extra transport log in the current month */
function generateExtraTransport(currentDate, user) {
  const now = moment(currentDate);
  const monthStart = momentToDate(now.startOf('month'));
  const monthEnd = momentToDate(now.endOf('month'));
  for (let i = 0; i < 2; i++) {
    addTransport(outputJson.defaultTransport, getRandomTimeInRange(monthStart, monthEnd), 3, 40,
        user.email, user.carMPG);
  }
}

/** Add transport logs; every week days for 3 months, and two extra logs in every month */
function generateTransport(user) {
  const now = moment(latestDate);
  for (let i = 12; i >= 1; i--) {
    generateTransportsForWeek(now.toDate(), user);
    now.subtract(1, 'week').endOf('week');
  }
  const lenow = moment(latestDate);
  for (let i = 3; i >= 1; i--) {
    generateExtraTransport(lenow.toDate(), user);
    lenow.subtract(1, 'month');
  }
}

/* Actual JSON creation */
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

console.log('== End of data generation ==');
console.log('To use defaultData.json, set "useJSONDefaultData": true in settings.development.json');
