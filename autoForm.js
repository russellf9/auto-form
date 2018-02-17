const curriedTrace = R.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

// getting data from the person
const getFirstName = R.compose(R.prop('first'),R.prop('name'));
const getSurname = R.compose(R.prop('last'),R.prop('name'));
const getMobile = R.prop('cell');

const elements = [
  {
    'id': 'first-name',
    'value': "name='first-name'",
    'fn': getFirstName
  },
  {
    'id': 'surname',
    'value': "name='surname'",
    'fn': getSurname
  },
  {
    'id': 'mobile',
    'value': "name='mobile'",
    'fn': getMobile
  },
  {
    'id': 'mobile',
    'value': "name='not'",
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

// string utils
const capitalize = (string) => { return string.charAt(0).toUpperCase() + string.slice(1); }

// dom
const getElement = (value) => { return document.querySelector(`input[${value}]`) };
const getSubmitButton = () => { return document.querySelector("#submit") };

// http request
const singlePersonUrl = () => { return 'https://randomuser.me/api/?results=1&nat=gb';}
const getJson = response => response.json();
const returnResults = json => { return json.results };
const getSinglePerson = () => {
  return fetch(singlePersonUrl())
  .then(getJson)
  .then(returnResults)
};

const getStringProperty = (x, person) => {
  return x.fn(R.head(person));
};


const runApp = async () => {
  const person = await getSinglePerson();

  const setProperties = element => {
    const string = (R.equals(element.id, 'mobile')) ? getFakeNumber() : capitalize(getStringProperty(element, person));
    const domElement = getElement(element.value);
    domElement ? domElement.value = string : console.log('element not found with name: ', element.value);
  };

  R.forEach(setProperties, elements);
};

const runAppAfterDelay = () => {
  setTimeout(() => {
    runApp();
  }, 2000);
};


const addListeners = () => {
  getSubmitButton().addEventListener('click', (event) => {
    runAppAfterDelay();
  });
};

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    addListeners();
    runApp();
  }
};
