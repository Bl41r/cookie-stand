// Week 2 Lab created on 6/20/16
// cookie-stand project
// GitHub: https://github.com/Bl41r/cookie-stand
/////////////////////////////////////////////////////

var hours_open = 14;

// Function from mdn
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sumArray(list) {
  var sum = 0;
  for (var i = 0; i < list.length; i++) {
    sum += list[i];
  }
  return sum;
}

function getDailySales(hours, min, max, avgCookiePerSale) {
  var dailySales = [];
  var hourlyCustomers = [];
  for (var i = 0; i < hours; i++) {
    hourlyCustomers[i] = getRandomIntInclusive(min, max);
    dailySales[i] = hourlyCustomers[i] * avgCookiePerSale;
  }
  return [hourlyCustomers, dailySales];
};

function compoundSalesData() {
  FirstAndPike.getDailySales();
  SeaTac.getDailySales();
  SeattleCenter.getDailySales();
  CapHill.getDailySales();
  Alki.getDailySales();
}

// Objects
var FirstAndPike = {
  name: 'First And Pike',
  min: 23,
  max: 65,
  avgCookiesPerSale: 6.3,
  dailySales: [],
  hourlyCustomers: []
};

FirstAndPike.getDailySales = function() {
  SalesData = [];
  SalesData = getDailySales(14, FirstAndPike.min, FirstAndPike.max, FirstAndPike.avgCookiesPerSale);
  FirstAndPike.hourlyCustomers = SalesData[0];
  FirstAndPike.dailySales = SalesData[1];
};

var SeaTac = {
  name: 'SeaTac Airport',
  min: 3,
  max: 24,
  avgCookiesPerSale: 1.2,
  dailySales: [],
  hourlyCustomers: []
};

SeaTac.getDailySales = function() {
  SalesData = getDailySales(14, SeaTac.min, SeaTac.max, SeaTac.avgCookiesPerSale);
  SeaTac.hourlyCustomers = SalesData[0];
  SeaTac.dailySales = SalesData[1];
};

var SeattleCenter = {
  name: 'Seattle Center',
  min: 11,
  max: 38,
  avgCookiesPerSale: 3.7,
  dailySales: [],
  hourlyCustomers: []
};

SeattleCenter.getDailySales = function() {
  SalesData = getDailySales(14, SeattleCenter.min, SeattleCenter.max, SeattleCenter.avgCookiesPerSale);
  SeattleCenter.hourlyCustomers = SalesData[0];
  SeattleCenter.dailySales = SalesData[1];
};

var CapHill = {
  name: 'Capitol Hill',
  min: 20,
  max: 38,
  avgCookiesPerSale: 2.3,
  dailySales: [],
  hourlyCustomers: []
};

CapHill.getDailySales = function() {
  SalesData = getDailySales(14, CapHill.min, CapHill.max, CapHill.avgCookiesPerSale);
  CapHill.hourlyCustomers = SalesData[0];
  CapHill.dailySales = SalesData[1];
};

var Alki = {
  name: 'Alki',
  min: 2,
  max: 16,
  avgCookiesPerSale: 4.6,
  dailySales: [],
  hourlyCustomers: []
};

Alki.getDailySales = function() {
  SalesData = getDailySales(14, Alki.min, Alki.max, Alki.avgCookiesPerSale);
  Alki.hourlyCustomers = SalesData[0];
  Alki.dailySales = SalesData[1];
};

open_locations = [FirstAndPike, SeaTac, SeattleCenter, CapHill, Alki];

function displayData(locations) {
//todo: in here create element ul, then li children
  for (var i = 0; i < locations.length; i++) {
    newTag = document.createElement('ul');
    newTag.setAttribute('id', locations[i].name);
    newTag.innerText = locations[i].name;  //<ul id="Alki"></ul>
    dataEntryPoint = document.getElementById('DataStart');
    dataEntryPoint.appendChild(newTag); //adds newTag to div in html
    for (var j = 0; j < hours_open; j++) {  //loop thru each hour for the location object
      var item = document.createElement('li');
      item.innerText = locations[i].dailySales[j]; //item contains the cookies sold for an hour
      newTag.appendChild(item);
    }
    var total = document.createElement('li');
    total.innerText = ('Total is: ' + sumArray(locations[i].dailySales));
    newTag.appendChild(total);
  }
};

///////////////////////////////
// Main programming loop
///////////////////////////////
//  1. Compound Sales Data
//  2. Display on sales.html for each location by creating a new ul, then child li for each value

compoundSalesData();
displayData(open_locations);
