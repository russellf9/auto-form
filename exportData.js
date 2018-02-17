/**
  A script to create JSON data for the `ng2-queue` App
*/

const R = require('ramda');
require('es6-promise').polyfill();
require('isomorphic-fetch');


const fs = require('fs');

// utils
const capitalize = (string) => { return string.charAt(0).toUpperCase() + string.slice(1); }
const stringify = (obj) => { return JSON.stringify(obj); }

// getting data from the person
const getFirstName = R.compose(R.prop('first'),R.prop('name'));
const getSurname = R.compose(R.prop('last'),R.prop('name'));
const spacer = R.join(' ');
const getFullName = (x) => {
  return capitalize(getFirstName(x)) + ' ' + capitalize(getSurname(x));
}
const getMobile = R.prop('cell');

const elements = [
  {
    'id': 'firstname',
    'value': "name='first-name'",
    'fn': getFirstName
  },
  {
    'id': 'lastsurname',
    'value': "name='surname'",
    'fn': getSurname
  },
  {
    'id': 'name',
    'value': "name='name'",
    'fn': getFullName
  },
  {
    'id': 'mobile',
    'value': "name='mobile'",
    'fn': getMobile
  }
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const fakeNumbers = ['07700 900 597','07700 900 336','07700 900 086','07700 900 603','07700 900 912','07700 900 585'];
const getFakeNumber = () => { return fakeNumbers[getRandomInt(0, fakeNumbers.length)];};

// http request
const singlePersonUrl = () => { return 'https://randomuser.me/api/?results=1&nat=gb';}
const multiplePersonUrl = (x) => { return `https://randomuser.me/api/?results=${x}&nat=gb`;}
const getJson = response => response.json();
const returnResults = json => { return json.results };
const getSinglePerson = () => {
  return fetch(singlePersonUrl())
  .then(getJson)
  .then(returnResults)
};
const getPeople = (x) => {
  return fetch(multiplePersonUrl(x))
  .then(getJson)
  .then(returnResults)
};

const getStringProperty = (x, person) => {
  return x.fn(R.head(person));
};

const exportFile = 'people.json';

const exportData = (obj) => {
  fs.writeFile(exportFile, obj, (error) => {
    if(error) {
      return console.log(error);
    } else {
      console.log(exportFile, ' created!');
    }
  });
}

// for a larger set of data
const getSinglePersonData = async () => {
  const person = await getSinglePerson();
  const obj = {};
  const setProperties = (element) => {
    const string = (R.equals(element.id, 'mobile')) ? getFakeNumber() : capitalize(getStringProperty(element, person));
      obj[element.id] = string;
  };

  R.forEach(setProperties, elements);
  return obj;
};

const parsePerson = (value, key, obj) => {
  return {
    name: getFullName(value),
    mobile: getFakeNumber()
    };
};
const getPeopleData = async (x = 2) => {
  const people = await getPeople(x);
  return R.map(parsePerson, people);
};

const exportPeople = R.compose(exportData, stringify);

const runApp = async () => {
  const result = await getPeopleData(10);
  exportPeople(result);
};

runApp();
