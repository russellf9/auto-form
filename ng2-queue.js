
const R = require('ramda');
const casper = require('casper').create();

const exportFile = 'people.json';
const people = require(exportFile);

const config = {
  url: 'http://127.0.0.1:3000/'
};

casper.start(config.url, function() {
  this.echo('Page title is: ' + this.evaluate(function() {
    return document.title;
  }));

  this.waitForSelector("#customer-add");
});

const inputDataForItem = function(person) {
  Object.keys(person).forEach(function(element, key, array) {
    casper.sendKeys("input[name='" + element + "']", person[element]);
  })
}
const inputData = function(person) {
  inputDataForItem(person);
  casper.click("button[type='submit']");
}

casper.then(function() {
  R.forEach(inputData, people);
});


casper.run();
