// Week 2 Lab created on 6/20/16
// cookie-stand project
// GitHub: https://github.com/Bl41r/cookie-stand
/////////////////////////////////////////////////////

var hourNames = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
//note:  8pm removed, because stores close at 8, and thus no sales after close
var hoursOpen = hourNames.length;

// Function from mdn
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDailySales(hours, min, max, avgCookiePerSale) {
  var total = 0;
  var dailySales = [];
  var hourlyCustomers = [];
  for (var i = 0; i < hours; i++) {
    hourlyCustomers[i] = getRandomIntInclusive(min, max);
    dailySales[i] = Math.round(hourlyCustomers[i] * avgCookiePerSale);
    total += dailySales[i];
  }
  return [hourlyCustomers, dailySales, total];
};

function compoundSalesData(locations) {
  for (var loc = 0; loc < locations.length; loc++) {
    locations[loc].getDailySales();
  }
}

// Objects
var Store = function(name, minCust, maxCust, avgCookiesPerSale) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.dailySales = [];
  this.hourlyCustomers = [];
  this.total = 0;

  this.getDailySales = function() {
    var SalesData = [];
    SalesData = getDailySales(hoursOpen, this.minCust, this.maxCust, this.avgCookiesPerSale);
    this.hourlyCustomers = SalesData[0];
    this.dailySales = SalesData[1];
    this.total = SalesData[2];
  };
};

function createStores() {
  FirstAndPike = new Store('First and Pike', 23, 65, 6.3);
  SeaTac = new Store('SeaTac Airport', 3, 24, 1.2);
  SeattleCenter = new Store('Seattle Center', 11, 38, 3.7);
  CapHill = new Store('Capitol Hill', 20, 38, 2.3);
  Alki = new Store('Alki', 2, 16, 4.6);
}

function displayDataList(locations) {
  for (var i = 0; i < locations.length; i++) {
    newTag = document.createElement('ul');
    newTag.setAttribute('id', locations[i].name);
    newTag.innerText = locations[i].name;  //<ul id="Alki"></ul>
    dataEntryPoint = document.getElementById('DataStart');
    dataEntryPoint.appendChild(newTag); //adds newTag to div in html
    for (var j = 0; j < hoursOpen; j++) {  //loop thru each hour for the location object
      var item = document.createElement('li');
      item.innerText = hourNames[j] + ': ' + locations[i].dailySales[j] + ' cookies'; //item contains the cookies sold for an hour
      newTag.appendChild(item);
    }
    var total = document.createElement('li'); //puts the total as bottom item on list
    total.innerText = ('Total: ' + locations[i].total + ' cookies');
    newTag.appendChild(total);
  }
};

function displayDataTable(locations) {
  //make table with id
  var tableEl = document.createElement('table');
  tableEl.setAttribute('id', 'dataTable');
  dataEntryPoint = document.getElementById('DataStart');
  dataEntryPoint.appendChild(tableEl);
  //add first tr within table
  trEl = document.createElement('tr');
  trEl.setAttribute('id', 'currentRow');
  dataEntryPoint = document.getElementById('dataTable');
  dataEntryPoint.appendChild(trEl);
  //add th's within tr
  thEl = document.createElement('th');
  thEl.innerText = '(blank space here)';
  thEl.setAttribute('id', 'currentHeading');
  dataEntryPoint = document.getElementById('currentRow');
  dataEntryPoint.appendChild(thEl);
  thEl.removeAttribute('id');
  //add daily total column heading
  thEl = document.createElement('th');
  thEl.innerText = 'Daily Location Total';
  thEl.setAttribute('id', 'currentHeading');
  dataEntryPoint = document.getElementById('currentRow');
  dataEntryPoint.appendChild(thEl);
  thEl.removeAttribute('id');
  //loop to add remaining headings based on hourNames
  for (i = 0; i < hourNames.length; i++) {
    thEl = document.createElement('th');
    thEl.innerText = hourNames[i];
    thEl.setAttribute('id', 'currentHeading');
    dataEntryPoint = document.getElementById('currentRow');
    dataEntryPoint.appendChild(thEl);
    thEl.removeAttribute('id');
  }
};

// Main programming loop
///////////////////////////////
createStores();
open_locations = [FirstAndPike, SeaTac, SeattleCenter, CapHill, Alki];
compoundSalesData(open_locations);
//displayDataList(open_locations);
displayDataTable(open_locations);
